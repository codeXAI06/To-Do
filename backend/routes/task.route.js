import express from 'express';
import { createTask, deleteTask , getTasks, updateTask, getSingleTask } from '../controllers/task.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate); // all routes below require authentication

router.get("/", getTasks);
router.put("/:id",updateTask);
router.post("/",createTask);
router.delete("/:id",deleteTask);
router.get("/:id", getSingleTask);

export default router;