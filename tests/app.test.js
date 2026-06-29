const request = require('supertest');
const app = require('../server');

describe('Todo App API', () => {
  
  describe('GET /health', () => {
    it('should return healthy status', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('healthy');
    });
  });

  describe('GET /', () => {
    it('should return welcome message', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Todo App API is running');
    });
  });

  describe('POST /api/todos', () => {
    it('should create a new todo', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({ title: 'Test Todo', description: 'Test Description' });
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Test Todo');
    });

    it('should return 400 if title is missing', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({ description: 'No title' });
      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /api/todos', () => {
    it('should get all todos', async () => {
      await request(app).post('/api/todos').send({ title: 'Todo 1' });
      const res = await request(app).get('/api/todos');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('PUT /api/todos/:id', () => {
    it('should update a todo', async () => {
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'Original Title' });
      const todoId = createRes.body.data.id;

      const updateRes = await request(app)
        .put(`/api/todos/${todoId}`)
        .send({ title: 'Updated Title', completed: true });
      
      expect(updateRes.statusCode).toBe(200);
      expect(updateRes.body.data.title).toBe('Updated Title');
      expect(updateRes.body.data.completed).toBe(true);
    });
  });

  describe('DELETE /api/todos/:id', () => {
    it('should delete a todo', async () => {
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'To Delete' });
      const todoId = createRes.body.data.id;

      const deleteRes = await request(app).delete(`/api/todos/${todoId}`);
      expect(deleteRes.statusCode).toBe(200);
      expect(deleteRes.body.success).toBe(true);
    });
  });
});
