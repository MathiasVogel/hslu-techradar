import { Router } from 'express';
import {getTechById, getTechs} from '../controllers/tech.controller.js';

const router = Router();

router.get('/', getTechs);
router.get('/:id', getTechById);

export default router;