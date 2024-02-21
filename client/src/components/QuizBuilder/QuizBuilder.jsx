import React, { useState } from "react";
import NavBar from "../Layout/NavBar";
import Question from "./Question";
import Emoji from "../Layout/Emoji";
import QuizService from "../../service/QuizService";
import { Redirect } from "react-router-dom";

function QuizBuilder({ isLoggedIn, checkLogin, onLogout, history }) {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    type: "",
    questions: [],
  });
  
  console.log("quiz_builder => ",quiz)

  // Handles changes to quiz title, description, and type
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      [name]: value,
    }));
  };

  // Adds a new question to the quiz
  const handleAddQuestion = () => {
    const newQuestion = {
      id: quiz.questions.length + 1,
      title: "",
      options: [],
      answer: [],
    };
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: [...prevQuiz.questions, newQuestion],
    }));
  };

  // Removes a question from the quiz
  const handleRemoveQuestion = (id) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: prevQuiz.questions.filter((question) => question.id !== id),
    }));
  };

  // Handles changes to question titles
  const handleQuestionTitleChange = (id, value) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: prevQuiz.questions.map((question) =>
        question.id === id ? { ...question, title: value } : question
      ),
    }));
  };

  // Adds a new option to a question
  const handleQuestionAddOption = (questionId) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: prevQuiz.questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: [
                ...question.options,
                { id: question.options.length + 1, value: "" },
              ],
            }
          : question
      ),
    }));
  };

  // Handles option value changes
  const handleOptionChange = (questionId, optionId, value) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: prevQuiz.questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.map((option) =>
                option.id === optionId ? { ...option, value: value } : option
              ),
            }
          : question
      ),
    }));
  };

  // Removes an option from a question
  const handleRemoveOption = (questionId, optionId) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: prevQuiz.questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.filter(
                (option) => option.id !== optionId
              ),
            }
          : question
      ),
    }));
  };

  // Selects the answer for a question
  const handleSelectAnswer = (questionId, optionId) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: prevQuiz.questions.map((question) =>
        question.id === questionId
          ? { ...question, answer: [...question.answer, optionId] }
          : question
      ),
    }));
  };

  // Resets the entire quiz to its initial state
  const handleResetAll = () => {
    setQuiz({ title: "", description: "", type: "", questions: [] });
  };

  // Submits the quiz
  const handleSubmitQuiz = async () => {
    const response = await QuizService.submit(quiz);
    if (response !== false) {
      const { _id } = response;
      history.push({
        pathname: "/quiz-done",
        state: { quiz_id: _id },
      });
    } else {
      // Handle invalid quiz submission
    }
  };

  if (!checkLogin()) {
    return <Redirect to={{ pathname: "/login" }} />;
  }

  return (
    <React.Fragment>
      <NavBar
        isLoggedIn={isLoggedIn}
        checkLogin={checkLogin}
        onLogout={onLogout}
      />
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-8 offset-sm-2 section">
            <input
              className="profile-name input-quiz-title"
              placeholder="Legendary Quiz Title"
              name="title"
              value={quiz.title}
              onChange={handleInputChange}
            />
            <input
              className="profile-email input-quiz-desc mt-1"
              placeholder="Legendary Quiz Description"
              name="description"
              value={quiz.description}
              onChange={handleInputChange}
            />
            <div className="row mt-5 pl-3">
              <select
                className="option-dropdown"
                name="type"
                value={quiz.type}
                onChange={handleInputChange}
              >
                <option value="" disabled hidden>
                  Quiz Type
                </option>
                <option value="AMATEUR">Amateur</option>
                <option value="TIME_TRIAL" disabled>
                  Time Trial (Pro)
                </option>
              </select>
            </div>
          </div>
        </div>
        {quiz.questions.map((question, index) => (
          <Question
            key={question.id}
            question={question}
            onTitleChange={handleQuestionTitleChange}
            onRemove={handleRemoveQuestion}
            onAddOption={() => handleQuestionAddOption(question.id)}
            onSelectAnswer={handleSelectAnswer}
            onOptionRemove={handleRemoveOption}
            onOptionChange={handleOptionChange}
          />
        ))}

        <div className="row mt-4 mb-4 col-sm-8 offset-sm-2" style={{ textAlign: "center" }}>
          <button className="tool-button" onClick={handleAddQuestion}>
            <Emoji emoji="💣" /> Add Question
          </button>
          <button className="tool-button" onClick={handleResetAll}>
            <Emoji emoji="✂️" /> Reset Quiz
          </button>
          <button className="tool-button" onClick={handleSubmitQuiz}>
            <Emoji emoji="🔨" /> Submit Quiz
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default QuizBuilder;
