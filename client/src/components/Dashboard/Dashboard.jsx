import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../Layout/NavBar';
import Profile from './Profile';
import Tools from './Tools';
import CuratedQuizList from './CuratedQuizList';
import QuizService from '../../service/QuizService';
import QuizzerService from '../../service/QuizzerService';

function Dashboard(props) {
  const [user, setUser] = useState(props.user);

  // Equivalent to componentDidMount and componentDidUpdate for user_id and authToken
  useEffect(() => {
    const authToken = sessionStorage.getItem('quizden-authToken');
    const user_id = sessionStorage.getItem('quizden-user-id');

    // Get Quizzer profile
    const fetchQuizzerProfile = async () => {
      const response = await QuizzerService.getQuizzer(user_id, authToken);
      if (response !== false) {
        setUser(response);
        props.onUserUpdate(response);
      }
    };

    fetchQuizzerProfile();

    // Get Quizzes
    const fetchQuizzes = async () => {
      const response = await QuizService.findByUser(user_id);
      if (response !== false) {
        props.onQuizLoad(response);
      }
    };

    fetchQuizzes();
  }, [props]);

  if (!props.checkLogin()) {
    return <Redirect to={{ pathname: "/login" }} />;
  }

  return (
    <React.Fragment>
      <NavBar
        isLoggedIn={props.isLoggedIn}
        checkLogin={props.checkLogin}
        onLogout={props.onLogout}
      />
      <div className="container-fluid">
        <div className="row mt-5">
          <Profile
            classes="col-sm-4 offset-sm-1 mr-4 section"
            name={user.name}
            email={user.email}
            curated={user.quizCurated}
            attended={user.quizAttended}
            flawless={user.quizFlawless}
          />

          <Tools
            classes="col-sm-6 ml-4 section tools"
            title="Quizzer Tools"
            subtitle="Some tools may only be available in Pro License"
          />
        </div>
        <div className="row mt-5 mb-5">
          <CuratedQuizList
            classes="curated-quiz-section section"
            quizzes={props.quizzes}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
