const express=require("express")
const {connection}=require("./db")
const {userRoute}=require("./routes/user.route")
const {emiRoute}=require("./routes/emi.routes")
const {auth}=require("./middlewares/auth.middlewares")
const cors = require('cors')
 

const app=express()
app.use(express.json())
app.use(cors())
app.use("/user",userRoute)
app.use(auth)
app.use("/emi",emiRoute)

app.listen(4500,async()=>{
try {
    await connection
    console.log("connected to DB");
    
} catch (error) {
    console.log(error);
}
console.log("runing 4500");
})