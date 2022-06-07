const express = require('express');
const router = express.Router();                      // Routing Models
const auth = require('../middleware/auth.middleware');
const { validateTask } = require('../utils/validator');


// Handle incoming POST requests to /tasks

const {
  createTask,
  searchTask,
  getAllTasks,
  updateTask,
  deleteTask,
  getTaskId,
} = require('../controllers/task.controller')




router.post('/',auth, validateTask, createTask);
router.get('/', auth, searchTask);
router.get('/', auth, getAllTasks);
router.get('/:id', auth, getTaskId);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);


module.exports = router;

