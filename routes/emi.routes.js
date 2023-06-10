const express=require("express")

const {EmiModel}=require("../model/emi.model")
const emiRoute=express.Router()


emiRoute.post("/emicalculate",async(req,res)=>{
    const {loanAmount,annualInterestRate,months}=req.body
    try {
        if(loanAmount&&annualInterestRate&&months){
        const r=annualInterestRate/12/100
        const emi=loanAmount*r*(1+r)**months/((1+r)**months-1)
        const interestPayable=Math.abs(loanAmount-(emi*months))
        const totalPayment=emi*months
        res.send({"emi":emi,"totalPayment":totalPayment,"interestPayable":interestPayable})
        }
        else{
            res.status(400).send({"msg":"Invaild input!"})
        }

        
    } catch (error) {
        res.send(error)
    }
})
module.exports={
    emiRoute
}