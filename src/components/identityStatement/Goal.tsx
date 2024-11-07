import React, { useState } from "react";
import Statement from "./Statement";
import Modal from "./StatementModal/Modal";
import { GoalProperty } from "../../utils/Enums/PlanPropertyEnums";

const Goal: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalName, setModalName] = useState("");
  const [goalElements, setGoalElements] = useState([
    {
      title: "Culture",
      isStatementAvailable: false,
      onViewClick: () => {
        setModalName("culture");
        setShowModal(true);
      },
      value: GoalProperty.CULTURE,
    },
    {
      title: "Outcome",
      isStatementAvailable: false,
      onViewClick: () => {
        setModalName("outcome");
        setShowModal(true);
      },
      value: GoalProperty.OUTCOME,
    },
    {
      title: "Position",
      isStatementAvailable: true,
      onViewClick: () => {
        setModalName("position");
        setShowModal(true);
      },
      value: GoalProperty.POSITION,
    },
  ]);

  const addStatement = () => {
    setGoalElements([
      ...goalElements,
      {
        title: "Custom Field",
        value: GoalProperty.EMPTY, // You can adjust this according to your requirement
        onViewClick: () => {},
        isStatementAvailable: false,
      },
    ]);
  };

  return (
    <div>
      <div className="mb-4 flex justify-end mr-4">
        {goalElements.length < 7 ? (
          <button
            className="ml-auto px-4 py-2 bg-goldColor text-white rounded-md"
            onClick={() => addStatement()}
          >
            Add +
          </button>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-6">
        {goalElements.map((element, index) => (
          <Statement
            key={index}
            title={element.title}
            value={element.value}
            // isStatementAvailable={element.isStatementAvailable}
            onViewClick={element.onViewClick}
            // statementFor="Goal"
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
    </div>
  );
};

export default Goal;
