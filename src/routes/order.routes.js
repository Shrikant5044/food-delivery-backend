const express=require("express")
const authMiddleware=require("../middlewares/auth.middleware")
const orderController=require("../controllers/order.controller")

const router =express.Router();

router.post("/placeorder",authMiddleware,orderController.placeOrder)
router.get("/myorder",authMiddleware,orderController.myOrder)
router.put("/updatestatus/:id",authMiddleware,orderController.updateStatus)
router.delete("/deleteorder/:id",authMiddleware,orderController.deleteOrder)
router.get("/restaurantorders",authMiddleware,orderController.restaurantOrders)



module.exports=router