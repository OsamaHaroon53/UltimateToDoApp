let TodoModel = require('../models/todo')
let Todo = class {
   constructor(payload) {
      this.payload = payload;
   }

   static list(cb) {
      const criteria = {};
      const projections = {
         _id: 0,
         __v: 0
      };
      const options = {
         lean: true
      };
      TodoModel.find(criteria, projections, options, cb);
   }

   add(cb) {
      new TodoModel(this.payload).save(cb);
   }

   fetch(cb) {
      const criteria = this.payload.criteria;
      const projections = this.payload.projections;
      const options = this.payload.options;
      TodoModel.find(criteria, projections, options, cb)
   }

   remove(cb) {
      const criteria = this.payload;
      TodoModel.remove(criteria, cb);
   }
};
module.exports = Todo;