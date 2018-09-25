import { Router } from 'express';
import Todo from '../models/todo';
export const todo = Router();

todo.get('/tasks', async (req, res, next) => {
  Todo.findAll()
    .then(function (result) {
      if (result.length === 0) {
        res.status(404).send({message:"Not Found"})
      }
      return res.send(result)
    })
    .catch(function (err) {
      return res.send(err)
    })
});

todo.get('/tasks/:id', async (req, res, next) => {
  Todo.findById(req.params.id)
    .then(function (result) {
      if (!result) {
        return res.send({message:"Not Found"})
      }
      return res.send(result)
    })
    .catch(function (err) {
      return res.send(err)
    });
});

todo.post('/tasks', async (req, res, next) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    done: req.body.done
  });
  todo.save()
    .then(function (result) {
      return res.send(result)
    })
    .catch(function (err) {
      return res.send(err)
    });
});

todo.put('/tasks/:id', async (req, res, next) => {
  Todo.update({
    title: req.body.title,
    description: req.body.description,
    done: req.body.done
  },
    { returning: true, where: { id: req.params.id } }
  )
    .then(function (result) {
      return res.send(result)
    })
    .catch(function (err) {
      return res.send(err)
    });

});

todo.delete('/tasks/:id', async (req, res, next) => {
  Todo.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(function (result) {
      if (!result) {
        return res.send({message:"Record doesnot exist"});
      }
      return res.send({message:"Successfully deleted"})
    })
    .catch(function (err) {
      return res.send(err)
    });
});