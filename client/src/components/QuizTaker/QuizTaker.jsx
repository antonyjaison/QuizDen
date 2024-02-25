import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import QuizQuestion from "./QuizQuestion";
import Emoji from "../Layout/Emoji";
import QuizService from "../../service/QuizService";

const QuizTaker = ({ user, checkLogin, isLoggedIn, onLogout, history }) => {
  const [quizState, setQuizState] = useState(null); // Changed to null for initial state
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [startQuiz, setStartQuiz] = useState(false);
  const [currentSelectedAns, setCurrentSelectedAns] = useState(false);

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

  useEffect(() => {
    setCurrentQuestion(quizState?.questions[0]);
  }, [quizState]);


  const handleSelectAnswer = (q_id, opt_id) => {
    setCurrentSelectedAns(true);
    let questionExists = false; // Flag to check if the question ID already exists

    const updatedAnswers = answers.map((answer) => {
      if (answer.question_id === q_id) {
        questionExists = true; // Mark that we've found the question
        const isOptionSelected = answer.answers.includes(opt_id);

        return {
          ...answer,
          // Toggle the option: add if not present, remove if it is
          answers: isOptionSelected
            ? answer.answers.filter((id) => id !== opt_id) // Remove opt_id
            : [...answer.answers, opt_id], // Add opt_id
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
    const quiz_id = quizState._id;
    const request = {
      quiz_id,
      answers,
    };

    QuizService.submitAnswer(request).then((response) => {
      console.log(response);

      if (response.status === "error") {
        console.log("Submission failed");
      } else {
        history.push({
          pathname: "/quiz-taken",
          state: { quiz: response.data },
        });
      }
    });
  };


  const handleNextQuestion = () => {
    setCurrentSelectedAns(false);

    if (currentSelectedAns) {
      const currentIndex = quizState.questions.indexOf(currentQuestion);
      const nextIndex = currentIndex + 1;

      if (nextIndex < quizState.questions.length) {
        setCurrentQuestion(quizState.questions[nextIndex]);
      } else {
        handleSubmit();
      }
    } else {
      alert("Please select an answer");
    }
  };

  if (!quizState) {
    return <div>Loading...</div>; // Provide feedback while loading
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error if there is an issue fetching the quiz
  }

  return (
    <React.Fragment>
      <div className="container-fluid quiz_section">
        <div className="row pt-5">
          {startQuiz ? (
            <div className="start_wrapper">
              <button onClick={() => setStartQuiz(false)} className="next_btn">
                Start
              </button>
            </div>
          ) : (
            <QuizQuestion
              key={currentQuestion?.id}
              question={currentQuestion}
              onSelectAnswer={handleSelectAnswer}
              answers={answers}
              handleNextQuestion={handleNextQuestion}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default QuizTaker;
