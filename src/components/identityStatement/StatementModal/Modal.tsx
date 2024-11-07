import ChatBox from "./components/ChatBox";
import CurrentStatement from "./components/CurrentStatement";
import WorkingPane from "./components/WorkingPane";

interface IProps {
  isVisible: boolean;
  setIsVisible: () => void;
  from: string;
}

const Modal = ({ isVisible, setIsVisible, from }: IProps) => {
  return isVisible ? (
    <div className="fixed h-full  inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center py-10">
      <div className=" bg-gray-100 h-full w-3/4 border rounded-full">
        <div className="flex h-full rounded-full">
          <ChatBox />
          <div className="flex flex-1 flex-col bg-white shadow-md p-4">
            <div className="flex flex-col">
              <button className="place-self-end" onClick={setIsVisible}>
                X
              </button>
            </div>
            {/* <CurrentStatement from={from} /> */}
            {/* <WorkingPane /> */}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
