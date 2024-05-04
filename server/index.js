const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotnev = require('dotenv').config();

const app = express();

app.use(cors({
    origin: [process.env.WEB_URL],
    methods: ["POST","GET", "PUT", "DELETE"]
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

const fileConfig = require("./config/multerconfig");
app.use("/files", fileConfig);

const userController = require("./controllers/users_controller");
app.use("/users",userController);

const coursesController = require("./controllers/courses_controller");
app.use("/courses",coursesController);

const cmoduleController = require("./controllers/cmodule_controller");
app.use("/cmodule", cmoduleController);

const resultController = require("./controllers/result_controller");
app.use("/result", resultController);

const adminController = require("./controllers/admin_controller");
app.use("/admin", adminController);

const questionController = require("./controllers/questions_controller");
app.use("/questions", questionController);

const feedbackController = require("./controllers/feedback_controller");
app.use("/feedback", feedbackController);

app.listen(process.env.PORT, () => {
    console.log("Server is running...");
});