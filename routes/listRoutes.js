import express from 'express';
import {getAllLists,createList,updateList,deleteList} from '../controllers/listController.js';
import { verifyJWT } from '../middleware/veriyJWT.js';
const router = express.Router();

router.use(verifyJWT)

router.route('/')
    .get(getAllLists)
    .post(createList)

router.route('/:id')
    .patch(updateList)
    .delete(deleteList)

export const listRouter = router;