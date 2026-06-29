const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory database (for demo purposes)
let todos = [];

// CRUD Operations

// GET all todos
app.get('/api/todos', (req, res) => {
  res.json({
    success: true,
    data: todos,
    count: todos.length
  });
});

// GET todo by ID
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) {
    return res.status(404).json({ success: false, message: 'Todo not found' });
  }
  res.json({ success: true, data: todo });
});

// CREATE new todo
app.post('/api/todos', (req, res) => {
  const { title, description } = req.body;
  
  if (!title) {
    return res.status(400).json({ success: false, message: 'Title is required' });
  }

  const newTodo = {
    id: uuidv4(),
    title,
    description: description || '',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  todos.push(newTodo);
  res.status(201).json({ success: true, data: newTodo });
});

// UPDATE todo
app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) {
    return res.status(404).json({ success: false, message: 'Todo not found' });
  }

  const { title, description, completed } = req.body;
  
  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (completed !== undefined) todo.completed = completed;
  todo.updatedAt = new Date();

  res.json({ success: true, data: todo });
});

// DELETE todo
app.delete('/api/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Todo not found' });
  }

  const deletedTodo = todos.splice(index, 1);
  res.json({ success: true, data: deletedTodo[0], message: 'Todo deleted' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Todo App API is running', version: '1.0.0' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Todo App running on port ${PORT}`);
});

module.exports = app;
