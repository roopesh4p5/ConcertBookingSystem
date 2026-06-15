import { Router } from "express";
import { getUsers , createUser , bulkuploadUsers ,bulkUploadUsersFromXLS } from "../controllers/user.controller";
import { getSeats } from "../controllers/seats.controller";
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();




/**
 * openapi
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Internal server error
 */
router.get('/users', getUsers);

/**
 * openapi
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string

 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/users', createUser);

/**
* openapi
* @swagger
* /api/users/bulk-upload:
*   post:
*     tags:
*       - Users
*     summary: Bulk upload users
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: array
*             items:
*               type: object
*               properties:
*                 name:
*                   type: string
*                 email:
*                   type: string

*     responses:
*       201:
*         description: Users uploaded successfully
*       400:
*         description: Bad request
*       500:
*         description: Internal server error
*/
router.post('/users/bulk-upload', bulkuploadUsers);


/**
 * openapi
 * @swagger
 * /api/seats:
 *   get:
 *     tags:
 *       - Seats
 *     summary: Get all seats
 *     responses:
 *       200:
 *         description: A list of seats
 *       500:
 *         description: Internal server error
 */
router.get('/seats', getSeats);

// file upload route
/**
 * openapi
 * @swagger
 * /api/users/bulk-upload-excel:
 *   post:
 *     tags:
 *       - Users
 *     summary: Bulk upload users from Excel file
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Users uploaded successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error   
 */
router.post('/users/bulk-upload-excel', upload.single('file'), bulkUploadUsersFromXLS);

export default router;

