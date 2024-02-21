import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import QuizQuestion from "./QuizQuestion";
import Emoji from "../Layout/Emoji";
import QuizService from "../../service/QuizService";

const QuizTaker = ({ user, checkLogin, isLoggedIn, onLogout, history }) => {
  const [quizState, setQuizState] = useState(null); // Changed to null for initial state
  const [userState, setUserState] = useState(user);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState([]);

  const { quizId } = useParams();

  useEffect(() => {
    sessionStorage.setItem("quiz-attending", quizId);

    QuizService.findById(quizId).then((response) => {
      if (response === false) {
        setError("Error fetching quiz");
      } else {
        setQuizState(response);
      }
    });
  }, [quizId]);


  const handleSelectAnswer = (q_id, opt_id) => {
    let questionExists = false; // Flag to check if the question ID already exists
  
    const updatedAnswers = answers.map((answer) => {
      if (answer.question_id === q_id) {
        questionExists = true; // Mark that we've found the question
        const isOptionSelected = answer.answers.includes(opt_id);
  
        return {
          ...answer,
          // Toggle the option: add if not present, remove if it is
          answers: isOptionSelected ? 
            answer.answers.filter((id) => id !== opt_id) : // Remove opt_id
            [...answer.answers, opt_id], // Add opt_id
        };
      }
      return answer; // Return the answer unchanged if not the one we're looking for
    });
  
    // If the question ID wasn't found, add a new entry for it
    if (!questionExists) {
      updatedAnswers.push({
        question_id: q_id,
        answers: [opt_id], // Initialize with the new answer
      });
    }
  
    // Update the state or the variable holding the answers
    setAnswers(updatedAnswers);
  };
  

  const handleSubmit = () => {
    const user_id = userState._id;
    const quiz_id = quizState._id;
    const request = {
      user_id,
      quiz_id,
      answers,
    };

    QuizService.submitAnswer(request).then((response) => {
      if (response === false) {
        console.log("Submission failed");
      } else {
        history.push({
          pathname: "/quiz-taken",
          state: { quiz: response },
        });
      }
    });
  };

  if (!checkLogin()) {
    return <Redirect to={{ pathname: "/login" }} />;
  }

  if (!quizState) {
    return <div>Loading...</div>; // Provide feedback while loading
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error if there is an issue fetching the quiz
  }

  return (
    <React.Fragment>
      <NavBar
        isLoggedIn={isLoggedIn}
        checkLogin={checkLogin}
        onLogout={onLogout}
      />
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-sm-8 offset-sm-2 section">
            <div className="profile-name">{quizState.title}</div>
            <div className="profile-email">{quizState.description}</div>
            <div
              className="option-dropdown pt-4"
              style={{ width: "max-content" }}
            >
              <span style={{ color: "var(--quizden-bg-dark)" }}>
                Quiz Type:
              </span>
              {quizState.type}
            </div>
          </div>
        </div>

        <div className="row mt-5">
          {quizState.questions &&
            quizState.questions.map((question) => (
              <QuizQuestion
                key={question.id}
                question={question}
                onSelectAnswer={handleSelectAnswer}
                answers={answers}
              />
            ))}
        </div>

        <div className="row mt-4 mb-4">
          <div className="col-sm-12" style={{ textAlign: "center" }}>
            <button className="tool-button" onClick={handleSubmit}>
              <Emoji emoji="💣" /> Submit
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default QuizTaker;
