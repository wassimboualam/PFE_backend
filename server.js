const authRouter = require("./Routers/auth");
const cors = require("cors");
const express = require("express");
const expressListEndpoints = require("express-list-endpoints");
const session = require("express-session");
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  
  credentials: true,
}));
app.use(session({
    secret: process.env.SESSION_SECRET || "The secret formula",
    resave: false,
    saveUninitialized: true
}));

app.use(authRouter);

app.get("/", (req,res) => {

    res.send("hi");
});

app.listen(9000, ()=>{
    console.log("Listening in 9000");
})