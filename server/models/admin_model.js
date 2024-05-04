const db = require("../config/dbconfig");

const AdminSchema = new db.Schema({
    name: String,
    email: String,
    password: String,
    type: String,
});

const AdminModel = new db.model("admin", AdminSchema);

module.exports = AdminModel;