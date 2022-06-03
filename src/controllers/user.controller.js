const mongoose = require("mongoose");
const multer = require('multer')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user.models')
const upload = require("../middleware/upload.middleware");



// Handle incoming POST requests to /users



 // POST REQUEST ---> Creating User

const createUser = (async (req, res) => {                                       
    const { name, email, password: plainTextPassword } = req.body

    const password = await bcrypt.hash(plainTextPassword, 10)


    try {
        const user = await User.create({
            name,
            email,
            password
        })

        res.json({ status: 'ok', data: { user } })


    } catch (error) {
        if (error.code === 500) {

            return res.json({ status: 'error', error: 'name already in use' })
        }
        throw error
    }
})

 // POST REQUEST ---> Login User

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
            process.env.JWT_SECRET
        )

        return res.json({ status: 'ok', data: { email, password, token } })
    }

    return res.json({ status: 'error', error: 'Invalid email/password' })
})


// POST REQUEST ---> LoggingOut User

const logoutUser = (async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        return res.json({ status: 'success' })
    } catch (e) {
        res.status(400).json({ message: error.message })


    }
})



// POST REQUEST ---> LoggingOut User from all

const logoutAllUser = (async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        return res.json({ status: 'success' })
    } catch (e) {
        res.status(400).json({ message: error.message })


    }
})

// GET REQUEST ---> READING Users

const getAllUser = (async (req, res) => {
    try {
        const data = await User.find();
        res.json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })

    }
})

// PUT REQUEST ---> UPDATING User's Data

const updateUser = (async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        const user = await User.findByIdAndUpdate(
            id, updatedData
        )

        res.send(user)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// DELETE REQUEST ---> DELETING User


const deleteUser = (async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id)
        res.send(`User has been deleted..`,user)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//upload  files img/doc/word

// UPLOAD REQUEST ---> UPLOAD DATA FROM DATA



const avatarUser = (upload.array('avatar'), (req, res) => {
    console.log(req.files);                                         // UPLOADED FILE DESCRIPTION RECEIVED
    res.send({
        status: "success",
        message: "Files uploaded successfully",
        data: req.files,
    })
});



// DELETE REQUEST ---> DELETING PROFILE BUFFER DATA

const deleteAvatar = (async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    return res.json({ status: 'success' })
})


// GET REQUEST ---> GETTING PROFILE AVATAR

const getAvatarId = (async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(400).json({ message: error.message })


    }
})


module.exports = {
    createUser,
    getAllUser,
    loginUser,
    logoutUser,
    logoutAllUser,
    updateUser,
    avatarUser,
    deleteAvatar,
    getAvatarId,
    deleteUser,
}