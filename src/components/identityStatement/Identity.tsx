import React, { useState } from "react";
import Statement from "./Statement";
import Modal from "./StatementModal/Modal";
import { IdentityProperty } from "../../utils/Enums/PlanPropertyEnums";

const Identity: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalName, setModalName] = useState("");
  const [identityElements, setIdentityElements] = useState([
    {
      title: "Identity",
      onViewClick: () => {
        setModalName("identity");
        setShowModal(true);
      },
      values: IdentityProperty.IDENTITY,
    },
    {
      title: "Vision",
      onViewClick: () => {
        setModalName("vision");
        setShowModal(true);
      },
      values: IdentityProperty.VISION,
    },
    {
      title: "Mission",
      onViewClick: () => {
        setModalName("mission");
        setShowModal(true);
      },
      values: IdentityProperty.MISSION,
    },
    {
      title: "Value",
      onViewClick: () => {
        setModalName("value");
        setShowModal(true);
      },
      values: IdentityProperty.VALUE,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");

  const addStatement = () => {
    setIdentityElements([
      ...identityElements,
      {
        title: title || "Custom Field", // Use the provided title or default to "Custom Field"
        values: IdentityProperty.EMPTY, // You can adjust this according to your requirement
        onViewClick: () => {},
      },
    ]);
    setTitle(""); // Reset title after adding
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      <div className="mb-4 flex justify-end mr-4">
        {identityElements.length < 7 ? (
          <button
            className="ml-auto px-4 py-2 bg-goldColor text-white rounded-md"
            onClick={() => setIsModalOpen(true)}
          >
            Add +
          </button>
        ) : null}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {identityElements.map((element, index) => (
          <Statement
            key={index} // Ensure to add a unique key
            title={element.title}
            value={element.values}
            onViewClick={element.onViewClick}
          />
        ))}
      </div>

      <Modal
        from={modalName}
        isVisible={showModal}
        setIsVisible={() => {
          setShowModal(false);
          setModalName("");
        }}
      />

      {/* Modal for title input */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-1/3">
            <h2 className="text-xl font-semibold mb-4">Enter Title</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title name"
              className="border border-gray-300 p-2 w-full rounded-md mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={addStatement}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Identity;
