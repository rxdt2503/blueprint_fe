"use client";
import React, { useState } from "react";
import { plans } from "../../data/dummyDataPlan";
import { IoMdAddCircle } from "react-icons/io";
// import { useRouter } from "next/navigation";

const statuses = ["All", "In progress", "Completed", "Inactive"];

export default function PlanBoard({
  onNewPlanClick,
}: {
  onNewPlanClick: () => void;
}) {
  const [activeTab, setActiveTab] = useState("All");
  const [filterText, setFilterText] = useState(""); // For name filter
  // const router = useRouter();
  // Filter plans based on the selected filters
  const filteredPlansByText = plans.filter((plans) => {
    return plans.planName.toLowerCase().includes(filterText.toLowerCase());
  });

  const filteredPlans =
    activeTab === "All"
      ? filteredPlansByText
      : filteredPlansByText.filter((plan) => plan.status === activeTab);

  const handleSearch = (value: string) => {
    setFilterText(value);
  };

  return (
    <div className="w-full px-6 py-4 h-auto">
      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <div></div>

        <div className="flex flex-row gap-5">
          <input
            type="text"
            placeholder="Filter by Plan name"
            className="p-2 border border-gray-300 rounded"
            value={filterText}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button
            className="ml-auto px-4 py-2 bg-goldColor text-white rounded-md hover:bg-goldColorDark flex flex-row gap-4 items-center" // Use ml-auto to push the button to the right
            onClick={onNewPlanClick}
          >
            New Plan
            <IoMdAddCircle />
          </button>
        </div>
      </div>

      {/* Tabs for Status */}
      <div className="flex space-x-4 border-b">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setActiveTab(status)}
            className={`px-4 py-2 font-semibold ${
              activeTab === status
                ? "border-b-4 border-blueColorDark text-blueColorDark"
                : "text-gray-500"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Plan Cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 overflow-y-auto"
        style={{
          maxHeight: "60svh",
          scrollbarWidth: "none",
        }}
      >
        {filteredPlans.map((plan) => (
          // <div
          //   key={plan.srNo}
          //   className="bg-silverColor p-4 shadow-md rounded-lg"
          // >
          //   <h3 className="text-lg font-bold mb-2">{plan.planName}</h3>
          //   <p className="text-sm text-gray-500 mb-1">
          //     Organization: {plan.organization}
          //   </p>

          //   <p className="text-sm text-gray-500 mb-2">
          //     Date: {plan.createdDate}
          //   </p>
          //   <button className="bg-accentColor text-white px-4 py-2 rounded hover:bg-slate-700">
          //     View Plan
          //   </button>
          // </div>

          <div className="bg-silverColor p-6 shadow-md rounded-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {plan.planName}
            </h3>

            <div className="flex flex-row justify-between">
              <div className="mb-4">
                <label className="block text-gray-500 text-sm font-semibold mb-1">
                  Organization
                </label>
                <span className=" text-pinkColorDark text-md font-semibold py-1 px-3 rounded-lg">
                  {plan.organization}
                </span>
              </div>
              <div>
                <label className="block text-gray-500 text-sm font-semibold mb-1">
                  Created Date
                </label>
                <span className="bg-gray-100 text-gray-700 font-semibold py-1 px-3 rounded-lg">
                  {new Date(plan.createdDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button
              className="bg-greenColor text-white px-4 py-2 mt-6 w-full rounded-md hover:bg-greenColorDark transition-colors"
              onClick={() => {
                // router.push(
                //   `/dashboard/createPlan?planName=${plan.planName}&organization=${plan.organization}`
                // );
              }}
            >
              View Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
