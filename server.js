const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();


// Middleware

app.use(cors());

app.use(express.json());



// MongoDB Connection

mongoose.connect(process.env.MONGO_URL)

.then(()=>{

    console.log("MongoDB Connected");

})

.catch((error)=>{

    console.log(error);

});





// Dice Schema

const diceSchema = new mongoose.Schema({

    number:{
        type:Number,
        required:true
    },


    date:{
        type:Date,
        default:Date.now
    }

});



const Dice = mongoose.model("Dice",diceSchema);






// HOME API

app.get("/",(req,res)=>{

    res.send("Dice Backend Running");

});






// ==========================
// POST - Create Dice Roll
// ==========================

app.post("/api/dice",async(req,res)=>{


    try{


        const randomNumber =
        Math.floor(Math.random()*6)+1;



        const dice = new Dice({

            number:randomNumber

        });



        await dice.save();



        res.status(201).json({

            message:"Dice Created",

            result:randomNumber

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});







// ==========================
// GET - Get All Dice History
// ==========================

app.get("/api/dice",async(req,res)=>{


    try{


        const data = await Dice.find();



        res.status(200).json(data);



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});









// ==========================
// GET - Get Single Dice By ID
// ==========================

app.get("/api/dice/:id",async(req,res)=>{


    try{


        const dice = await Dice.findById(req.params.id);



        res.json(dice);



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});









// ==========================
// PUT - Update Dice
// ==========================


app.put("/api/dice/:id",async(req,res)=>{


    try{


        const updatedDice =
        await Dice.findByIdAndUpdate(

            req.params.id,

            {

                number:req.body.number

            },

            {
                new:true
            }

        );



        res.json({

            message:"Dice Updated",

            data:updatedDice

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});









// ==========================
// DELETE - Delete Dice
// ==========================


app.delete("/api/dice/:id",async(req,res)=>{


    try{


        await Dice.findByIdAndDelete(req.params.id);



        res.json({

            message:"Dice Deleted"

        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});









// Server

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{


    console.log(`Server running on ${PORT}`);


});