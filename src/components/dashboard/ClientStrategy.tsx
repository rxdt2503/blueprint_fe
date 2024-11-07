import React from "react";
import { ClientDetails } from "../../types/Client";

const ClientStrategy = ({ details }: { details: ClientDetails }) => {
  return (
    <div className="w-3/4 bg-white p-6">
      <h2 className="text-xl font-bold mb-4">Client Overview</h2>
      <div className="bg-gray-100 p-4 rounded-md">
        <div>
          <h3 className="text-lg font-semibold">Client Identity</h3>
          <p className="text-sm text-gray-600">{details.identity}</p>

          <h3 className="text-lg font-semibold mt-4">Goals</h3>
          <p className="text-sm text-gray-600">{details.goals}</p>

          <h3 className="text-lg font-semibold mt-4">Current Strategies</h3>
          <p className="text-sm text-gray-600">{details.currentStrategy}</p>

          <div className="w-72 h-4 my-3 bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              className="h-4 bg-accentColor rounded-full dark:bg-blue-500"
              style={{ width: `${details.progressCompleted}%` }}
            ></div>
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-accentColor text-white rounded-md">
          View Full Strategy Document
        </button>
      </div>
    </div>
  );
};

export default ClientStrategy;
