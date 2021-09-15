const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

//  enabling env
dotenv.config();

//  connecting db
mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log("Connected to MongoDB");
    }
);





const app = express();


//  middlewares - body parser
app.use(express.json());

app.use(helmet())
app.use(morgan("common"))


app.get("/", (req, res) => {
    res.send("Welcome!")
})

app.get("/users", (req, res) => {
    res.send("Welcome to users page!")
})


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

//  calling the server
app.listen(8800, () => {
    console.log("Server is running")
})