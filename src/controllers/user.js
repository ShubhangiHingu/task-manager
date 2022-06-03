const mongoose = require("mongoose");
const multer = require('multer')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user')
const upload = require("../middleware/upload");



// Handle incoming POST requests to /users

//create new user



const createUser = (async (req, res) => {
    const { name, email, password: plainTextPassword } = req.body

    const password = await bcrypt.hash(plainTextPassword, 10)


    try {
        const user = await User.create({
            name,
            email,
            password
        })
        // const token = await user.generateAuthToken()

        console.log('User created successfully: ', user)
    
    } catch (error) {
        if (error.code === 500) {

            return res.json({ status: 'error', error: 'name already in use' })
        }
        throw error
    }

    res.json({ status: 'ok', data: { name, email, password } })
})

//login user

const loginUser = (async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid email/password' })
    }

    if (await bcrypt.compare(password, user.password)) {

        const token = jwt.sign(
            {
                _id: user._id.toString()
            },
            'thisismynewcourse'
        )

        return res.json({ status: 'ok', data: { email, password, token } })
    }

    return res.json({ status: 'error', error: 'Invalid email/password' })
})


//logout user

const logoutUser = (async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        return res.json({status:'success'})
    } catch (e) {
        return res.status(500).json({success:false});

    }
})


//logAllout user

const logoutAllUser = (async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        return res.json({status:'success'})
    } catch (e) {
        return res.status(500).json({success:false});

    }
})

//get user

const getUser = (async (req, res) => {
    res.send(req.user)
})


//update user

const updateUser = (async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        return res.status(500).json({success:false});
    }
})

//delete user

const deleteUser = (async (req, res) => {
    try {
        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
       return res.status(500).json({success:false});
    }
})


//upload  files img/doc/word

//upload avatar



const avatarUser = (upload.array('avatar'), (req, res) => {
    console.log(req.files);                                         // UPLOADED FILE DESCRIPTION RECEIVED
    res.send({
        status: "success",
        message: "Files uploaded successfully",
        data: req.files,
    })
});




//delete avatar

const deleteAvatar = (async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
        return res.json({status:'success'})
})


//get avatar id

const getAvatarId = (async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
       return res.status(500).json({success:false});
       
    }
})


module.exports = {
    createUser,
    getUser,
    loginUser,
    logoutUser,
    logoutAllUser,
    updateUser,
    avatarUser,
    deleteAvatar,
    getAvatarId,
    deleteUser,
}