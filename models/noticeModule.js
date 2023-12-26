const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
    title: String,
    body:String,
    category:{type:String, enum:["parking", "covid", "maintenance"]},
    date:{type:Date, default:Date.now},
    user:{type:mongoose.Schema.Types.ObjectId, ref: "User"}
})

const Notice = mongoose.model("Notice", noticeSchema);
module.exports = Notice;