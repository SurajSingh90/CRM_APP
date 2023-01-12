// const mongoose = require("mongoose")
// // const students = require("./model/students")
// mongoose.connect("mongodb://localhost/demodb",()=>{
//     console.log("connected to Mongo DB ")



// }, err => {
//     console.log("Error :", err.mssage)
// }
// )


// const Students = require("./model/students")
// getStudent()
// async function getStudent(){
//     const students = await Students.create({
//         names : "suraj singh",
//         age:18
//     })
//     console.log(students)
// }
// // module.exports={
// //     getStudent
// // }

// let id = mongoose.Types.ObjectId('63a08a9868e76b47091db1d7')

// let update = students.updateOne({_id: id},
//     {names: "suraj",$inc: 1},)

// update.then(console.log).catch(console.log)

// const dbConfig = require("./configs/db.config")
const mongoose = require('mongoose') 
// const authController = require("./controllers/auth")
// const User = require("./model/user")

const express = require('express');
const app = express(); 
app.use(express.json())
mongoose.connect("mongodb://localhost:/Usercreated" ,()=>{
    console.log("connected to Mongo DB ");
})


app.get('/',(req,res) =>{
    res.send("yaa scucess")
})

let authRouter = require('./routes/auth.routes')
authRouter(app) 
let ticketRouter = require('./routes/tickets')
ticketRouter(app)   
app.listen(3000,() =>{
    console.log("listening on port 3000")
})

