const express = require('express')
const userModel = require("../models/user.model")

const router = express.Router()

router.post("/register",async(req,res)=> {
    const {username,password} = req.body

    const user = await userModel.create({
        username,password
    })

    res.status(201).json({
        message: "User Register successfully",
        user
    })
})

router.post("/login",async(req,res)=> {
    const {username,password} = req.body

    const userExist = await userModel.findOne({
        username :username
    })

    if(!userExist){
        return res.status(201).json({
            message:"Invalid username",
        })
    }

    const isPasswordValid = password === userExist.password
    if(!isPasswordValid){
        return res.status(401).json({
            message: "invalid password"
        })
    }
    res.status(200).json({
        message:"user login successfully"
    })
    

})

module.exports = router