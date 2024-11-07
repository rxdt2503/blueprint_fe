import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { ColorEnum } from "../../utils/Enums/ColouEnums";

interface StatementProps {
  title: string;
  value: string;
  onViewClick: () => void;
}

const Statement: React.FC<StatementProps> = ({ title, value, onViewClick }) => {
  return (
    <div className="flex flex-1 flex-wrap justify-center gap-6  hover:shadow-xl transition-shadow">
      <div
        style={{ backgroundColor: ColorEnum.LIGHT_GRAY_BLUE }}
        className="relative w-full shadow-sm  border-slate-200 rounded-lg p-3 pb-6"
      >
        <div className="flex justify-center mb-1 mt-2"></div>

        <div className="flex justify-between items-center mb-3">
          <h5 className="text-slate-800 text-2xl font-semibold">{title}</h5>
          <button onClick={() => onViewClick()} className="ml-auto">
            <CiEdit className="text-3xl cursor-pointer" />
          </button>
        </div>
        <div
          className="p-3 mt-5 border-t border-slate-100 text-center max-h-40 min-h-[15.5rem] overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-xl [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded-xl [&::-webkit-scrollbar-track]:bg-slate-100"
          contentEditable={false} // This makes the section editable
          suppressContentEditableWarning={true} // React warning suppression
        >
          <p className="block text-left text-slate-600 leading-normal font-light mb-4 max-w-lg">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statement;
