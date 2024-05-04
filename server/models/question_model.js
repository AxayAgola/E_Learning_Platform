const db = require("../config/dbconfig");

const QuestionSchema = db.Schema({
    question: String,
    optionA: String,
    optionB: String,
    optionC: String,
    optionD: String,
    answer: String,
    course_id: String,
    status: String,
});

const QuestionModel = new db.model("questions", QuestionSchema);

module.exports = QuestionModel;