import React, { useEffect, useState } from "react";

const QuizOption = ({ questionId, handleSelectAnswer, id, value, answers, delay }) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    // Find the question in the answers array
    const question = answers.find((answer) => answer.question_id === questionId);
    
    // Check if the current option id is in the selected answers for the question
    const isOptionSelected = question?.answers.includes(id);
    
    setIsSelected(isOptionSelected);
  }, [answers, questionId, id]); // Depend on answers, questionId, and id to re-evaluate when they change

  return (
    <button
      onClick={() => handleSelectAnswer(questionId, id)}
      className={`row quiz_option ${isSelected ? "option_selected" : ""}`}
    >
      <label className={`option-label ${isSelected ? "option_num_selected" : ""}`}>{id}</label>
      <p className={`option_input`}>{value}</p>
    </button>
  );
};

export default QuizOption;
