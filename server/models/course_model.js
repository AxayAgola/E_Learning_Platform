const db = require("../config/dbconfig");

const CourseSchema = new db.Schema({
    c_name: String,
    c_image: String,
    c_desc: String,
    t_id: String,
    t_name: String,
    status: String
});

const CourseModel = new db.model("courses", CourseSchema);

module.exports = CourseModel;