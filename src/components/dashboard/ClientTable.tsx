"use client";
import React, { useState } from "react";
// import { useRouter } from "next/navigation";
import ClientStrategy from "./ClientStrategy";
import { clients } from "../../data/dummyData";
import Button from "../common/Button";

const ClientTable: React.FC = () => {
  // const router = useRouter();

  const [filterText, setFilterText] = useState(""); // For name filter
  const [filterIndustry, setFilterIndustry] = useState(""); // For industry filter
  const [filterStatus, setFilterStatus] = useState(""); // For status filter
  const [sortField, setSortField] = useState<string | null>(null); // Which field to sort by
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Ascending or descending
  const [industriesList, setIndustriesList] = useState<string[]>(
    ["All Industries"].concat(clients.map((client) => client.industry))
  );

  const [expandedIndex, setExpandedIndex] = useState<number>(-1);

  // Filter clients based on the selected filters
  const filteredClients = clients.filter((client) => {
    return (
      client.name.toLowerCase().includes(filterText.toLowerCase()) &&
      (filterIndustry === "" || client.industry === filterIndustry) &&
      (filterStatus === "" || client.status === filterStatus)
    );
  });

  // Sort the filtered clients based on selected field and order
  const sortedClients = [...filteredClients].sort((a, b) => {
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

  const handleIndustyFilter = (value: string) => {
    setExpandedIndex(-1);
    setFilterIndustry(value);
  };

  const handleStatusFilter = (value: string) => {
    setExpandedIndex(-1);
    setFilterStatus(value);
  };

  const addPlan = () => {
    // router.push("/plan"); // Navigate to the new page
  };

  return (
    <div className="p-6 flex-1 ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Client Management Dashboard</h1>
        <Button label="Add Plan" onClick={addPlan} />
      </div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <input
          type="text"
          placeholder="Filter by Name"
          className="p-2 border border-gray-300 rounded"
          value={filterText}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <div>
          <select
            className="p-2 border border-gray-300 rounded mr-4"
            value={filterIndustry}
            onChange={(e) => handleIndustyFilter(e.target.value)}
          >
            {industriesList.map((industry, index) => {
              return (
                <option key={index} value={index === 0 ? "" : industry}>
                  {industry}
                </option>
              );
            })}
          </select>

          <select
            className="p-2 border border-gray-300 rounded"
            value={filterStatus}
            onChange={(e) => handleStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Client Table */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="">
          <tr>
            <th
              className="px-4 py-3 border cursor-pointer"
              onClick={() => handleSort("srNo")}
            >
              Sr No {sortField === "srNo" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="px-4 py-3 border cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Plan Name{" "}
              {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th className="px-4 py-3 border">Business Name</th>
            <th
              className="px-4 py-3 border cursor-pointer"
              onClick={() => handleSort("industry")}
            >
              Industry{" "}
              {sortField === "industry" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="px-4 py-3 border cursor-pointer"
              onClick={() => handleSort("status")}
            >
              Status{" "}
              {sortField === "status" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="px-4 py-3 border cursor-pointer"
              onClick={() => handleSort("lastUpdate")}
            >
              Last Update{" "}
              {sortField === "lastUpdate" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th className="px-4 py-3 border">Strategy Status</th>
          </tr>
        </thead>
        {sortedClients.length > 0 ? (
          sortedClients.map((client, index) => (
            <tbody key={index}>
              <tr
                className="text-center cursor-pointer"
                onClick={() => {
                  if (index === expandedIndex) {
                    setExpandedIndex(-1);
                  } else {
                    setExpandedIndex(index);
                  }
                }}
              >
                <td className="px-4 py-3 border">{client.srNo}</td>
                <td className="px-4 py-3 border">{client.name}</td>
                <td className="px-4 py-3 border">{client.business}</td>
                <td className="px-4 py-3 border">{client.industry}</td>
                <td className="px-4 py-3 border">{client.status}</td>
                <td className="px-4 py-3 border">{client.lastUpdate}</td>
                <td className="px-4 py-3 border">{client.strategyStatus}</td>
              </tr>
              {index === expandedIndex ? (
                <tr>
                  <td colSpan={6} className="collaps-viewer">
                    <ClientStrategy details={client.details} />
                  </td>
                </tr>
              ) : undefined}
            </tbody>
          ))
        ) : (
          <tr>
            <td className="px-4 py-2 border text-center" colSpan={6}>
              No clients found
            </td>
          </tr>
        )}
      </table>
    </div>
  );
};

export default ClientTable;
