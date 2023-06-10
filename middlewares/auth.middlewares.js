const express=require("express")
const jwt = require('jsonwebtoken');



const auth=async(req,res,next)=>{
const token = req.headers.authorization;
        if(token){
            
            try {
                jwt.verify(token, 'EMI', function(err, decoded) {
                    if(decoded){
                        next()
                    }
                    else{
                        res.status(400).send({"msg":err})
                    }
                  });
            } catch (error) {
                res.send(error)
            }
        }
        else{
            res.status(400).send({"msg":"Please login!"})
        }
}

module.exports={
    auth
}