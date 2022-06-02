const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { validateTask } = require('../utils/validator');


// Handle incoming POST requests to /tasks

const {
  createTask,
  matchTask,
  getAllTasks,
  updateTask,
  deleteTask,
  getTaskId,
} = require('../controllers/task')

// router.use(auth);


router.post('/',auth, validateTask, createTask);
router.get('/', auth, matchTask);
router.get('/', auth, getAllTasks);
router.get('/:id', auth, getTaskId);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);


module.exports = router;

