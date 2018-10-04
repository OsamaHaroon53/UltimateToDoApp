const grpc = require('grpc');
require('../db/connection');
const proto = grpc.load('proto/todo.proto');
const server = new grpc.Server();
const TodoServices = require('../db/todo');

server.addService(proto.Todo.TodoService.service, {

    List(call, callback) {
        TodoServices.list(callback);
    },

    get(call, callback) {
        let payload = {
            criteria: {
                _id: call.request._id
            },
            projections: {
                _id: 0, __v: 0
            },
            options: {
                lean: true
            }
        };
        let todo = new TodoServices(payload);
        todo.fetch(callback);
    },

    Insert(call, callback) {
        let todo = new TodoServices({
            description: call.request.description,
            title: call.request.title,
            done: call.request.done,
        });
        todo.add(callback);
    },

    remove(call, callback) {
        const criteria = {
            _id: call.request._id,
        };
        let todo = new TodoServices(criteria);
        todo.remove(criteria, callback);
    },
});


server.bind('0.0.0.0:50050', grpc.ServerCredentials.createInsecure());

server.start();
console.log('grpc server running on port:', '0.0.0.0:50050');