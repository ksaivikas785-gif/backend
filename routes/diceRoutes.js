const express = require("express");

const router = express.Router();


const Dice = require("../models/Dice");



// Roll Dice API

router.post("/roll",async(req,res)=>{


    try{


        let randomNumber =
        Math.floor(Math.random()*6)+1;



        const dice = new Dice({

            number:randomNumber

        });



        await dice.save();



        res.json({

            message:"Dice Rolled",

            result:randomNumber

        });



    }
    catch(error){


        res.status(500)
        .json(error);


    }


});





// Get History

router.get("/",async(req,res)=>{


    const data = await Dice.find();


    res.json(data);


});



module.exports = router;