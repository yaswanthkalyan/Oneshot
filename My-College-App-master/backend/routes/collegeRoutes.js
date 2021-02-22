const express = require('express');
const router = express.Router();
const sesion = require('express-session');
const College = require('../database/models/colleges');

router.post('/:id', (req, res) => {
    console.log("save college route")
    console.log(req.body, "fixing");
    console.log(req.params, 'ID')

    const{school, location, costPrivate, costPublic, userId }= req.body;
    College.findOne({collegeName: school}, (err, college) => {
        if(err) {
            console.log(err)
        } else if (college) {
            res.json({
                error:'Sorry college alerady added'
            })
        }
        else {
            console.log("++++++++ adding college")
            const newCollege = new College({
                collegeName: school,
                location,
                costPrivate,
                costPublic,
                userId
            })
            console.log(newCollege);
            newCollege.save((err, savedCollege) => {
                if(err) return res.json(err)
                res.json(savedCollege)
                console.log("college Saved")
            })
        }
    })
})

router.get('/', (req, res) => {
    //need to get userId from state and pass it as const user

    let user = req.query.user;
    console.log(user)
    console.log("Getting colleges for user" + user)
  
    console.log("setp 3 get call")
    College.find({ userId: user }, (err, colleges) => {

        if(err) {
            console.log("Get college error"+err)
        }
        console.log("show all colleges GetCollege Route 44")
        res.json(colleges).status(200).send();
        return
    })
})

router.delete("/saved/:id", (req,res) => {
    College.remove({_id: req.params.id}, (err, college) => {
        if(err) return err;
        res.status(200).send();
    })
})

module.exports=router;