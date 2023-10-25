import { Task } from '../models/task.js';


/*
 * GET /lists/:listId/tasks
 * Purpose: Get all tasks
*/
export const getAllTasks = (req, res) => {
    // We want to return an array of lists
    Task.find({
        _listId: req.params.listId
    })
    .then((tasks)=>{
        res.send(tasks);
    })
}

/*
 * POST /lists/:listId/tasks
 * Purpose: Create a new task
*/
export const createTask = (req, res) => {
    // We want to creat a new list and return the new list
    try {
        let title = req.body.title;
        const newTask = new Task({title: title,_listId: req.params.listId, _userId: req.id});
        newTask.save().then((taskDoc) => res.send(taskDoc));
    } catch (error) {
        console.log(error);
    }

}

/*
 * PATCH /lists/:listId/tasks/:taskId
 * Purpose: Update a specified task
*/
export const updateTask = (req, res) => {
    // We want to update the specified task.
    Task.findOneAndUpdate({_id:req.params.taskId},{
        $set:req.body
    }).then(()=>{
        res.send({message:"Updated Successfully"});
    });
}

/*
 * DELETE /lists/:listId/tasks/:taskId
 * Purpose: Delete a specified task
*/
export const deleteTask = (req, res) => {
    // We want to delete the specified task.
    Task.findOneAndDelete({_id:req.params.taskId
    }).then((deletedTask)=>{
        res.send(deletedTask);
    });
}