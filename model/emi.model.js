const mongoose=require("mongoose")


const emiSchema=mongoose.Schema({
    loanAmount:{type:Number},
    annualInterestRate:{type:Number},
    months:{type:Number}
})

const EmiModel=mongoose.model("emi",emiSchema)

module.exports={
    EmiModel
}