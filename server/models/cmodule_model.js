const db = require("../config/dbconfig");

const CmoudleSchema = new db.Schema({
   c_id: String,
   m_name: String,
   m_content: String,
   status: String,
   m_video: String,
});

const CmoduleModel = new db.model("course_modules", CmoudleSchema);

module.exports = CmoduleModel;