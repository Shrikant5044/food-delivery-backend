const mongoose = require("mongoose")

const menuSchema = new mongoose.Schema({


   name: {
      type: String,
      required: true
   },

   price: {
      type: Number,
      required: true
   },

   category: {
      type: String,
      required: true
   },

   restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurants",
      required: true

   }


})

menuModel=mongoose.model("Menu",menuSchema);


module.exports=menuModel;