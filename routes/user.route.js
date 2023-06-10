const express=require("express")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {UserModel}=require("../model/user.model")
const userRoute=express.Router()

//register

userRoute.post("/register",async(req,res)=>{
    const {email,name,password}=req.body
    try {
        bcrypt.hash(password, 5, async(err, hash)=> {
            if(hash){
                const user=new UserModel({name,email,password:hash})
               await user.save()
               res.send({"msg":"Registration successful"})
            }
        });
        
    } catch (error) {
        res.send(error)
    }

})


// login

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    
    
    try {
        const user= await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(result){
                   const token= jwt.sign({ name:user.name, authorID:user._id }, "EMI")
                        res.send({"msg":"Login successful","token":token,})
                }
                else{
                    res.send({"msg":"Password is wrong!"})
                }
            });

        }
        else{
            res.send({"msg":"user not found!"})
        }
        
        
    } catch (error) {
        res.send(error)
    }
})

module.exports={
    userRoute
}

