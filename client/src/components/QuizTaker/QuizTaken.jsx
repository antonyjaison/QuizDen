import React from "react";
import NavBar from "../Layout/NavBar";

const QuizTaken = (props) => {
  const { quiz } = props?.location?.state;

  // filter the correct answers
  var solved = quiz.filter(q => q.result)

  return (
    <React.Fragment>
      {/* <NavBar
        isLoggedIn={props.isLoggedIn}
        checkLogin={props.checkLogin}
        onLogout={props.onLogout}
      /> */}
      <div className="container fluid">
        <div className="row">
          <div
            className="col-sm-12"
            style={{
              fontFamily: `'Lexend Deca', sans-serif`,
              fontSize: "36px",
              color: "var(--quizden-light)",
              marginTop: "30vh",
              textAlign: "center",
            }}
          >
            You solved {solved.length} out of {quiz.length}!!!
            {/* <span
              style={{
                color: "var(--quizden-dark-purple)",
              }}
            >
              Quizzer
            </span> */}
          </div>
        </div>
        <div className="row pt-3">
          <div
            className="col-sm-12"
            style={{
              fontFamily: `'Roboto', sans-serif`,
              fontSize: "18px",
              color: "var(--quizden-light-purple)",
              textAlign: "center",
            }}
          >
            Don't cry because it is over, smile because it happened!
          </div>
        </div>
        {/* <div className="row mt-5">
          <div
            className="col-sm-12"
            style={{
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: `'Lexend Deca', sans-serif`,
                fontSize: "22px",
                color: "var(--quizden-deep-purple)",
                padding: "1.4em",
                border: "2px solid var(--quizden-dark-purple)",
                borderRadius: "12px",
                margin: "auto",
                width: "fit-content",
                backgroundColor: "var(--quizden-light)",
              }}
            >
              BLA BLA
            </div>
          </div>
        </div> */}
      </div>
    </React.Fragment>
  );
};

export default QuizTaken;
