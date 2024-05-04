const express = require('express');
const UserRouter = express.Router();
const UserModel = require('../models/user_model')
const mailconfig = require('../config/mailconfig');

UserRouter.get("/:type?", (req, res) => {
    var type = req.params.type;
    UserModel.find({
        type: type,
    })
        .then(users => res.json(users))
        .catch(err => res.json(err))
});

UserRouter.get("/chkauth/:ut", (req, res) => {
    if (req.session.userobj != undefined) {
        console.log(req.session.userobj);
        return res.json({
            valid: true,
            uobj: req.session.userobj
        });
    }
    else {
        return res.json({
            valid: false,
        });
    }
})

UserRouter.get("/getuser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id })
        .then(users => res.json(users))
        .catch(err => res.json(err))
});


UserRouter.post("/isaccountvalid", async (req, res) => {
    const user = await UserModel.find({
        email: req.body.email.toLowerCase(),
    })

    if (user.length == 0) {
        res.json({
            valid: true
        })
    }
    else {
        res.json({
            valid: false
        });
    }

});

UserRouter.post("/login", async (req, res) => {
    await UserModel.findOne({
        email: req.body.email.toLowerCase(),
        password: req.body.password.toLowerCase()
    }).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.json(err)
    });
});

UserRouter.put("/updateuser/:id", async (req, res) => {

    const id = req.params.id;

    const user = await UserModel.findOne({
        email: req.body.email.toLowerCase(),
    })

    var isValid;

    if (user == null || user == undefined) {
        isValid = true;
    }
    else {
        if (user._id.toString() == id) {
            isValid = true;
        }
        else {
            isValid = false;
        }
    }

    if (isValid) {
        UserModel.findByIdAndUpdate(
            { _id: id },
            {
                name: req.body.name,
                email: req.body.email.toLowerCase(),
                password: req.body.password.toLowerCase()
            }
        ).then(users => res.json(users))
            .catch(err => res.json(err));
    }
    else {
        res.json({
            valid: false
        });
    }

});

UserRouter.delete("/deleteuser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
        .then(res => res.json(res))
        .catch(err => res.json(err))
});


UserRouter.post("/signup", (req, res) => {
    var mailOptions = {
        from: 'kaushalbakraniya97@gmail.com',
        to: 'kaushalbakraniya90@gmail.com',
        subject: 'Welcome to E-Learning Platform',
        text: `Welcome ${req.body.name}, \nWe welcome you to E-Learning Platform. \n\nRegards, \nKaushal Bakraniya @ ELS Systems LLC`
    }

    UserModel.create({
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        password: req.body.password.toLowerCase(),
        type: req.body.type,
        image: req.body.image.toLowerCase(),
    }).then(users => {
        mailconfig.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Email sent: ' + info.response);
            }
        });
        res.json(users);
    })
        .catch(err => res.json(err))
});


module.exports = UserRouter;