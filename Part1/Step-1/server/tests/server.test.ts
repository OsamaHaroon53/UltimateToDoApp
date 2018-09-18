const request = require("supertest");
const expect = require("expect");

const { server } = require("../server");
import Todo from "../models/todo";
import { log } from "util";
var data;


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
        var test = {
            title: "Testing Todo Post",
            description: "Checking Post Route",
        }
        request(server)
            .post("/todo/api/v1.0/tasks/")
            .send(test)
            .expect(201)
            .expect((res) => {
                expect(res.body).toHaveProperty("_id")
                expect(res.body).toHaveProperty("title","Testing Todo Post")
                expect(res.body).toHaveProperty("description","Checking Post Route");           
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

})

