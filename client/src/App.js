import React, { useState } from 'react';
import "./App.css";
import Landing from "./components/Landing/Landing";
import Registration from "./components/Authentication/Registration";
import Login from "./components/Authentication/Login";
import RegistrationDone from "./components/Authentication/RegistrationDone";
import Dashboard from "./components/Dashboard/Dashboard";
import QuizBuilder from "./components/QuizBuilder/QuizBuilder";
import QuizDone from "./components/QuizBuilder/QuizDone";
import QuizFetcher from "./components/QuizTaker/QuizFetcher";
import QuizTaker from "./components/QuizTaker/QuizTaker";
import QuizTaken from "./components/QuizTaker/QuizTaken";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('quizden-isLoggedIn') === 'LOGGED_IN' ? 'LOGGED_IN' : 'NOT_LOGGED_IN');
  const [user, setUser] = useState({
    _id: "",
    name: "",
    email: "",
    quizCurated: 0,
    quizAttended: 0,
    quizFlawless: 0,
  });
  const [quizAttending, setQuizAttending] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [authToken, setAuthToken] = useState("");

  const checkLogin = () => sessionStorage.getItem('quizden-isLoggedIn') === 'LOGGED_IN';

  const handleLogin = (response) => {
    setIsLoggedIn('LOGGED_IN');
    setUser(response);
    setAuthToken(sessionStorage.getItem('quizden-authToken'));
    sessionStorage.setItem('quizden-isLoggedIn', 'LOGGED_IN');
  };

  const handleLogout = () => {
    setIsLoggedIn('NOT_LOGGED_IN');
    sessionStorage.removeItem('quizden-isLoggedIn');
    sessionStorage.removeItem('quizden-authToken');
  };

  const handleUserUpdate = (response) => {
    setUser(response);
  };

  const handleQuizzesCurated = (quizzes) => {
    setQuizzes(quizzes.reverse());
  };

  const handleQuizFetch = (quiz) => {
    setQuizAttending(quiz);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={(props) => (
          <Landing
            {...props} 
            isLoggedIn={isLoggedIn} 
            checkLogin={checkLogin} 
            onLogout={handleLogout} 
          />
        )} />
        <Route exact path="/registration" render={(props) => (
          <Registration 
            {...props} 
            isLoggedIn={isLoggedIn} 
            checkLogin={checkLogin} 
            onLogout={handleLogout} 
          />
        )} />
        <Route exact path="/login" render={(props) => (
          <Login 
            {...props} 
            onLogin={handleLogin} 
            isLoggedIn={isLoggedIn} 
            checkLogin={checkLogin} 
            onLogout={handleLogout} 
          />
        )} />
        <Route exact path="/done" render={(props) => (
          <RegistrationDone 
            {...props} 
            isLoggedIn={isLoggedIn} 
            checkLogin={checkLogin} 
            onLogout={handleLogout} 
          />
        )} />
        <Route exact path="/dashboard" render={(props) => (
          <Dashboard 
            {...props} 
            isLoggedIn={isLoggedIn} 
            checkLogin={checkLogin} 
            onLogout={handleLogout} 
            user={user} 
            quizzes={quizzes} 
            onQuizLoad={handleQuizzesCurated} onUserUpdate={handleUserUpdate} />
          )} 
        />
        <Route exact path="/quiz-builder" render={(props) => (
          <QuizBuilder 
            {...props} 
            isLoggedIn={isLoggedIn} 
            checkLogin={checkLogin} 
            onLogout={handleLogout} 
            user={user} 
            />
          )} 
        />
        <Route exact path="/quiz-done" render={(props) => (
          <QuizDone 
            {...props} 
            isLoggedIn={isLoggedIn} 
            checkLogin={checkLogin} 
            onLogout={handleLogout} 
            user={user}
             />
        )} />
        <Route exact path="/quiz-fetcher" render={(props) => (
          <QuizFetcher 
            {...props} 
            isLoggedIn={isLoggedIn} 
            checkLogin={checkLogin} 
            onLogout={handleLogout} 
            onQuizFetch={handleQuizFetch} 
          />
        )} />
        <Route exact path="/quiz-taker" render={(props) => (
          <QuizTaker 
            {...props} 
            isLoggedIn={isLoggedIn} 
            checkLogin={checkLogin} 
            onLogout={handleLogout} 
            quiz={quizAttending} 
            user={user} 
          />
        )} />
        <Route exact path="/quiz-taken" render={(props) => (
          <QuizTaken 
            {...props} 
            isLoggedIn={isLoggedIn} 
            checkLogin={checkLogin} 
            onLogout={handleLogout} 
          />
          )} 
        />
      </Switch>
    </Router>
  );
}

export default App;
