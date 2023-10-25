import express from 'express';
import {getAllTasks,createTask,updateTask,deleteTask} from '../controllers/taskController.js';
import { verifyJWT } from '../middleware/veriyJWT.js';
const router = express.Router();

router.use(verifyJWT)

router.route('/:listId/tasks')
    .get(getAllTasks)
    .post(createTask)

router.route('/:listId/tasks/:taskId')
    .patch(updateTask)
    .delete(deleteTask)

export const taskRouter = router;