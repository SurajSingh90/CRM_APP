const mongoose = require("mongoose")
 

const studentdata = new mongoose.Schema({
    names : String,
    age: Number,
    emails:String,
    createdAt:String,
    updatedAt:String
})

const addressSChemas = new mongoose.Schema({
    add1:String,
    pincode:Number,
    city:String,
    state:String,

    
})


module.exports = mongoose.model("students",studentdata)