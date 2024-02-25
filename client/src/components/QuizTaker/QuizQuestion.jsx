import React,{ useRef } from "react";
import QuizOption from "./QuizOption";

const QuizQuestion = (props) => {
  const handleSelectAnswer = (questionId, optionId) => {
    props.onSelectAnswer(questionId, optionId);
  };

  const { question, answers, handleNextQuestion } = props;

  return (
    <div className="col-sm-8 offset-sm-2 mt-4 animate_from_bottom">
      <div className="row">
        <div className="col-sm-10">
          <div className="profile-name">{question?.title}</div>
          <div
            style={{ display: "flex", flexDirection: "column" }}
            className="row pt-3"
          >
            {question?.options.map((option, index) => {
              return (
                <QuizOption
                  key={option.id}
                  id={option.id}
                  value={option.value}
                  handleSelectAnswer={handleSelectAnswer}
                  questionId={question?._id}
                  answers={answers}
                  delay={index * 0.2}
                />
              );
            })}

              <button onClick={handleNextQuestion} className="next_btn">Next</button>

          </div>

          {/* <div className="row pt-3">
            <div className="col-sm-12">
              <label className="option-label">[Answer]</label>
              <select
                defaultValue=""
                className="option-dropdown"
                style={{
                  width: "max-content",
                  marginTop: ".2em",
                  marginLeft: ".5em",
                  color: "var(--quizden-bg-dark)",
                }}
                onChange={handleSelectAnswer}
              >
                <option value="" disabled hidden>
                  Select Answer
                </option>

                {question.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.id + ": " + option.value}
                  </option>
                ))}

              </select>
            </div>
          </div> */}
        </div>
        {/* <div className="col-sm-2">
          <button
            className="remove-button"
            onClick={() => props.onRemove(question.id)}
          >
            <Emoji emoji="🗑️" /> Remove
          </button>
          <button
            className="add-button"
            onClick={() => props.onAddOption(question.id)}
          >
            <Emoji emoji="✍️" /> Add Option
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default QuizQuestion;
