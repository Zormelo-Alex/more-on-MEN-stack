const {Router} = require("express");
const router = Router();

var groceryList = [
    {item:"Mangoes", 
     quantity: 18
    },
    {item:"Tomatoes",
     quantity: 12
    },
    {item:"Banana",
     quantity: 14
    },
    {item:"Pawpaw",
     quantity: 58
    }
];

//some sort of validation middleware befor user is allowed to acces any route
router.use((req, res, next)=>{
    //passport creates a req object once logged in
    //the req.user data is from the deserialized user object
    if(req.user) next();
    else res.send(401);
})

router.get("/", (req, res)=>{
    //passport also modifies the session with a user object which stores the id since thats what we stored there in the strategy
    //var id = req.session.passport.user;
    res.render("index", {groceryList})
})

router.get("/shopping/cart", (req, res)=>{
    const { cart } = req.session;
    if(!cart){
        res.send("you have no existing carts")
    }else
    res.send(req.session.cart);
})
router.post("/shopping/cart/item", (req, res)=>{
    const {item, quantity} = req.body;
    const cartItem = {item, quantity}
    const { cart } = req.session;
    if(cart){
        req.session.cart.items.push(cartItem)  
    }else{
        req.session.cart = {
            items: [cartItem],
        }
    }
    res.send(req.session)
});

router.get("/:name", (req, res)=>{
    //console.log(req.cookies)
    const { name } = req.params;
    const out = groceryList.find((g) => g.item === name);
    res.send(out);
});

router.post("/", (req, res)=>{
    //console.log(req.body);
    //arr.push(req.body);
    res.redirect("/"+req.body.item)
})


module.exports = router;