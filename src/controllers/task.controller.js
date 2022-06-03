const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("../models/task.models");


// POST REQUEST ---> Creating Task

const createTask = (async (req, res) => {

    const task = new Task({

        ...req.body,
        owner: req.user._id,
    })

    try {
        await task.save()
        return res.status(201).json({ message: "Task saved: ", task })

    } catch (error) {
        res.status(400).json({ message: error.message })

    }

})


// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc


//match and sorting task

const searchTask = (async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        return res.send(req.user.tasks)
    } catch (error) {
        res.status(400).json({ message: error.message })

    }
})


// GET REQUEST ---> READING Tasks

const getAllTasks = (async (req, res) => {
    try {
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch (error) {
        res.status(400).json({ message: error.message })

    }
})

// GET REQUEST ---> READING TaskById

const getTaskId = (async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(400).json({ message: error.message })

    }
})

// PUT REQUEST ---> UPDATING Task Data

const updateTask = (async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(400).json({ message: error.message })


    }
})


// DELETE REQUEST ---> DELETING Task


const deleteTask = (async (req, res) => {
    try {

        const deletedTask = await Task.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id,
        });
        if (!deletedTask) {
            res.status(404).send("404 Task Not found");
        }
        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(400).json({ message: error.message })


    }
});



module.exports = {
    createTask,
    searchTask,
    getAllTasks,
    updateTask,
    deleteTask,
    getTaskId,
}