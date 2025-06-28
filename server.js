const authRouter = require("./Routers/auth");
const cors = require("cors");
const express = require("express");
const expressListEndpoints = require("express-list-endpoints");
const session = require("express-session");
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,        // in prod: true + HTTPS
    sameSite: 'none',     // ← allow on JS fetch()/XHR
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use((req, res, next) => {
  console.log('Session at', req.method, req.url, req.session);
  next();
});


app.use(authRouter);

app.get("/", (req,res) => {

    res.send("hi");
});

app.listen(9000, ()=>{
    console.log("Listening in 9000");
})