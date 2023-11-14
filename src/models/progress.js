const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'task',
    required: true
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  comments: {
    type: String,
    required: true
  }
},
{timestamps: true});


const Progress = mongoose.model('Progress', ProgressSchema);

module.exports = Progress;
