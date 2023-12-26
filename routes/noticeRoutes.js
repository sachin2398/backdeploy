const express = require("express");
const router = express.Router();
const authenticationToken = require("../middleware/authMiddleware");
const Notice = require("../models/noticeModule");

router.post('/create',authenticationToken,async(req,res)=>{
    try {
        const {title,body,category } = req.body;
        const user = req.user;

        const newNotice = new Notice({
            title,body,category,
            user:user._id,
        });
        await newNotice.save();
         res.send(newNotice);
    } catch (error) {
        console.log(error);
        return res.send({ err: error });
    }
})

router.get('/',authenticationToken,async(req,res)=>{

    try {
        const user = req.user;
        const notices = await Notice.find({user:user._id});
        res.json(notices)
    } catch (error) {
        console.log(error);
        return res.send({ err: error });
    }
})

router.get("/:id",authenticationToken,async(req,res)=>{

    try {
        const user = req.user;
        const notice = await Notice.findOne({_id: req.params.id, user:user_id});
        if(!notice){
            return res.send({ err: "Notice not found" });
        }
        res.json(notice);
    } catch (error) {
        console.log(error);
        return res.send({ err: error });
    }
})

router.put("/:id",authenticationToken,async(req,res)=>{

    try {
        const user = req.user;
        const {title,body,category } = req.body;
        const updatedNotice = await Notice.findOneAndUpdate(
            {_id: req.params.id, user:user_id},
            {title,body,category },
            {new:true}
        ) 
        if(!updatedNotice){
            return res.send({ err: "Notice not found" });
        }
        res.json(updatedNotice);
    } catch (error) {
        console.log(error);
        return res.send({ err: error });
    }
})

router.delete('/:id',authenticationToken,async(req,res)=>{

    try {
        const user = req.user;
        const deletenotice = await Notice.findOneAndDelete({_id: req.params.id, user:user_id});
        if(!deletenotice){
            return res.send({ err: "Notice not found" });
        }
        res.json(deletenotice)
    } catch (error) {
        console.log(error);
        return res.send({ err: error });
    }
})

module.exports = router;