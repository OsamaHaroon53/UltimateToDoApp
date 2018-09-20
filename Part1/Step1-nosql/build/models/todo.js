"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const todo = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false,
    }
});
exports.default = mongoose_1.model('todo', todo);
//# sourceMappingURL=todo.js.map