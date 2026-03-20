const express=require("express")
const  authRoutes=require("./routes/auth.routes")
const userRoutes=require("./routes/user.routes")
const restaurantRoutes=require("./routes/restaurant.routes")
const menuRoutes=require("./routes/menu.routes")
const orderRoutes=require("./routes/order.routes")


const app=express()
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/restaurant",restaurantRoutes)
app.use("/api/menu",menuRoutes)
app.use("/api/orders",orderRoutes)



 module.exports=app;