const mongoose = require("mongoose");


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



module.exports = mongoose.model(
    "Dice",
    diceSchema
);