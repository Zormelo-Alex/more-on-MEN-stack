const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session")
const groceriesRoute = require("./routes/groceries")
const marketRoute = require("./routes/markets")


app.use(express.urlencoded())
app.set("view engine", "ejs");
app.use(cookieParser())
app.use(session({
    secret: "DOM",
    resave: false,
    saveUninitialized: false
}));



app.get("/", (req, res)=>{
    res.redirect("/grocery");
})



app.use("/grocery",groceriesRoute);
app.use("/market",marketRoute);


app.listen("4000", ()=>{
    console.log("server started on port 4000");
});