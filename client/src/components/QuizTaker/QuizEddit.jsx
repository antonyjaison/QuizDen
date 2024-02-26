import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuizService from "../../service/QuizService";
import spinner from "../../assets/spinner.svg";

const QuizEdit = () => {
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const { quizID } = useParams();

  useEffect(() => {
    QuizService.findByIdWithAnswers(quizID)
      .then((response) => {
        if (response === false) {
          setError("Error fetching quiz");
        } else {
          setQuiz(response);
        }
      })
      .catch((err) => setError("Error fetching quiz: " + err.message));
  }, [quizID]);

  const onTitleChange = (questionIndex, e) => {
    const updatedQuiz = { ...quiz };
    updatedQuiz.questions[questionIndex].title = e.target.value;
    setQuiz(updatedQuiz);
  };

  const onOptionChange = (questionIndex, optionIndex, e) => {
    const updatedQuiz = { ...quiz };
    updatedQuiz.questions[questionIndex].options[optionIndex].value =
      e.target.value;
    setQuiz(updatedQuiz);
  };

  const onCorrectAnswerChange = (questionIndex, optionId) => {
    const updatedQuiz = { ...quiz };
    let answer = updatedQuiz.questions[questionIndex].answer || [];

    if (answer.includes(optionId)) {
      answer = answer.filter((id) => id !== optionId); // Remove the ID if it's already in answers
    } else {
      answer.push(optionId); // Add the ID if it's not in answers
    }

    updatedQuiz.questions[questionIndex].answer = answer;
    setQuiz(updatedQuiz);
  };

  const updateQuizOption = () => {
    setIsUpdating(true);
    QuizService.updateQuiz(quiz, quizID)
      .then((response) => {
        if (response === false) {
          console.log(response);
          setError("Error updating quiz");
        } else {
          setQuiz(response);
        }
      })
      .catch((err) => setError("Error updating quiz: " + err.message))
      .finally(() => setIsUpdating(false));
  };

  if (!quiz) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="container mt-5 mb-4">
        <h1 style={{ color: "#fff" }}>Update Quiz</h1>
        {quiz.questions.map((question, qIndex) => (
          <div key={qIndex} className="edit_quiz_wrapper section mt-5">
            <input
              type="text"
              className="profile-name input-question-title"
              placeholder="Question ?"
              value={question.title}
              onChange={(e) => onTitleChange(qIndex, e)}
            />

            <div className="edit_ans_section">
              <div className="edit_options">
                {question.options.map((option, oIndex) => (
                  <input
                    key={oIndex}
                    type="text"
                    value={option.value}
                    onChange={(e) => onOptionChange(qIndex, oIndex, e)}
                  />
                ))}
              </div>

              <div>
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="edit_checkbox">
                    <input
                      type="checkbox"
                      id={`${qIndex}_${oIndex}`}
                      checked={question.answer?.includes(option.id) || false}
                      onChange={() => onCorrectAnswerChange(qIndex, option.id)}
                    />
                    <label htmlFor={`${qIndex}_${oIndex}`}>
                      {option.value}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div
          className="mt-4"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
          }}
        >
          <button onClick={updateQuizOption} className="update_btn">
            Update Quiz
          </button>
        </div>
      </div>

      {isUpdating && (
        <div className="loader">
          <img src={spinner} alt="spinner" />
        </div>
      )}
    </>
  );
};

export default QuizEdit;
