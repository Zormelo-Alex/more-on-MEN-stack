const { Router } = require("express");
const router = Router();
const User = require("../database/shcemas/user")
const passport = require("passport")
const {hashPassword, compare} = require("../utils/helpers")

// router.post("/login", async (req, res)=>{
//     const {username, password} = req.body;
//     if(!username || !password) return res.send(400);
//     const userDB = await User.findOne({username});
//     if(!userDB) return res.status(404).send("invalid username");
//     const comparepass = compare(password, userDB.password);
//     if(!comparepass) return res.status(404).send("invalid password");
//     if(req.session.user){
//         res.status(400).send(req.session.user)
//     }else{
//         req.session.user = userDB;
//         res.status(200).send(req.session)
//     }
//     //if(!userDB) return res.status(404).send("Invalid username");

//     // if(username && password){
//     //     if(req.session.user){
//     //         res.send(req.session.user)
//     //     }else{
//     //         req.session.user = {
//     //             username,
//     //             password
//     //         };
//     //         res.send(req.session)
//     //     }
//     // }else res.send(401)
// });

router.post("/login", passport.authenticate('local'), (req, res)=>{
    console.log("logged in")
    res.send(200)
})

router.get("/dom/:name", (req, res)=>{
    if(req.session.lex){
       const {name} = req.session.lex;
        if(name == "Alexander"){
       console.log(req.session);
       res.send(200) 
        }else res.send(req.params.name); 
    }else res.send(404)
})

router.post("/register", async (req, res)=>{
    const {username, email} = req.body;
    const userDB = await User.findOne({ $or: [{username}, {email}] });
    if(userDB){
        res.status(401).send({msg: "user already exists"})
    }else{
        const password = hashPassword(req.body.password)
        console.log(password);
        const newUser = await User.create({username, password, email});
        res.send(201)
    }
})




module.exports = router;