import axios from "axios";
require("dotenv").config();

const QuizService = {
  submit: async (request) => {
    const user_id = sessionStorage.getItem("quizden-user-id");
    const authToken = sessionStorage.getItem("quizden-authToken");
    return await axios
      .post("/api/v1/quizzes/create/" + user_id, request, {
        headers: {
          "auth-token": authToken,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return false;
      });
  },
  findByUser: async (user_id) => {
    const authToken = sessionStorage.getItem("quizden-authToken");
    return await axios
      .get("/api/v1/quizzes/quizzer/" + user_id, {
        headers: {
          "auth-token": authToken,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return false;
      });
  },
  findById: async (quiz_id) => {
    return await axios
      .get("/api/v1/quizzes/" + quiz_id)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return false;
      });
  },
  submitAnswer: async (request) => {
    const uri = "/api/v1/quizzes/submit/";
    return await axios
      .post(uri, request)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return false;
      });
  },
};

export default QuizService;
