const ResultModel = require('../models/result_model');
const CourseModel = require('../models/course_model');
const DateObj = require('../config/datetime_config');
const express = require('express');
const ResultRouter = express.Router();

ResultRouter.get("/:id", (req, res) => {
    ResultModel.find({
        user_id: req.params.id,
    })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
});

ResultRouter.post("/getcertificate/", (req, res) => {
    console.log(req.body.user_id, req.body.course_id);
    ResultModel.findOne({
        user_id: req.body.user_id,
        _id: req.body.res_id,
    })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
});

ResultRouter.post("/add_result", (req, res) => {
    ResultModel.create({
        course_id: req.body.course_id,
        course_name: req.body.course_name,
        user_id: req.body.user_id,
        score: req.body.score,
        status: req.body.status,
        timestamp: DateObj,
    })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = ResultRouter;