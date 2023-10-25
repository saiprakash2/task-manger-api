import express from 'express';
export const router = express.Router();

router.route('/')
    .get(taskController.getAllTasks)
    .post(taskController.createTask)

router.route('/:taskId')
    .patch(taskController.updateTask)
    .delete(taskController.deleteTask)