const { Router } = require("express");
const router = Router();

const marketList = [
    {
        id: 1,
        name: "Ho",
        location: "Ho-station",
        miles: 0.5
    },
    {
        id: 2,
        name: "Agomenya",
        location: "Krobo land",
        miles: 2.8
    },
    {
        id: 3,
        name: "Teshie",
        location: "somewhere in someplace",
        miles: 5.5
    },
    {
        id: 4,
        name: "Awoshie",
        location: "Awoshie area",
        miles: 1.5
    },
]

router.get("/", (req, res)=>{
    const { miles } = req.query;
    if(miles){
        //convert miles from search from string to int
        const parsedMiles = parseInt(miles);
        //checking if parsed miles is a number
        if(!isNaN(parsedMiles)){
            //finding all records less than inputed miles
            const filteredMarkets = marketList.filter((m)=> m.miles <= parsedMiles);
            res.send(filteredMarkets);
        }else res.send("invalid input!")
    }else
    res.send(404)
});



module.exports = router;