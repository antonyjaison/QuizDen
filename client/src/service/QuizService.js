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
  
  deleteQuiz: async (quizID) => {
    const authToken = sessionStorage.getItem("quizden-authToken");
    console.log(quizID,authToken)
    try {
      const response = await axios.delete(`/api/v1/quizzes/delete-quiz/${quizID}`, {
        headers: {
            "auth-token": authToken,
        }
      });
      return response.data;
    } catch (err) {
      console.error("Error deleting quiz:", err);
      return false;
    }
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

  updateQuiz: async (quiz, quiz_id) => {
    const authToken = sessionStorage.getItem("quizden-authToken");
  
    // Corrected axios put request
    return await axios
      .put("/api/v1/quizzes/update-quiz/" + quiz_id, quiz, { // Passing quiz directly
        headers: {
          "auth-token": authToken,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.error(err); // It's good practice to log the error for debugging
        return false;
      });
  },
  
  findByIdWithAnswers: async (quiz_id) => {
    return await axios
      .get("/api/v1/quizzes/quizzes-with-answers/" + quiz_id)
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
