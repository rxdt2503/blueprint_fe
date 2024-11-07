"use client";
import React, { useState } from "react";
import { plans } from "../../data/dummyDataPlan";
import { IoIosArrowForward } from "react-icons/io";
import Pagination from "../common/Pagination";
// import { useRouter } from "next/navigation";

const PlanTable: React.FC = () => {
  // const router = useRouter();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [planName, setPlanName] = useState("");
  const [filterText, setFilterText] = useState(""); // For name filter
  const [filterOrganization, setFilterOrganization] = useState(""); // For organization filter
  const [filterStatus, setFilterStatus] = useState(""); // For status filter
  const [sortField, setSortField] = useState<string | null>(null); // Which field to sort by
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Ascending or descending

  const [expandedIndex, setExpandedIndex] = useState<number>(-1);

  // Filter plans based on the selected filters
  const filteredPlans = plans.filter((plans) => {
    return (
      plans.planName.toLowerCase().includes(filterText.toLowerCase()) &&
      (filterOrganization === "" ||
        plans.organization === filterOrganization) &&
      (filterStatus === "" || plans.status === filterStatus)
    );
  });

  // Sort the filtered plans based on selected field and order
  const sortedPlans = [...filteredPlans].sort((a, b) => {
    if (sortField) {
      const fieldA = (a as any)[sortField];
      const fieldB = (b as any)[sortField];

      if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Toggle sort order between ascending and descending
  const handleSort = (field: string) => {
    setExpandedIndex(-1);
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleSearch = (value: string) => {
    setExpandedIndex(-1);
    setFilterText(value);
  };

  const handleOrganizationFilter = (value: string) => {
    setExpandedIndex(-1);
    setFilterOrganization(value);
  };

  const handleStatusFilter = (value: string) => {
    setExpandedIndex(-1);
    setFilterStatus(value);
  };

  const handleCreatePlan = () => {
    setIsPopupOpen(false);
    alert(planName);
    // router.replace(
    //   `/dashboard/createPlan?planName=${encodeURIComponent(planName)}`
    // );
  };

  return (
    <div className="p-6 flex-1">
      <div className="flex flex-row items-center mb-5">
        <p className="font-bold text-lg dark:text-white cursor-pointer">
          Dashboard
        </p>
        <IoIosArrowForward className="mx-2" />{" "}
        {/* Add margin to the icon for spacing */}
        <p className="font-bold text-lg text-gray-900 dark:text-white cursor-pointer">
          Plan
        </p>
        <div className="flex justify-between">
          <button
            className="ml-auto px-4 py-2 bg-accentColor text-white rounded-md"
            onClick={() => setIsPopupOpen(true)}
          >
            New Plan
          </button>

          {/* Popup Modal here */}
          {isPopupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-md shadow-md w-1/3">
                <h2 className="text-xl font-semibold mb-4">
                  Create a New Plan
                </h2>
                <input
                  type="text"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="Enter Plan Name"
                  className="border border-gray-300 p-2 w-full rounded-md mb-4"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded-md"
                    onClick={() => setIsPopupOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={handleCreatePlan}
                  >
                    Create Plan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <div>
          <select
            className="p-2 border border-gray-300 rounded"
            value={filterStatus}
            onChange={(e) => handleStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="In progress">In progress</option>
            <option value="Inactive">Inactive</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Filter by Plan name"
          className="p-2 border border-gray-300 rounded"
          value={filterText}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Plan Table */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="">
          <tr>
            <th
              className="px-4 py-3 border-b cursor-pointer bg-lightColor"
              onClick={() => handleSort("srNo")}
            >
              Sr No {sortField === "srNo" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="px-4 py-3 border-b cursor-pointer bg-lightColor"
              onClick={() => handleSort("name")}
            >
              Plan Name{" "}
              {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="px-4 py-3 border-b cursor-pointer bg-lightColor"
              onClick={() => handleSort("organization")}
            >
              Organization{" "}
              {sortField === "organization" &&
                (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="px-4 py-3 border-b cursor-pointer bg-lightColor"
              onClick={() => handleSort("createdDate")}
            >
              Created Date{" "}
              {sortField === "createdDate" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th className="px-4 py-3 border-b bg-lightColor">Created By</th>
            <th
              className="px-4 py-3 border-b cursor-pointer bg-lightColor"
              onClick={() => handleSort("status")}
            >
              Status{" "}
              {sortField === "status" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th className="px-4 py-3 border-b cursor-pointer bg-lightColor"></th>
          </tr>
        </thead>
        {sortedPlans.length > 0 ? (
          sortedPlans.map((plans, index) => (
            <tbody key={index}>
              <tr
                className="text-center"
                onClick={() => {
                  if (index === expandedIndex) {
                    setExpandedIndex(-1);
                  } else {
                    setExpandedIndex(index);
                  }
                }}
              >
                <td className="px-4 py-3 border-b">{plans.srNo}</td>
                <td className="px-4 py-3 border-b">{plans.planName}</td>
                <td className="px-4 py-3 border-b">{plans.organization}</td>
                <td className="px-4 py-3 border-b">{plans.createdDate}</td>
                <td className="px-4 py-3 border-b">{plans.createdBy}</td>
                <td className="px-4 py-3 border-b">{plans.status}</td>
                <td className="px-4 py-3 border-b">
                  <button
                    className="px-4 py-2 bg-accentColor text-white rounded-md"
                    onClick={() => {
                      // router.push(
                      //   `/dashboard/createPlan?planName=${plans.planName}&organization=${plans.organization}`
                      // );
                    }}
                  >
                    View Plan
                  </button>
                </td>
              </tr>
            </tbody>
          ))
        ) : (
          <tr>
            <td className="px-4 py-2 border text-center" colSpan={6}>
              No plans found
            </td>
          </tr>
        )}
      </table>

      <div>
        <Pagination />
      </div>
    </div>
  );
};

export default PlanTable;
