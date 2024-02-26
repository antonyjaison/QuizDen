import React from "react";
import Emoji from "../Layout/Emoji";
import DateUtil from "../../Utils/DateUtil";
import { Link } from "react-router-dom";
import QuizService from "../../service/QuizService";

const QuizInfo = (props) => {

  const deleteQuizFromDb = (quizID) => {
    QuizService.deleteQuiz(quizID)
      .then((response) => {
        if (response === false) {
          console.log(response);
          alert("Error deleting quiz");
        } else {
          console.log(response);
          alert("Quiz deleted successfully");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error deleting quiz: " + err.message);
      });
  }

  return (
    <React.Fragment>
      <tr style={{}}>
        <th
          scope="row"
          className="counterCell"
          style={{
            fontFamily: `"Lexend Deca", sans-serif`,
            fontSize: "14px",
            fontWeight: "bold",
          }}
        ></th>
        <td
          className="option-name"
          style={{
            fontFamily: `"Lexend Deca", sans-serif`,
            color: "var(--quizden-bg-dark)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "5px",
          }}
        >
          {props.title}
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to={`/update/${props?.id}`}>
              <button className="update_btn">Update</button>
            </Link>
            <button onClick={() => deleteQuizFromDb(props?.id)} className="update_btn">Delete</button>
          </div>
        </td>
        <td
          style={{
            fontFamily: `"Roboto", sans-serif`,
            color: "dimgray",
          }}
        >
          {DateUtil.getFormatedDateTime(props.date)}
        </td>
        <td
          className="option-dropdown"
          style={{ color: "var(--quizden-bg-dark" }}
        >
          {props.participated}
        </td>
        <td
          className="option-dropdown"
          style={{ color: "var(--quizden-bg-dark" }}
        >
          {props.flawless}
        </td>
        <td
          style={{
            fontFamily: `"Lexend Deca", sans-serif`,
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          <span
            style={{
              margin: "8px",
            }}
          >
            <Emoji emoji="🧲" />
          </span>
          {props.id}
        </td>
      </tr>
      {/* <div className="row">
        <div className="col-sm-5 option-name">{props.title}</div>
        <div
          className="col-sm-2 option-dropdown"
          style={{ color: "var(--quizden-bg-dark" }}
        >
          {props.participated}
        </div>
        <div
          className="col-sm-2 option-dropdown"
          style={{ color: "var(--quizden-bg-dark" }}
        >
          {props.flawless}
        </div>
        <div className="col-sm-3">
          <div className="card">
            <div
              className="option-dropdown"
              style={{
                fontSize: "14px",
                width: "100%",
              }}
            >
              <span
                style={{
                  margin: "8px",
                }}
              >
                <Emoji emoji="🧲" />
              </span>
              {props.id}
            </div>
          </div>
        </div>
      </div> */}
      {/* <hr /> */}
    </React.Fragment>
  );
};

export default QuizInfo;
