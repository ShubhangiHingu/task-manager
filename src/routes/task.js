const express = require('express');
const router =  express.Router();


// Handle incoming POST requests to /tasks

const {
  createTask,
  matchTask,
  getAllTasks,
  updateTask,
  deleteTask,
  getTaskId,
} = require('../controllers/task')

router.route('/tasks').post(createTask).get(matchTask).get(getAllTasks)
router.route('tasks/:id').get(getTaskId).put(updateTask).delete(deleteTask)

module.exports = router;