const express = require('express');
const QuestionRouter = express.Router();
const QuestionModel = require("../models/question_model");

QuestionRouter.get("/:cid", (req, res) => {
    var cid = req.params.cid;
    QuestionModel.find({
        course_id: cid
    })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
});

QuestionRouter.get("/findquestion/:qid", (req, res) => {
    var qid = req.params.qid;
    QuestionModel.findOne({
        _id: qid
    })
        .then((result) => {
            res.json({
                valid: true,
                obj: result
            });
        })
        .catch((err) => {
            res.json({
                valid: false,
                error: err,
            });
        });
});

QuestionRouter.post("/addquestion", (req, res) => {
    QuestionModel.create({
        question: req.body.question,
        optionA: req.body.optionA,
        optionB: req.body.optionB,
        optionC: req.body.optionC,
        optionD: req.body.optionD,
        answer: req.body.answer,
        course_id: req.body.id,
        status: req.body.status,
    })
        .then((result) => {
            res.json({
                valid: true,
                obj: result
            })
        })
        .catch((err) => {
            res.json({
                valid: false,
                error: err,
            });
        });
});

QuestionRouter.put("/updatequestion/:qid", (req, res) => {
    const qid = req.params.qid;
    QuestionModel.findByIdAndUpdate(
        {
            _id: qid,
        },
        {
            question: req.body.question,
            optionA: req.body.optionA,
            optionB: req.body.optionB,
            optionC: req.body.optionC,
            optionD: req.body.optionD,
            answer: req.body.answer,
            status: req.body.status,
        })
        .then((result) => {
            res.json({
                valid: true,
                obj: result
            })
        })
        .catch((err) => {
            res.json({
                valid: false,
                error: err,
            });
        });
});

QuestionRouter.delete("/deletequestion/:qid", (req, res) => {
    const qid = req.params.qid;
    QuestionModel.findByIdAndDelete(
        {
            _id: qid,
        })
        .then((result) => {
            res.json({
                valid: true,
            })
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = QuestionRouter;