import { Router } from "express";
import { getUsers , createUser , bulkuploadUsers } from "../controllers/user.controller";

const router = Router();


router.get('/users', getUsers);
router.post('/users', createUser);
router.post('/users/bulk-upload', bulkuploadUsers);

export default router;

