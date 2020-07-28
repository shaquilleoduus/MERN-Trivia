const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user')
dotenv.config({ path: './.env' });
const app = express();
app.use(express.urlencoded());
app.use(express.json());
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB is connected"));
app.get("/", (req, res) => {
    res.send("Hello world")
});
app.post("/register", async (req, res) => {
    // just to test would grab info from form
    let userName = req.body.userName;
    let userEmail = req.body.userEmail;
    try {
        await User.create({
            name: userName,
            email: userEmail
        });
        res.json({
            result: "User Registered"
        })
    } catch (error) {
        console.log(error);
        res.send("email already in DB");
    }
});
// send results to front end as API
app.get("/results", (req,res) => {
    res.json({
        name: "Joe",
        city: "New York",
        age: 28
    })
});
app.listen(5000, () => {
    console.log("Server is running on port 5000")
});