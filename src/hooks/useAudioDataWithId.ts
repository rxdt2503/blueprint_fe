import { useEffect, useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";

export const useAudioDataWithId = (
  callback: (id: number, blob: Blob) => void
) => {
  const {
    startRecording: start,
    stopRecording: stop,
    recordingBlob,
    isRecording,
  } = useAudioRecorder();
  const [id, setId] = useState<undefined | number>(undefined);

  const startRecording = ({ id }: { id: number }) => {
    console.log("ID change >>> ", id);

    setId(id);
    start();
  };

  const stopRecording = () => {
    // setId(undefined);
    stop();
  };

  useEffect(() => {
    if (id && recordingBlob) {
      console.log("HOOK >>", { id, recordingBlob });
      callback(id, recordingBlob);
      setId(undefined);
    }
  }, [recordingBlob]);

  return {
    startRecording,
    stopRecording,
    isRecording,
  };
};
