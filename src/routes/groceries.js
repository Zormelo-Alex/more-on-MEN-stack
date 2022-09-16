const {Router} = require("express");
const router = Router();

var groceryList = [
    {item:"Mangoes", 
     quatity: 18
    },
    {item:"Tomatoes",
     quatity: 12
    },
    {item:"Banana",
     quatity: 14
    },
    {item:"Pawpaw",
     quatity: 58
    }
];

router.get("/", (req, res)=>{
    // res.cookie("visited", true, {
    //     maxAge: 60000,
    // })
    res.render("index", {groceryList});
})

router.get("/shopping/cart", (req, res)=>{
    const { cart } = req.session;
    if(!cart){
        res.send("you have no existing carts")
    }else
    res.send(req.session);
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