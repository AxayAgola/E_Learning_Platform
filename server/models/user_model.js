const db = require("../config/dbconfig");

const UserSchema = new db.Schema({
    name: String,
    email: String,
    password: String,
    type: String,
    image: String
});

const UserModel = new db.model("users", UserSchema);
    
module.exports = UserModel;