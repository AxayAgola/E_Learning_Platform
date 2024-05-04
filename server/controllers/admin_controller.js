const express = require('express');
const AdminRouter = express.Router();
const AdminModel = require("../models/admin_model");

//Models imported for count function
const UserModel = require("../models/user_model");
const FeedbackModel = require("../models/feedback_model");
const CourseModel = require("../models/course_model");

AdminRouter.get("/getcounts", async (req, res) => {
    const studentcount = await UserModel.find({
        type: "student"
    }).count();
    const teachercount = await UserModel.find({
        type: "teacher"
    }).count();
    const feedbackcount = await FeedbackModel.find({}).count();
    const coursecount = await CourseModel.find({}).count();
    
    res.json({
        studentcount: studentcount,
        teachercount: teachercount,
        feedbackcount: feedbackcount,
        coursecount: coursecount
    });
});

AdminRouter.post("/login", async (req, res) => {
    await AdminModel.findOne({
        email: req.body.email,
        password: req.body.password
    })
        .then((result) => {
            return res.json(result);
        })
        .catch((err) => {
            return res.json(err);
        });
});

AdminRouter.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    await AdminModel.findByIdAndUpdate(
        {
            _id: id
        },
        {
            name: req.body.name,
            password: req.body.password
        })
        .then((result) => {
            return res.json(result);
        })
        .catch((err) => {
            return res.json(err);
        });
});

module.exports = AdminRouter;