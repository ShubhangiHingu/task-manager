
const mongoose = require('mongoose')
const User = require('./user.models')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {                                             
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',                                            // Defining Relation betwn User Model and Task Model
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Task', taskSchema);            // Defining Task Schema







