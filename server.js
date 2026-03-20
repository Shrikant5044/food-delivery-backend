require("dotenv").config()
const app = require("./src/app");
const connectDB=require("./src/db/connectDB")

connectDB();



const PORT=process.env.PORT

app.listen(PORT, () => {
    console.log(`Server Started successfully at  port ${PORT}`)
})