const express = require('express');
const CourseRouter = express.Router();
const CourseModel = require("../models/course_model");
const nodemailer = require("../config/mailconfig");

CourseRouter.get("/:status?", (req, res) => {
    var status = req.params.status;
    if (status == "Published") {
        CourseModel.find({
            status: "Published"
        })
        .then(course => res.json(course))
        .catch(err => res.json(err));
    }
    else
    {
        CourseModel.find({})
        .then(course => res.json(course))
        .catch(err => res.json(err));
    }
});

CourseRouter.get("/getcourse/:id", (req, res) => {
    const id = req.params.id;
    CourseModel.findById({
        _id: id
    }).then(course => res.json(course))
        .catch(err => res.json(err));
});

CourseRouter.get("/getteachercourse/:id", (req, res) => {
    const id = req.params.id;
    CourseModel.find({
        t_id: id
    }).then(course => res.json(course))
        .catch(err => res.json(err));
});

CourseRouter.post("/createcourse", (req, res) => {
    CourseModel.create({
        c_name: req.body.c_name,
        c_desc: req.body.c_desc,
        c_image: req.body.c_banner,
        t_id: req.body.t_id,
        t_name: req.body.t_name,
        status: req.body.status,
    })
        .then(course => res.json(course))
        .catch(err => res.json(err));
});

CourseRouter.put("/updatecourse/:id", (req, res) => {
    const id = req.params.id;
    CourseModel.findByIdAndUpdate(
        {
            _id: id
        },
        {
            c_name: req.body.name,
            c_desc: req.body.c_desc,
            t_id: req.body.t_id,
            t_name: req.body.t_name,
            status: req.body.status
        }
    ).then(result => res.json(result))
        .catch(err => res.json(err));
});

CourseRouter.delete("/deletecourse/:id", (req, res) => {
    const id = req.params.id;
    CourseModel.findByIdAndDelete({ _id: id })
        .then(res => res.json(res))
        .catch(err => res.json(err))
});

module.exports = CourseRouter;