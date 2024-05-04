const express = require('express');
const FeedbackRouter = express.Router();
const FeedbackModel = require('../models/feedback_model');

FeedbackRouter.get("/", (req, res) => {
    FeedbackModel.find({})
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err);
        });
});

FeedbackRouter.get("/getfeedback/:id", (req, res) => {
    FeedbackModel.findById({
        _id: req.params.id,
    })
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err);
        });
});

FeedbackRouter.post("/insertfeedback/", (req, res) => {
    FeedbackModel.create({
        u_id: req.body.uid,
        u_email: req.body.uemail,
        feedback: req.body.feedback
    })
        .then((result) => {
            res.json({
                valid: true,
                obj: result.data
            })
        })
        .catch((err) => {
            res.json({
                valid: true,
                err: result.data
            })
        });
});

FeedbackRouter.delete("/deletefeedback/:id", (req, res) => {
    FeedbackModel.findByIdAndDelete({
        _id: req.params.id,
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
                obj: err
            });
        })
});

module.exports = FeedbackRouter;