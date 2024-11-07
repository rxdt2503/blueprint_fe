import "./styles.css";
import { IoMdAttach, IoMdCloseCircle } from "react-icons/io";
import { FaArrowCircleUp, FaStopCircle, FaEdit } from "react-icons/fa";
import { IoClose, IoMicCircle } from "react-icons/io5";
import { FaRegCircle, FaRegCircleCheck, FaMicrophone } from "react-icons/fa6";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AudioRecorder } from "react-audio-voice-recorder";
import {
  getIdentityQuestions,
  getSubmitedQuestions,
  submitQuestionStatement,
  updateQuestionStatement,
} from "../../../../services/redux/slices/identitySection/helper";
import { IStore } from "../../../../services/redux";
import {
  pushQuestion,
  setCurrentQuestion,
} from "../../../../services/redux/slices/identitySection";
import { useAudioDataWithId } from "../../../../hooks/useAudioDataWithId";
import NextPrevButton from "../../../NextPrevButton";
import { ApiCall } from "../../../../services/api/call";
import { useFilePicker } from "use-file-picker";
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
} from "use-file-picker/validators";
import { IQuestions } from "../../../../services/api/entities/IIdentityQuestions";
import { ThunkDispatch } from "@reduxjs/toolkit";

const ChatBox = () => {
  const { identityData, identityStatement, currentIndex, currentQuestion } =
    useSelector((state: IStore) => state.identityData);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(getIdentityQuestions());
    setTimeout(() => {
      dispatch(
        getSubmitedQuestions({
          framework_id: 1,
          user_id: 1,
        })
      );
    }, 200);
  }, [dispatch]);

  const [newMessage, setNewMessage] = useState("");

  type AudioObjType = {
    audio?: string;
    text?: string;
  };

  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);
  const [pickButtonDisabled, setPickButtonDisabled] = useState(false);
  const [iswebApiSupport, setIsWebApiSupport] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [recordingId, setRecordingId] = useState<number>(0);

  const [audioObj, setAudioObj] = useState<Record<number, AudioObjType>>({});

  const onSendMessage = () => {
    if (newMessage) {
      if (isEditing) {
        dispatch<any>(
          updateQuestionStatement({
            audioPath:
              currentQuestion && audioObj[currentQuestion.id]?.audio
                ? audioObj[currentQuestion.id].audio
                : null,
            statementId: currentQuestion?.stmt_id ?? -1,
            transcriptText: newMessage,
          })
        ).then(async (res: any) => {
          const responseData = res.payload?.result;
          if (responseData?.status === 200) {
            onCancelEditing();
          }
        });
      } else {
        dispatch(
          submitQuestionStatement({
            framework_id: identityData?.id,
            question_id: currentQuestion?.id,
            user_id: 1, // TODO: get user id from local storage
            transcript_text: newMessage,
            audio_path: currentQuestion
              ? audioObj[currentQuestion.id]?.audio
              : undefined,
          })
        );

        setNewMessage("");

        console.log("currentIndex: ", currentIndex);
        console.log(
          "identityData?.questions?.length: ",
          identityData?.questions?.length
        );

        if (
          identityData?.questions &&
          identityData?.questions?.length > currentIndex + 1
        ) {
          setNextEnabled(true);
          setPickButtonDisabled(true);
        }

        currentQuestion &&
          setAudioObj((prev) => {
            prev[currentQuestion?.id] = { audio: undefined };
            return { ...prev };
          });
      }
    }
  };

  const onNextClickHandler = () => {
    setNextEnabled(false);
    setPickButtonDisabled(false);
    dispatch(pushQuestion({}));
  };

  const toggleRecording = (id: number) => {
    if (recordingId === id) {
      stopRecording();
    } else {
      isRecording && stopRecording();
      startRecording({ id });
    }

    setRecordingId((prev) => {
      if (prev === id) {
        return 0;
      } else {
        return id;
      }
    });
  };
  const callUploadAudioApi = async (formData: FormData): Promise<any> => {
    try {
      setLoading(true);
      formData.append("originalName", "file");
      formData.append("mimeType", "wav");
      formData.append("userId", "1");
      formData.append("questionId", currentQuestion?.id.toString() || "");
      formData.append("frameworkId", identityData?.id.toString() || "");
      console.log("formData: ", formData);
      const response = await ApiCall.callGetTranscriptFromAudio(formData);
      console.log("🚀 ~ addAudioElement ~ response:", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const handleAudioData = async (id: number, data: Blob) => {
    const formData = new FormData();

    formData.append("audioFile", data, Date.now() + "-recording.wav"); // "audioFile" is the form field name
    formData.append("size", data.size.toString());

    console.log("formData: ", formData);
    const responseData = await callUploadAudioApi(formData);
    if (responseData) {
      setAudioObj((prev) => {
        prev[id] = { ...prev[id], audio: responseData?.fileUrl };
        return { ...prev };
      });
      currentQuestion &&
        setNewMessage(audioObj[currentQuestion.id]?.text || "");
    }
  };

  const { startRecording, stopRecording, isRecording } =
    useAudioDataWithId(handleAudioData);

  const addAudioElement = async (blob: Blob, id: number) => {
    // const url = URL.createObjectURL(blob);

    const formData = new FormData();

    formData.append("audioFile", blob, Date.now() + "-recording.wav"); // "audioFile" is the form field name
    formData.append("size", blob.size.toString());
    formData.append("isTranscriptNeed", "true");

    console.log("formData: ", formData);
    const responseData = await callUploadAudioApi(formData);
    if (responseData) {
      setAudioObj((prev) => {
        prev[id] = { ...prev[id], audio: responseData?.fileUrl };
        return { ...prev };
      });
      setNewMessage(responseData?.transcript);
    }
  };

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) setIsWebApiSupport(true);
  }, []);

  useEffect(() => {
    // const recognition = new speechRecognition();
    const recognition = new (window.webkitSpeechRecognition ||
      window.SpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      console.log("🚀 ~ setIsRecording ~ event:", event);
      const currentTranscript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join("");

      setAudioObj((prev) => {
        prev[recordingId] = { ...prev[recordingId], text: currentTranscript };
        return { ...prev };
      });

      // setNewMessage(currentTranscript);
    };

    recognition.onerror = () => {
      console.error("Speech recognition error:");
    };

    if (isRecording) {
      recognition.start();
    }

    return () => {
      recognition.stop();
    };
  }, [isRecording]);

  const { openFilePicker, filesContent, loading, errors } = useFilePicker({
    readAs: "DataURL",
    accept: "audio/*",
    multiple: false,
    validators: [
      new FileAmountLimitValidator({ max: 1 }),
      new FileTypeValidator(["wav", "mp3"]),
      new FileSizeValidator({ maxFileSize: 20 * 1024 * 1024 /* 20 MB */ }),
    ],
    onFilesSelected: ({ plainFiles, filesContent, errors }) => {
      // this callback is always called, even if there are errors
      console.log("onFilesSelected", { plainFiles, filesContent, errors });

      var url = filesContent[0].content;

      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          console.log("blob", blob);
          addAudioElement(blob, currentQuestion?.id || -1);
        });
    },
  });

  const [isEditing, setEditing] = useState(false);
  const onEditHandler = (questionId: number, index: number) => {
    const stmtData = identityStatement.find((s) => s.id === questionId);

    if (stmtData) {
      // setEditQuestion(stmtData);
      dispatch(setCurrentQuestion(stmtData));
      setEditing(true);
      setNewMessage(stmtData.transcript_text || "");
      setAudioObj((prev) => {
        prev[questionId] = {
          ...prev[questionId],
          text: stmtData.transcript_text,
          audio: stmtData.audio_path,
        };
        return { ...prev };
      });
      setNextEnabled(false);
      setPickButtonDisabled(false);
    }
  };

  useEffect(() => {
    if (!isEditing) {
      const stmtData = identityStatement[identityStatement.length - 1];
      if (stmtData?.transcript_text) {
        identityData?.questions &&
          identityData?.questions?.length > currentIndex + 1 &&
          setNextEnabled(true);
        setPickButtonDisabled(true);
      } else {
        setNextEnabled(false);
        setPickButtonDisabled(false);
      }
    }
  }, [identityStatement]);

  const onCancelEditing = () => {
    const stmtData = identityStatement[identityStatement.length - 1];
    if (stmtData?.transcript_text) {
      identityData?.questions &&
        identityData?.questions?.length > currentIndex + 1 &&
        setNextEnabled(true);
      setPickButtonDisabled(true);
    } else {
      setNextEnabled(false);
      setPickButtonDisabled(false);
    }
    dispatch(setCurrentQuestion(stmtData));
    setEditing(false);
    setNewMessage("");
    currentQuestion &&
      setAudioObj((prev) => {
        prev[currentQuestion?.id] = { audio: undefined, text: "" };
        return { ...prev };
      });
  };

  return (
    <div className="w-full bg-white shadow-md flex flex-col justify-between rounded-s-xl">
      {/* Chat Message */}
      <div className="flex flex-col overflow-y-scroll flex-1  p-4">
        {identityStatement?.map((data, index) => {
          return (
            <>
              <div
                className="bg-gray-100 p-4 rounded-lg shadow-sm mb-4 w-1/2 "
                style={{ alignSelf: "start" }}
              >
                <p>
                  Q.{index + 1} {data?.ques_stmt}
                </p>
              </div>
              {data?.transcript_text ? (
                <div className="w-1/2 self-end flex-row flex justify-end items-center gap-3 group">
                  <button
                    className="invisible group-hover:visible"
                    onClick={() => onEditHandler(data.id, index)}
                  >
                    <FaEdit size={22} color="grey" />
                  </button>
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
                    {data?.audio_path ? (
                      <audio src={data?.audio_path} controls={true} />
                    ) : null}
                    <p>{data.transcript_text}</p>
                  </div>
                </div>
              ) : undefined}
            </>
          );
        })}
      </div>

      {/* Input box */}
      <div className="flex flex-col rounded-xl overflow-hidden">
        {/* <div className="flex flex-row items-center justify-center gap-2">
          {identityData?.questions.map((question) => {
            return (
              <>
                <FaRegCircleCheck size={22} color="grey" />
                <FaRegCircle size={22} color="grey" />
              </>
            );
          })}
        </div> */}
        <NextPrevButton
          nextEnabled={nextEnabled}
          prevEnabled={prevEnabled}
          onNextClickHandler={onNextClickHandler}
        />

        <div className="flex-row flex flex-grow">
          <div
            style={{
              width: "100%",
              height: 125,
            }}
            className="border-2 border-gray-200 rounded-s-xl flex-col flex"
          >
            {isEditing && (
              <div className="flex flex-row justify-between items-center bg-gray-200 px-5 py-1 rounded-l-xl">
                <span>Editing: {currentQuestion?.ques_stmt}</span>
                <button onClick={onCancelEditing}>
                  <IoMdCloseCircle size={25} />
                </button>
              </div>
            )}

            <textarea
              name="textarea"
              style={{
                width: "100%",
                resize: "none",
                outline: "none",
              }}
              className="flex-1 p-2"
              placeholder="Type something to start..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            ></textarea>
            {currentQuestion && audioObj[currentQuestion.id]?.audio ? (
              <div className="flex px-2">
                <audio
                  src={audioObj[currentQuestion.id]?.audio}
                  controls={true}
                />
                <IoClose
                  className="bg-slate-100 rounded-xl cursor-pointer"
                  size={20}
                  onClick={() => {
                    currentQuestion &&
                      setAudioObj((prev) => {
                        prev[currentQuestion?.id] = { audio: undefined };
                        return { ...prev };
                      });
                  }}
                />
              </div>
            ) : null}
          </div>
          <div className="flex flex-col">
            <button
              className="p-2 border-b-2 border-gray-200"
              disabled={pickButtonDisabled}
              onClick={openFilePicker}
            >
              <IoMdAttach
                size={24}
                color={pickButtonDisabled ? "grey" : "black"}
              />
            </button>
            {/* <button className=" p-2 border-b-2 border-gray-200">
              <FaMicrophone size={24} />
            </button> */}

            {!iswebApiSupport ? (
              <div className="flex justify-center">
                {/* record */}
                {pickButtonDisabled ? (
                  <IoMicCircle size={30} color={"grey"} />
                ) : (
                  <AudioRecorder
                    onRecordingComplete={(blob: Blob) =>
                      addAudioElement(blob, currentQuestion?.id || 0)
                    }
                    audioTrackConstraints={{
                      noiseSuppression: true,
                      echoCancellation: true,
                    }}
                    downloadOnSavePress={false}
                    downloadFileExtension="webm"
                    showVisualizer={false}
                    // mediaRecorderOptions={{}}
                  />
                )}
              </div>
            ) : (
              <button
                disabled={pickButtonDisabled}
                onClick={() => toggleRecording(currentQuestion?.id || 0)}
                className=" p-2 rounded-lg hover:pointer-events-auto"
              >
                {!isRecording ? (
                  <FaMicrophone
                    size={24}
                    color={pickButtonDisabled ? "grey" : "black"}
                  />
                ) : (
                  <FaStopCircle
                    size={24}
                    color={pickButtonDisabled ? "grey" : "black"}
                  />
                )}
              </button>
            )}

            {/* <div>
              <button onClick={() => toggleRecording(currentQuestion?.id || 0)}>
                {recordingId === currentQuestion?.id
                  ? "Stop Recording"
                  : "Start Recording"}
              </button>
            </div> */}

            <button
              className=" p-2 rounded-lg hover:pointer-events-auto"
              disabled={pickButtonDisabled}
              onClick={onSendMessage}
            >
              <FaArrowCircleUp
                size={24}
                color={pickButtonDisabled ? "grey" : "black"}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
