const express = require('express');
const CmoduleRouter = express.Router();
const CmoduleModel = require("../models/cmodule_model");

CmoduleRouter.get("/getcmodules/:id/:status?", (req, res) => {
    const id = req.params.id;
    var status = req.params.status;
    if (status == "Published") {
        CmoduleModel.find({
            status: "Published",
            c_id: id
        })
            .then(result => res.json(result))
            .catch(err => res.json(err))
    }
    else {
        CmoduleModel.find({
            c_id: id
        })
            .then(result => res.json(result))
            .catch(err => res.json(err))
    }
});


CmoduleRouter.get("/getmoduledetail/:id", (req, res) => {
    const id = req.params.id;
    CmoduleModel.findById({
        _id: id
    })
        .then(result => res.json(result))
        .catch(err => res.json(err))
});


CmoduleRouter.put("/updatemodule", (req, res) => {
    CmoduleModel.findByIdAndUpdate(
        {
            _id: req.body.id
        },
        {
            m_name: req.body.m_name,
            m_content: req.body.m_content,
            status: req.body.status
        })
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

CmoduleRouter.delete("/deletemodule/:id", (req, res) => {
    const id = req.params.id;
    CmoduleModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err))
});


CmoduleRouter.post("/createmodule", (req, res) => {
    CmoduleModel.create({
        c_id: req.body.c_id,
        m_name: req.body.m_name,
        m_content: req.body.m_content,
        status: req.body.status,
        m_video: req.body.m_video
    })
        .then(module => res.json(module))
        .catch(err => res.json(err));
});

module.exports = CmoduleRouter;