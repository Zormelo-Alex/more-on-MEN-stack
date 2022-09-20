const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session")
const authRoute = require("./routes/auth")
const groceriesRoute = require("./routes/groceries")
const marketRoute = require("./routes/markets")
require("./database/index");




app.use(express.urlencoded())
app.set("view engine", "ejs");
app.use(cookieParser())
app.use(session({
    secret: "DOM",
    resave: false,
    saveUninitialized: false
}));

//calling the auth route before the middleware so it doesn't conflict

app.use(authRoute);



app.use((req, res, next)=>{
    if(req.session.user) next();
    else res.send(401);
})



app.get("/", (req, res)=>{
    res.redirect("/grocery");
})



app.use("/grocery",groceriesRoute);
app.use("/market",marketRoute);


app.listen("4000", ()=>{
    console.log("server started on port 4000");
});