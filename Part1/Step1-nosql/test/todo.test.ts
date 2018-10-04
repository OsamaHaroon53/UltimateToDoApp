import * as request from "supertest";
import server from "../src/server";
import { Types } from "mongoose";
import Task from "../src/models/todo"
describe("should return 200 and text 'Welcome to Express'", () => {
    it("Get /", () => {
        return request(server)
            .get('/')
            .then(res => {
                expect(res.text).toEqual("Welcome to Express");
                expect(res.status).toEqual(200);
            });
    });
});
describe('should return data in json format and return 201', () => {
    afterEach(async () => {
        await Task.remove({});
    });
    it('POST /todo/api/v1.0/tasks ,property done is passes', () => {
        let task = {
            title: 'Hello',
            description: 'Hello World',
            done: true
        };
        return request(server)
            .post('/todo/api/v1.0/tasks')
            .send(task)
            .expect('Content-Type', /json/)
            .expect(201)
            .then(response => {
                expect(response.body).toHaveProperty('message', 'Create task succesfully');
                expect(response.body.data).toHaveProperty('_id');
                expect(response.body.data).toHaveProperty('title', 'Hello');
                expect(response.body.data).toHaveProperty('description', 'Hello World');
                expect(response.body.data).toHaveProperty('done', true);
            });
    });
    it('POST /todo/api/v1.0/tasks ,property done is missing', () => {
        let task = {
            title: 'Hello',
            description: 'Hello World'
        };
        return request(server)
            .post('/todo/api/v1.0/tasks')
            .send(task)
            .expect('Content-Type', /json/)
            .expect(201)
            .then(response => {
                expect(response.body).toHaveProperty('message', 'Create task succesfully');
                expect(response.body.data).toHaveProperty('_id');
                expect(response.body.data).toHaveProperty('title', 'Hello');
                expect(response.body.data).toHaveProperty('description', 'Hello World');
            });
    });
});
describe('should return data in json format,return 200 and data should be empty', () => {
    it('GET /todo/api/v1.0/tasks', () => {
        return request(server)
            .get('/todo/api/v1.0/tasks')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toHaveProperty('message', 'Tasks send succesfully');
                expect(response.body.data.length).toEqual(0);
            });
    });
});

describe('should return data in json format and return 200', () => {
    let task, id;
    beforeEach(async () => {
        id = Types.ObjectId();
        task = new Task({
            _id: id,
            title: 'Hello',
            description: 'Hello World',
            done: false
        });
        await task.save();
    });
    afterEach(async () => {
        await Task.remove({});
    });
    it('GET /todo/api/v1.0/tasks', () => {
        return request(server)
            .get('/todo/api/v1.0/tasks')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toHaveProperty('message', 'Tasks send succesfully');
                expect(response.body.data[0]).toHaveProperty('_id', id.toString());
                expect(response.body.data[0]).toHaveProperty('title', 'Hello');
                expect(response.body.data[0]).toHaveProperty('description', 'Hello World');
                expect(response.body.data[0]).toHaveProperty('done', false);
            });
    });
    it('GET /todo/api/v1.0/tasks/:id', () => {
        return request(server)
            .get('/todo/api/v1.0/tasks/' + id)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toHaveProperty('message', 'get one task succesfully');
                expect(response.body.data).toHaveProperty('_id', id.toString());
                expect(response.body.data).toHaveProperty('title', 'Hello');
                expect(response.body.data).toHaveProperty('description', 'Hello World');
                expect(response.body.data).toHaveProperty('done', false);
            });
    });
    it('PUT /todo/api/v1.0/tasks/:id', () => {
        return request(server)
            .put('/todo/api/v1.0/tasks/' + id)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toHaveProperty('message', 'Update task succesfully');
                expect(response.body.data).toHaveProperty('_id', id.toString());
                expect(response.body.data).toHaveProperty('title', 'Hello');
                expect(response.body.data).toHaveProperty('description', 'Hello World');
                expect(response.body.data).toHaveProperty('done', false);
            });
    });
    it('DELETE /todo/api/v1.0/tasks/:id', () => {
        return request(server)
            .delete('/todo/api/v1.0/tasks/' + id)
            .expect(204)
            .then(response => {
                expect(response.body).toEqual({});
            });
    });
});
describe('should return error in json format and return 500', () => {
    it('GET /todo/api/v1.0/tasks/:id, _id is Invalid', () => {
        return request(server)
            .get('/todo/api/v1.0/tasks/1234')
            .expect('Content-Type', /json/)
            .expect(500)
            .then(response => {
                expect(response.body).toHaveProperty('error');
            });
    });
    it('PUT /todo/api/v1.0/tasks/:id, _id is Invalid', () => {
        return request(server)
            .put('/todo/api/v1.0/tasks/456')
            .expect('Content-Type', /json/)
            .expect(500)
            .then(response => {
                expect(response.body).toHaveProperty('error');
            });
    });
    it('DELETE /todo/api/v1.0/tasks/:id, _id is Invalid', () => {
        return request(server)
            .delete('/todo/api/v1.0/tasks/123456')
            .expect(500)
            .then(response => {
                expect(response.body).toHaveProperty('error');
            });
    });
    it('POST /todo/api/v1.0/tasks, Description is missing', () => {
        return request(server)
            .post('/todo/api/v1.0/tasks')
            .send({
                title: 'Hello',
                done: true
            })
            .expect('Content-Type', /json/)
            .expect(500)
            .then(response => {
                expect(response.body).toHaveProperty('error');
            });
    });
    it('POST /todo/api/v1.0/tasks, Title is missing', () => {
        return request(server)
            .post('/todo/api/v1.0/tasks')
            .send({
                description: 'Hello World',
                done: true
            })
            .expect('Content-Type', /json/)
            .expect(500)
            .then(response => {
                expect(response.body).toHaveProperty('error');
            });
    });
});
