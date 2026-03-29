const mongoose=require("mongoose")

const orderSchema=new mongoose.Schema({

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
  },

  restaurant:{
 type:mongoose.Schema.Types.ObjectId,
 ref:"Restaurants",
 required:true
},



items:[
   
 { menuItemId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Menu",
       required:true
  },

  name:{
    type:String,
    required:true
  },

  price:{
     type:Number,
    required:true
  },

  quantity:{
    type:Number,
    required:true
  }

}
],

totalPrice:{
  type:Number,
  required:true
},


status:{
  type:"String",
  emum:["Pending","Preaparing","Out for Delivery","Delivered","Cancelled"],
  default:"pending"
},



},{timestamps:true})

const orderModel=mongoose.model("orders",orderSchema)

module.exports=orderModel;

