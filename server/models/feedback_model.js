const db = require('../config/dbconfig');

const FeedbackSchema = new db.Schema({
    u_id: String,
    u_email: String,
    feedback: String,
});

const FeedbackModel = new db.model("feedback", FeedbackSchema);

module.exports = FeedbackModel;