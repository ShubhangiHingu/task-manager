const mongoose = require("mongoose");
const multer = require('multer')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth')
const User = require('../models/user')



// Handle incoming POST requests to /users


//create new user

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User({
        name,
        email,
        password,
    });
    try {
        await user.save();
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
        return;
    }

    res.json({ success: true, user });
};

//login user


const loginUser = (async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }

})


//logout user

const logoutUser = (auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


//logAllout user

const logoutAllUser = (auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//get user

const authUser = (auth, async (req, res) => {
    res.send(req.user)
})


//update user
const updateUser = (auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete user

const deleteUser = ('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})


//upload  files img/doc/word

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})


//upload avatar

const avatarUser = (auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


//delete avatar

const deleteAvatar = (auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})


//get avatar id

const getAvatarId = ('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})


module.exports = {
    createUser,
    authUser,
    loginUser,
    logoutUser,
    logoutAllUser,
    updateUser,
    avatarUser,
    deleteAvatar,
    getAvatarId,
    deleteUser,
}
