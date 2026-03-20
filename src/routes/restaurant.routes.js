const express=require("express")
const authMiddleware=require("../middlewares/auth.middleware")
const restaurantController=require("../controllers/restaurant.controller")


const router=express.Router();

router.post("/addrestaurant",authMiddleware,restaurantController.addRestaurant)
router.get("/viewrestaurants",restaurantController.viewRestaurants)
router.get("/getmyrestaurant",authMiddleware,restaurantController.getMyRestaurant)
router.delete("/deletemyrestaurant/:restaurantid",authMiddleware,restaurantController.deleteMyRestaurant)
router.put("/updaterestaurant/:restaurantid",authMiddleware,restaurantController.updateRestaurant)

module.exports=router