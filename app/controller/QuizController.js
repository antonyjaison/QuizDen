const Joi = require("@hapi/joi");

const Quiz = require("../model/Quiz");
const QuizzerController = require("./QuizzerController");
const verifyAnswers = require("../../client/src/Utils/VerifyAnswers");

const QuizController = {
  createQuiz: async (req, res, next) => {
    const { title, description, type, questions } = req.body;
    const user_id = req.params.user_id;

    // const quizSchema = Joi.object({
    //   user_id: Joi.string().required(),
    //   title: Joi.string().required(),
    //   description: Joi.string(),
    //   type: Joi.string().required(),
    //   questions: Joi.array().required(),
    // });

    try {
      // create Quiz
      const quiz = new Quiz({ user_id, title, description, type, questions });
      // //   validating given data
      // const { error } = quizSchema.validate(quiz);
      // console.log(error);
      // if (error)
      //   return res.status(400).send("[validation error] Invalid data given.");
      // return res.status(200).send("HU");
      const savedQuiz = await quiz.save();

      const quizzer = QuizzerController.incrementCuratedCount(user_id);
      if (quizzer) {
        return res.status(200).send(savedQuiz);
      }
      return res.status(400).send("Quizzer Does not exist.");
    } catch (err) {
      console.log("Error", err);
      return res.status(400).send("Does not exist.");
    }
  },

  deleteQuiz: async (req, res, next) => {
    const { quizID } = req.params;
    console.log(quizID);
  
    try {
      // Check if the quiz exists before attempting to delete.
      const quizExists = await Quiz.findById(quizID);
      if (!quizExists) {
        // If the quiz does not exist, respond with a 404 Not Found status.
        return res.status(404).send("Quiz not found.");
      }
  
      // If the quiz exists, delete it.
      await Quiz.findByIdAndDelete(quizID);
      return res.status(200).send({ message: "Quiz successfully deleted." });
    } catch (err) {
      console.error("Error", err); // Using console.error for errors (better for debugging).
      return res.status(500).send({ error: "An error occurred while deleting the quiz." });
    }
  },
  

  findById: async (req, res, next) => {
    try {
      const quiz = await Quiz.findById(req.params.quiz_id);
      if (quiz) {
        // remove answers and send
        const { questions } = quiz;

        for (let i = 0; i < questions.length; i++) {
          const { _id, options, id, title } = questions[i];
          questions[i] = { _id, options, id, title };
        }
        
        quiz.questions = questions;
        return res.status(200).send(quiz);
      }
      return res.status(400).send("Quiz not found.");
    } catch (err) {
      console.log("Error", err);
      return res.status(400).send("Invalid data given.");
    }
  },

  findByIdWithAnswers: async (req, res, next) => {
    try {
      const quiz = await Quiz.findById(req.params.quizID);
      if (quiz) {
        return res.status(200).send(quiz);
      }
      return res.status(400).send("Quiz not found.");
    } catch (err) {
      console.log("Error", err);
      return res.status(400).send("Invalid data given.");
    }
  },

  findAll: async (req, res, next) => {
    try {
      const quizzes = await Quiz.find();
      if (quizzes) {
        return res.status(200).send(quizzes);
      }
      return res.status(400).send("Invalid data given.");
    } catch (err) {
      console.log("Error", err);
      return res.status(400).send("Invalid data given.");
    }
  },

  findByUser: async (req, res, next) => {
    try {
      const quizzes = await Quiz.find({ user_id: req.params.user_id });
      if (quizzes) {
        return res.status(200).send(quizzes);
      }
      return res.status(400).send("Invalid data given.");
    } catch (err) {
      console.log("Error", err);
      return res.status(400).send("Invalid data given.");
    }
  },

  updateQuiz: async (req, res, next) => {
    const { quizID } = req.params
    const quiz = req.body
    try {
      const updatedQuiz = await Quiz.findByIdAndUpdate
      (quizID, quiz, { new: true });
      if (updatedQuiz) {
        return res.status(200).send(updatedQuiz);
      }
      return res.status(400).send("Invalid data given.");
    } catch (err) {
      console.log("Error", err);
      return res.status(400).send("Invalid data given.");
    }
  },

  submitQuizAnswer: async (req, res, next) => {
    try {
      const { quiz_id, answers } = req.body;

      const quiz = await Quiz.findById(quiz_id);

      if (quiz) {
        const result = verifyAnswers(quiz,answers)
        return res.status(200).send({
          status:"success",
          data:result
        });
      }else{
        return res.status(400).send({
          status:"error",
          message:"Quiz not found!"
        });
      }



      // if (quiz) {
      //   let solved = 0;
      //   const { questions } = quiz;
      //   for (let i = 0; i < questions.length; i++) {
      //     if (questions[i].answer === answers[i].answer) {
      //       solved++;
      //     }
      //   }

      //   // update quiz stats
      //   quiz.participated++;
      //   quiz.flawless += Number(solved === questions.length); // + 0 or 1
      //   const updatedQuiz = await Quiz.findByIdAndUpdate(quiz_id, quiz);

      //   // update quizzer stats
      //   const updatedQuizzer = await QuizzerController.incrementParticipationCount(
      //     user_id,
      //     solved === questions.length
      //   );

      //   const response = {
      //     user_id: user_id,
      //     quiz_id: quiz_id,
      //     total_questions: questions.length,
      //     solved: solved,
      //   };
      //   res.status(200).send(response);
      // } else {
      //   res.status(400).send("Quiz not found!");
      // }
    } catch (err) {
      console.log("Error", err);
      return res.status(400).send("Invalid data given.");
    }
  },
};
module.exports = QuizController;
