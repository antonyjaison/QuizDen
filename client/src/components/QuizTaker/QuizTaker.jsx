import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../Layout/NavBar';
import QuizQuestion from './QuizQuestion';
import Emoji from '../Layout/Emoji';
import QuizService from '../../service/QuizService';

const QuizTaker = ({ quiz, user, checkLogin, isLoggedIn, onLogout, history }) => {
  const [answers, setAnswers] = useState(() => {
    return quiz.questions.map(question => ({
      question_id: question.id,
      answer: -1,
    }));
  });
  const [quizState, setQuizState] = useState(quiz);
  const [userState, setUserState] = useState(user);

  // Mimic componentDidMount
  useEffect(() => {
    sessionStorage.setItem('quiz-attending', quiz._id);
  }, [quiz._id]); // Empty array means this runs once on mount

  const handleSelectAnswer = (q_id, opt_id) => {
    const updatedAnswers = answers.map(answer =>
      answer.question_id === q_id ? { ...answer, answer: opt_id } : answer
    );
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

    QuizService.submitAnswer(request).then(response => {
      if (response === false) {
        console.log('FAILED!');
      } else {
        history.push({
          pathname: '/quiz-taken',
          state: { quiz: response },
        });
      }
    });
  };

  if (!checkLogin()) {
    return <Redirect to={{ pathname: '/login' }} />;
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
            <div className="profile-name">{quiz.title}</div>
            <div className="profile-email">{quiz.description}</div>
            <div
              className="option-dropdown pt-4"
              style={{
                width: 'max-content',
              }}
            >
              <span style={{ color: 'var(--quizden-bg-dark)' }}>
                Quiz Type:{' '}
              </span>
              {quiz.type}
            </div>
          </div>
        </div>

        <div className="row mt-5">
          {quiz.questions.map(question => (
            <QuizQuestion
              key={question.id}
              question={question}
              onSelectAnswer={handleSelectAnswer}
            />
          ))}
        </div>
        <div className="row mt-4 mb-4">
          <div
            className="col-sm-12"
            style={{
              textAlign: 'center',
            }}
          >
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
