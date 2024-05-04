const db = require('../config/dbconfig');

const ResultSchema = db.Schema({
    course_id: String,
    course_name: String,
    user_id: String,
    score: Number,
    status: String,
    timestamp: String
});

const ResultModel = new db.model("result", ResultSchema);

module.exports = ResultModel;