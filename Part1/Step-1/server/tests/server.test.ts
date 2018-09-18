const request = require("supertest");
const expect = require("expect");

const {server} = require("../server");
import Todo from "../models/todo";
var data;


beforeEach(()=>{
    Todo.find().then((result)=>{
        data = result;
    }).catch((err)=>console.log(err))
})


describe("Todo Server Test",()=>{
    it("/todo/api/v1.0/tasks/   Should Return All Todos",(done)=>{
        request(server)
        .get("/todo/api/v1.0/tasks/")
        .expect(200)
        .expect((res)=>{
            expect(res.body.length).toBe(data.length)
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            done();
            })
        })

    })

