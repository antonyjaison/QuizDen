function verifyAnswers(databaseQuestions, submittedAnswers) {
    const results = [];
    const { questions } = databaseQuestions

    questions.forEach(question => {
        const db_q = submittedAnswers.find(submitedAns => submitedAns.question_id === question._id.toString())

        const res = question.answer.every(option => {
            return db_q.answers.includes(option)
        })
        
        results.push({
            question_id:question._id.toString(),
            question: question.question,
            result: res
        })

    })

    return results;
}

module.exports = verifyAnswers
