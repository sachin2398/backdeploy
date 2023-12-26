const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const routes = express.Router();
const User = require("../models/userModel");


//sign up
routes.post("/register", async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
      phone_number: req.body.phone_number,
      department: req.body.department,
    });
    await user.save();
    res.send({ msg: "user register sucessfully" });
  } catch (error) {
    console.log(error);
    res.send({ err: error });
  }
});


//login

routes.post('/login',async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
                return res.send({ err: "User not found" });
        }
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass){
            return res.send({ err: "Invalid pass" });
        }
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
        res.header("Authorization", token).send(token);
    } catch (error) {
        console.log(error)
        res.send({ err: error });
    }
})

module.exports = routes