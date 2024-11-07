"use client";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import UpcomingEvents from "../../components/common/RightNav/UpcomingEvents";
import PlanBoard from "../../components/dashboard/PlanBoard";
export default function PlanScreen() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newPlan, setNewPlan] = useState({ planName: "", organization: "" });
  const [errors, setErrors] = useState({ planName: "", organization: "" });

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Handle form submission
  const handleSubmit = () => {
    const newErrors = { planName: "", organization: "" };

    if (!newPlan.planName) {
      newErrors.planName = "Plan name is required.";
    }

    if (!newPlan.organization) {
      newErrors.organization = "Organization name is required.";
    }

    setErrors(newErrors);

    // If no errors, submit the form
    if (!newErrors.planName && !newErrors.organization) {
      const newPlanData = {
        id: (Math.random() * 1000).toFixed(0), // Random ID for simplicity
        planName: newPlan.planName,
        organization: newPlan.organization,
        createdBy: "Admin", // Set a default creator
        createdDate: new Date().toISOString().slice(0, 10),
      };

      navigate(
        `/dashboard/createPlan?planName=${newPlan.planName}&organization=${newPlan.organization}`
      );

      // Reset form, errors, and close modal
      setNewPlan({ planName: "", organization: "" });
      setErrors({ planName: "", organization: "" });
      setIsModalOpen(false);
    }
  };
  return (
    <div className="min-h-screen">
      <main>
        <div className="mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center mb-5">
            <p className="font-bold text-lg dark:text-white cursor-pointer">
              Dashboard
            </p>
            <IoIosArrowForward className="mx-2" />{" "}
            {/* Add margin to the icon for spacing */}
            <p className="font-bold text-lg text-gray-900 dark:text-white cursor-pointer">
              Plan
            </p>
          </div>
          <div className="max-md:visible md:hidden">
            <UpcomingEvents />
          </div>
          <PlanBoard onNewPlanClick={toggleModal} />
          {/* <PlanBoardDrag /> */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add New Plan</h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={newPlan.planName}
                    onChange={(e) => {
                      setNewPlan({ ...newPlan, planName: e.target.value });
                      setErrors({ ...errors, planName: "" });
                    }}
                    required
                  />
                  {errors.planName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.planName}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={newPlan.organization}
                    required
                    onChange={(e) => {
                      setNewPlan({ ...newPlan, organization: e.target.value });
                      setErrors({ ...errors, organization: "" });
                    }}
                  />
                  {errors.organization && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.organization}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
                    onClick={toggleModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-accentColor text-white px-4 py-2 rounded hover:bg-slate-700"
                    onClick={handleSubmit}
                  >
                    Add Plan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// import PlanTable from "@/app/components/PlanTable";
// import RightNav from "@/app/components/RightNav/RightNav";
// import React, { useEffect } from "react";

// export default function page() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-start">
//       <div className="w-5/6">
//         <PlanTable />
//       </div>
//       <RightNav />
//     </div>
//   );
// }
