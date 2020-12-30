const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Task Model
const Task = require('../../models/Task');

// @route   GET api/tasks
// @desc    Get All Tasks
// @access  Private
router.get('/', auth, (req, res) => {
  Task.find({ userId: req.user.id})
    .sort({ createdAt: -1 })
    .then(tasks => res.json(tasks));
});

// @route   POST api/taska
// @desc    Create An Task
// @access  Private
router.post('/', auth, (req, res) => {
  const { userId, title, body, priority } = req.body;
  
  // Simple validation
  if(!userId || !title || !body || !priority) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  const newTask = new Task({
    userId,
    title,
    body,
    priority
  });
  newTask.save().then(task => res.json(task));
});

// @route   PUT api/tasks/:id
// @desc    Update A Task
// @access  Private
router.put('/:id', auth, (req, res) => {
  console.log('Update: ',{ ...req.body });
  let query = { ...req.body };
  Task.findOneAndUpdate({_id: req.params.id}, query, {new: true}).exec()
  .then(task => res.json({ success: true, task }))
  .catch(err => res.status(404).json({ success: false, msg: err }));
});

// @route   DELETE api/tasks/:id
// @desc    Delete A Task
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Task.findOneAndDelete({_id: req.params.id}).exec()
    .then(task => res.json({ success: true, task }))
    .catch(err => res.status(404).json({ success: false, msg: err}));
});

module.exports = router;
