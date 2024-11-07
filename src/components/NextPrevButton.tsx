import React from "react";

type IProps = {
  prevEnabled: boolean;
  nextEnabled: boolean;
  onNextClickHandler: () => void;
  onPrevClickHandler?: () => void;
};
export default function NextPrevButton({
  nextEnabled,
  prevEnabled,
  onNextClickHandler,
  onPrevClickHandler,
}: IProps) {
  return (
    <div className="flex flex-row mx-auto">
      <button
        type="button"
        disabled={prevEnabled}
        className={` text-white rounded-l-md border-r border-gray-100 py-2  hover:text-white px-3 ${
          prevEnabled ? "bg-gray-800 hover:bg-accentColor" : "bg-slate-400"
        }`}
        onClick={() => onPrevClickHandler && onPrevClickHandler()}
      >
        <div className="flex flex-row align-middle">
          <svg
            className="w-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <p className="ml-2">Prev</p>
        </div>
      </button>
      <button
        type="button"
        className={` text-white rounded-r-md border-r border-gray-100 py-2  hover:text-white px-3 ${
          nextEnabled ? "bg-gray-800 hover:bg-accentColor" : "bg-slate-400"
        }`}
        disabled={!nextEnabled}
        onClick={onNextClickHandler}
      >
        <div className="flex flex-row align-middle">
          <span className="mr-2">Next</span>
          <svg
            className="w-5 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </button>
    </div>
  );
}
