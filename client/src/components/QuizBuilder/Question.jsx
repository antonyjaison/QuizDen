import React from "react";
import Emoji from "../Layout/Emoji";
import Option from "./Option";

const Question = ({
  onTitleChange,
  onOptionChange,
  onOptionRemove,
  onSelectAnswer,
  question,
  onRemove,
  onAddOption,
}) => {
  const handleTitleChange = (e) => {
    onTitleChange(question.id, e.target.value);
  };

  const handleOptionChange = (opt_id, value) => {
    onOptionChange(question.id, opt_id, value);
  };

  const handleOptionRemove = (opt_id) => {
    onOptionRemove(question.id, opt_id);
  };

  const handleSelectAnswer = (e) => {
    onSelectAnswer(question.id, parseInt(e.target.value));
  };

  return (
    <div className="col-sm-8 offset-sm-2 section mt-4">
      <div className="row">
        <div className="col-sm-10">
          <input
            type="text"
            className="profile-name input-question-title"
            placeholder="Question ?"
            value={question.title}
            onChange={handleTitleChange}
          />
          <div className="row pt-3">
            {console.log(question)}
            {question.options.map((option) => (
              <Option
                key={option.id}
                id={option.id}
                value={option.value}
                onChange={handleOptionChange}
                onDelete={handleOptionRemove}
              />
            ))}
          </div>
          <div className="row pt-3">
            <div className="col-sm-12">
              <label className="option-label">[Answer]</label>
              <div
                className="option-dropdown"
                style={{
                  marginTop: ".2em",
                  marginLeft: ".5em",
                }}
              >
                {question.options.map((option) => (
                  <div
                    key={option.id}
                    style={{ color: "var(--quizden-bg-dark)" }}
                  >
                    <input
                      type="checkbox"
                      id={`checkbox-${option.id}`}
                      name="answer"
                      value={option.id}
                      onChange={handleSelectAnswer}
                    />
                    <label
                      htmlFor={`checkbox-${option.id}`}
                      style={{ marginLeft: ".5em" }}
                    >
                      {option.id + ": " + option.value}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <button
            className="remove-button"
            onClick={() => onRemove(question.id)}
          >
            <Emoji emoji="🗑️" /> Remove
          </button>
          <button
            className="add-button"
            onClick={() => onAddOption(question.id)}
          >
            <Emoji emoji="✍️" /> Add Option
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
