const express = require('express');
const TaskController = require('../controllers/task');
const auth = require('../middleware/auth');

const router = new express.Router();


// Handle incoming POST requests to /tasks

router.post('/tasks', TaskController.task_new)
router.get('/tasks', TaskController.task_match)
router.get('/tasks', TaskController.task_get)
router.get('/tasks/:id', TaskController.task_id)
router.put('/tasks/:id', TaskController.task_update)
router.delete('/tasks/:id', auth, TaskController.task_delete)

module.exports = router;
