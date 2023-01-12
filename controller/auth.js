const User = require("../model/user")
const { userTypes } = require("../utils/const")
const constants = require("../utils/const")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const configer = require("../configs/auth.config") 
 

exports.signup = async (req, res) => { 
    let userStatus

    if (req.body.userType == userTypes.engineer || 
        req.body.userType == userTypes.admin) {
        userStatus = constants.userStatus.approved 
    } else {
        userStatus = constants.userStatus.approved
    }

    console.log(req)
    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        userType: req.body.userType,
        password: bcrypt.hashSync(req.body.password, 8),
        userStatus: userStatus
    }   

    try {
        const userCreated = await User.create(userObj)
        const postReponse = {
            name: userCreated.name,
            userId: userCreated.userId,
            email: userCreated.email,
            userType: userCreated.userType,
            userStatus: userCreated.userStatus,
            createdAt: userCreated.createAt,
            updatedAt: userCreated.updateAt
        }
        res.status(201).send(postReponse)
    } catch (err) {
        console.log("Something went wrong while saving to DB", err.message)
        res.status(500).send({
            message: "Some internal error while inserting the element"
        })
    }
}

 
exports.login =  async function(req,res){
    const user = await User.findOne({userId: req.body.userId})
    console.log("Signin Reques for ", user)
    if(!user){
        res.status(400).send({  message: "Failed! Userid doesn't exist!"})
        return
    }
    if(user.userStatus != constants.userStatus.approved){
        res.status(403).send({
            message: `Can't allow login as user is in status : [${user.userStatus}]`
        })
        return
    }
    const passwordValid = bcrypt.compareSync(req.body.password, user.password)
    if(!passwordValid){
            res.status(403).send({message: "Password is not valid"})
            return
    }
    let token = jwt.sign({id : user.userId},configer.secretkey,{
        expiresIn: 86400
    })
    
    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userTypes: user.userType,
        userStatus: user.userStatus,
        accessToken: token
    })
}