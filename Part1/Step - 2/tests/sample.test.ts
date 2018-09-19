const request = require('supertest');
import app from '../src/app';
import { todo } from '../src/controllers/todo';
import sequelize from '../src/sequelize';

import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';
iconv.encodings = encodings;

function sum(a: number, b: number) {
    return a + b;
}

test("add 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
});


describe("/todo/api/v1.0/", async () => {
  beforeEach(function () { 
    sequelize.sync({ force: false });
    jest.setTimeout(30000);
    app.listen(app.get("port"), () => {
        console.log("server is running on port");
    });
  });
  afterEach(function () {
    app.removeAllListeners();
  });
    it("GET /", async () => {
        jest.setTimeout(30000);
        const res = await request(app).get('/');
        expect(res.text).toEqual("Welcome to Express as a TypeScript");
        expect(res.statusCode).toEqual(200);
    });

    it("GET /tasks", async () => {
        
        const res = await request(todo).get('/tasks');
        expect(res.text).toEqual("Not Found");
    }); 

    // it("GET /tasks/:id", async () => {
    //     const res = await request(todo).get('/tasks/:id');

    // });

    // it("POST /tasks", async () => {
    //     const res = await request(todo).post('/tasks/:id');

    // });

    // it("PUT /tasks/:id", async () => {
    //     const res = await request(todo).put('/tasks/:id');

    // });

    // it("DELETE /tasks/:id", async () => {
    //     const res = await request(todo).delete('/tasks/:id');

    // });

})