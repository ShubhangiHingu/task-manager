const express = require('express');
const router =  express.Router();
const auth = require('../middleware/auth');
const Task = require('../controllers/task')


// Handle incoming POST requests to /tasks

const {
  createTask,
  matchTask,
  getAllTasks,
  updateTask,
  deleteTask,
  getTaskId,
} = require('../controllers/task')



router.post('/', createTask);

router.route('/').get(matchTask).get(getAllTasks)
router.route('/:id').get(getTaskId).put(updateTask).delete(deleteTask)

module.exports = router;