import request from 'supertest';
import app from '../src/app';
import httpStatus from 'http-status';

describe('Tasks', () => {
  let taskId: string;
  let userToken: string;
  let server: any;
  let fakeUUID = '00000000-0000-0000-0000-000000000000';
  beforeAll(async () => {
    taskId = 'a2eb515c-9f45-4db2-8790-bb06f101b54a';
    server = app.listen(3001);
  });

  afterAll((done) => {
    server.close();
    done();
  });

  it('user can login with valid credentials', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({ username: 'user1', password: 'password1' });
    userToken = (response as any).body.token;
    expect(userToken).toBeTruthy();
    expect(response.status).toBe(httpStatus.OK);
  });

  it('should get a task by ID', async () => {
    const response = await request(app)
      .get(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.body.title).toBe('Task 1');
    expect(response.status).toBe(200);
  });

  it('should get a 404 by wrong task ID', async () => {
    const response = await request(app)
      .get(`/tasks/${fakeUUID}`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toBe(404);
  });

  it('can create a new task', async () => {
    const response = await request(app)
      .post(`/tasks/`)
      .send({ title: 'new', taskType: 'reminder', isDone: true })
      .set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.title).toBe('new');
    expect(response.body.taskType).toBe('reminder');
    expect(response.body.isDone).toBe(true);
  });

  it('can delete a task', async () => {
    const response = await request(app)
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${userToken}`);
    const list = await request(app)
      .get(`/tasks/`)
      .set('Authorization', `Bearer ${userToken}`);
    const oldTask = await request(app)
      .get(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(list.body.length).toBe(2); // whats left
    expect(response.status).toBe(httpStatus.OK);
    expect(oldTask.status).toBe(httpStatus.NOT_FOUND);
    expect(response.body.message).toBe('Task deleted successfully.');
  });

  it('can update a task', async () => {
    const secondTask = 'a2eb515c-9f45-4db2-8790-bb06f101b54b';
    const response = await request(app)
      .put(`/tasks/${secondTask}`)
      .send({ title: 'meow', taskType: 'reminder', isDone: false })
      .set('Authorization', `Bearer ${userToken}`);
    const refetchUpdatedTask = await request(app)
      .get(`/tasks/${secondTask}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.message).toBe('Task updated successfully.');
    expect(refetchUpdatedTask.body.taskType).toBe('reminder');
    expect(refetchUpdatedTask.body.title).toBe('meow');
    expect(refetchUpdatedTask.body.isDone).toBe(false);
  });
});
