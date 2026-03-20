const express=require("express")
const menuController=require("../controllers/menu.controller")
const authMiddleware=require("../middlewares/auth.middleware")

const router=express.Router()


router.post("/additem/:restaurantid",authMiddleware,menuController.additem)
router.get("/viewitems/:restaurantid",menuController.viewitems)
router.delete("/deleteitem/:id",authMiddleware,menuController.deleteitem)
router.put("/updateitem/:id",authMiddleware,menuController.updateitem)



module.exports=router;