import "./styles.css";

const WorkingPane = () => {
  return (
    <div className="flex flex-1 flex-col mt-4 h-full">
      <h3 className="text-lg font-bold mb-2">Working Pane</h3>
      <div className="flex flex-col border border-gray-300 rounded-xl h-full overflow-hidden p-2">
        <textarea
          className="w-full p-2  rounded-lg"
          placeholder="Edit your statement here..."
          style={{
            width: "100%",
            height: "100%",
            resize: "none",
            outline: "none",
          }}
        />
        <button className="place-self-end  p-2 rounded-xl bg-gray-300">
          Submit
        </button>
      </div>
    </div>
  );
};

export default WorkingPane;
