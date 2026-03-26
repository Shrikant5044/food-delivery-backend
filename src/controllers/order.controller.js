const orderModel=require("../models/orders.model");
const menuModel=require("../models/menu-card.model")
const restaurantModel=require("../models/restaurant.model")



const placeOrder=async (req,res) => {


    try{        
        const{restaurantId,items}=req.body
        
        if(!restaurantId||!items||items.length===0){
            
            return res.status(400).json({message:"Restaurant or items are required"})
            
        }
        
        
        const restaurant =await restaurantModel.findById(restaurantId)
        
        if(!restaurant){
            return res.status(404).json({message:"Restaurant Not Found"})
        }

        
        let orderItems=[];
        let totalPrice=0

        for(const item of items){
            const menuitem=await menuModel.findById(item.itemid)

            if(!menuitem){
                return res.status(404).json({message:"Menu items Not Found"})
            }

            if(menuitem.restaurant.toString()!=restaurantId){
                return res.status(400).json({message:"Items Does not belong to same restaurant"})
            }


             orderItems.push({
              
                menuItemId:menuitem._id,
                name:menuitem.name,
                price:menuitem.price,
                quantity:item.quantity
                
            });

            totalPrice+=menuitem.price*item.quantity;
            
    
        }


         const order=await orderModel.create({
                restaurant:restaurantId,
                user:req.userId,
                items:orderItems,
                totalPrice:totalPrice
            })

            res.status(200).json({message:"Order Placed Successfully",order})
        
        
    }catch (err) {
            res.status(500).json({ message: "Server Error",err })}
}

const myOrder=async(req,res)=>{
   
        try {
            
           const order=await orderModel.find({user:req.userId}).populate("restaurant","restaurantName address").populate("user","name email")
           
           if(order.length===0){
            return res.status(404).json({message:"No Order Found"})
           }

           res.status(200).json({message:"Order Fetched Successful",order:order})


        } catch (err) {
            res.status(500).json({message:"Server Error",err})
            
        }

}

const restaurantOrders=async(req,res)=>{

     try {
        
         const restaurant=await restaurantModel.findOne({owner:req.userId})

         if(!restaurant){
            return res.status(404).json({message:"Restaurant Not Found"})
         }
   
    const orders=await orderModel.find({restaurant:restaurant._id}).populate("restaurant","rastaurantName address").populate("user","name address ")
    
    if(orders.length===0){
       return  res.status(404).json({message:"No Orders Found"})
    }
     
    res.status(200).json({message:"Orders Fetched Successfully",orders:orders})




} catch (err) {

    res.status(500).json({message:"Server error"})

 }

}

const updateStatus=async(req,res)=>{

   try{
    
       const orderId=req.params.id;
       const{ status}=req.body;
       
       if(!orderId||!status)
        {
            return res.status(400).json({message:"All fields are Required"})
        }
        
      const  order=await orderModel.findById(orderId)

      if(!order){
        return res.status(404).json({message:"Order Not Found"})
      }

      const restaurant = await restaurantModel.findOne({owner:req.userId})

      if(!restaurant){
        res.status(404).json("NO Restaurant Found")
      }

      if(order.restaurant.toString()!==restaurant._id.toString()){
            
        return res.status(403).json({message:"Restaurant doesn't match  "})

      }

      await orderModel.findByIdAndUpdate(orderId,{status},{new:true})


      res.status(200).json({message:"Status Updated Successfully"})


    }catch(err){
        res.status(500).json({message:"Server Error"})
    }
}

const deleteOrder=async(req,res)=>{
     
    try {

           const orderId=req.params.id

           if(!orderId){
            return res.status(400).json({message:"Order Id Missing"})
           }

           const order = await orderModel.findById(orderId)

           if(!order){
            return res.status(404).json({message:"Order Not Found"})
           }

           if(order.user.toString()!==req.userId.toString()){
            return res.status(403).json({message:"Access denied"})
           }

           await orderModel.findByIdAndDelete(orderId)

           res.status(200).json({message:"Order Cancelled Successfully "})



        
    } catch (err) {
        res.status(500).json({message:"Server Error"})
    }


}





module.exports={placeOrder,myOrder,updateStatus,deleteOrder,restaurantOrders}

