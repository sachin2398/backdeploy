const express  = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const noticeRoutes = require("./routes/noticeRoutes")

require("dotenv").config();


const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

mongoose.connect(`${process.env.MONGOOSE_URL}test`);
app.get("/",(req,res)=>{
    res.send("server is working")
})
app.use('/auth',authRoutes);
app.use("/notice",noticeRoutes);

app.listen(3000,()=>{
    console.log(`Server is running on ${port}`);
})

