const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TaskSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  status: { type: String, enum: ["plan","process","ready"], default: "plan", required: true },
  priority: { type: String, enum: ["1",'2','3',"4",'5'], default: "1", required: true },
  planned_date: { type: Date, default: null },
  actual_date: { type: Date, default: null },
  start_date: { type: Date, default: null },
  },
  {timestamps: true }
);

module.exports = Task = mongoose.model('task', TaskSchema);

// {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
