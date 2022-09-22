const { Router } = require("express");
const router = Router();
const User = require("../database/shcemas/user")
const {hashPassword, compare} = require("../utils/helpers")

router.post("/login", (req, res)=>{
    const {username, password} = req.body;
    const hashedPassword = hashPassword(req.body.password);
    const found = compare(password, hashedPassword);
    if(found){
        console.log("user validated!")
    }else console.log("not validated");
    if(username && password){
        if(req.session.user){
            res.send(req.session.user)
        }else{
            req.session.user = {
                username,
                password
            };
            res.send(req.session)
        }
    }else res.send(401)
});

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
        const newUser = await User.create({username, password, email});
        res.send(201)
    }
})




module.exports = router;