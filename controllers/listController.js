import { List } from '../models/list.js';

/*
 * GET /lists
 * Purpose: Get all lists
*/
export const getAllLists = (req, res) => {
    // We want to return an array of lists
    List.find({ _userId: req.id}).then((lists)=>{
        res.send({success:true, lists});
    })
}

/*
 * POST /lists
 * Purpose: Create a new list
*/
export const createList = (req, res) => {
    // We want to creat a new list and return the new list
    let title = req.body.title;
    const newList = new List({title: title, _userId: req.id});
    newList.save().then((listDoc) => res.send(listDoc));
}

/*
 * PATCH /lists/:id
 * Purpose: Update a specified list
*/
export const updateList = (req, res) => {
    // We want update specified list
    console.log(req.body)
    List.findOneAndUpdate({_id: req.params.id}, {
        $set :req.body
    }).then(() => {
        res.send({message:"Updated Successfully"});
    }).catch((err) => {
        console.error(err);
    })
}

/*
 * DELETE /lists/:id
 * Purpose: Delete a specified list
*/
export const deleteList = (req, res) => {
    // We want delete specified list
    List.findOneAndDelete({_id: req.params.id
    }).then((deletedDoc) => {
        res.send(deletedDoc);
    });
}