const request = require("supertest");
const expect = require("expect");

const { server } = require("../server");
import Todo from "../models/todo";
import { ObjectID } from "bson";
var data;
var sampleId = new ObjectID()
var sample = [
    { _id: sampleId, title: "Old Todo", description: "Testing" },
    { _id: sampleId, title: "New Todo", description: "Testing", done: true }
]


beforeEach(() => {
    Todo.find().then((result) => {
        data = result;
    }).catch((err) => console.log(err))
})


describe("Todo Server Test", () => {
    it("/todo/api/v1.0/tasks/  get  Should Return All Todos", (done) => {
        request(server)
            .get("/todo/api/v1.0/tasks/")
            .expect(200)
            .expect((res) => {
                expect(res.body.length).toBe(data.length);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            })
    })


    it("/todo/api/v1.0/tasks/  post  should increase the length by 1", (done) => {

        request(server)
            .post("/todo/api/v1.0/tasks/")
            .send(sample[0])
            .expect(201)
            .expect((res) => {
                expect(res.body._id).toBe(sample[0]._id.toHexString())
                expect(res.body.title).toBe(sample[0].title)
                expect(res.body.description).toBe(sample[0].description);
                // sample = res.body;
            }).end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((result) => {
                    if (result.length === data.length + 1) {
                        done();

                    }
                }).catch((e) => done(e))

            })
    })

    it("/todo/api/v1.0/tasks/:_id  should should return the same todo", (done) => {
        var { _id } = sample[0];
        request(server)
            .get(`/todo/api/v1.0/tasks/${_id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(sample[0]._id.toHexString())
                expect(res.body.title).toBe(sample[0].title)
                expect(res.body.description).toBe(sample[0].description);
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done();
            })
    })


    it("/todo/api/v1.0/tasks/:_id  should should Update the same todo", (done) => {
        var { _id } = sample[0];
        var { title, description } = sample[1]
        request(server)
            .put(`/todo/api/v1.0/tasks/${_id}`)
            .send(sample[1])
            .expect(201)
            .expect((res) => {
                expect(res.body._id).toBe(sample[1]._id.toHexString())
                expect(res.body.title).toBe(title)
                expect(res.body.description).toBe(description);

            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                done();
            })
    })


    it("/todo/api/v1.0/tasks/:_id  should decrease the legnth by 1", (done) => {
        var {_id} = sample[1];
        var { title, description } = sample[1]
        request(server)
            .delete(`/todo/api/v1.0/tasks/${_id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(sample[1]._id.toHexString())
                expect(res.body.title).toBe(title)
                expect(res.body.description).toBe(description);
            }).end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((result) => {
                    if (result.length === data.length - 1) {
                        done();

                    }
                }).catch((e) => done(e))
            })
    })





})

