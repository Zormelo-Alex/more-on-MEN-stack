const { Router } = require("express");
const router = Router();
const User = require("../database/shemas/user")

router.post("/login", (req, res)=>{
    const {username, password} = req.body;
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

router.post("/register", (req, res)=>{
    const {username, password, email} = req.body;
})




module.exports = router;