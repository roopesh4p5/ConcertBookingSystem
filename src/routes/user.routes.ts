import { Router } from "express";
import { getUsers , createUser , bulkuploadUsers } from "../controllers/user.controller";
import { createSeats, getSeats } from "../controllers/seats.controller";

const router = Router();


router.get('/users', getUsers);
router.post('/users', createUser);
router.post('/users/bulk-upload', bulkuploadUsers);
router.post('/seats', createSeats);
router.get('/seats', getSeats);

export default router;

