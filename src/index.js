const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session")
const passport = require("passport")
require("./strategy/local")

const authRoute = require("./routes/auth")
const groceriesRoute = require("./routes/groceries")
const marketRoute = require("./routes/markets")
require("./database/index");

//creating a session memory store so user wont be logged out once server restarts
const memoryStore = new session.MemoryStore()


app.use(express.urlencoded())
app.set("view engine", "ejs");
app.use(cookieParser())
app.use(session({
    secret: "DOM",
    resave: false,
    saveUninitialized: false,
    store: memoryStore,
}));

//calling the auth route before the middleware so it doesn't conflict
//so the user can login before the middleware bellow kicks in...





app.use((req, res, next)=>{
    //logging the request method and url (get:/grocery)
    console.log(`${req.method} : ${req.url}`);
    //logging the memorystore
    console.log(memoryStore)
    next();
})


app.get("/", (req, res)=>{
    res.redirect("/grocery");
})

app.use(passport.initialize())
app.use(passport.session())


app.use("/grocery",groceriesRoute);
app.use("/market",marketRoute);
app.use(authRoute);



app.listen("4000", ()=>{
    console.log("server started on port 4000");
});