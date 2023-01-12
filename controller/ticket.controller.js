const User = require("../model/user")
const Ticket = require("../model/ticket")
const constants = require("../utils/const");
const objectConverter = require("../utils/object");


exports.createTicket = async(req,res)=>{
    const ticketObject = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status, 
        reporter: req.body.userId,
        ticketPriority: req.body.ticketPriority,  

    }
    const engineer = await User.findOne({
        userType: constants.userTypes.engineer,
        userStatus: constants.userStatus.approved
    })
    console.log(engineer)
    ticketObject.assignee = engineer.userId
 
    try {
        const ticket = await Ticket.create(ticketObject)
        console.log(ticket)
        res.send(ticket)

        if (ticket) {
            const user = await User.findOne({
                userId: req.body.userId

            })
            user.ticketsCreated.push(ticket._id)
            // user.ticketsCre
            await user.save()
  
            engineer.ticketsAssigned.push(ticket._id)
            await engineer.save()

            res.status(201).send(objectConverter.ticketResponse(ticket))
        }
    } catch (err) {
        console.log("Some error happened while creating ticket", err.message)
        res.status(500).send({
            message: 'Some internal server error'
        })
    } 
} 




exports.ticketUpdate = async (req,res)=>{
    // const ticketId = req.params.id;
    try{ 
        const updateT = await Ticket.findOneAndUpdate({_id: req.params.id},{
            title: req.body.title,  
        }).exec()
        // console.log("update part",updateT)
        if(updateT){
            res.status(200).send({message:"success",updateT}) 
        }
    }catch(err){
        console.log("some error happened while updating ticket",err)
        res.status(500).send({
            message: 'Some internal server error'
        }) 
    }
}