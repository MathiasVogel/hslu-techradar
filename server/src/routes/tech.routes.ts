import { Router } from 'express';
import {getTechById, getTechs} from '../controllers/tech.controller.js';

const router = Router();


/**
 * @openapi
 * /api/technologies:
 * get:
 * summary: Liste aller Technologien
 * responses:
 * 200:
 * description: Erfolg
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * type: object
 * properties:
 * id:
 * type: string
 * name:
 * type: string
 */
router.get('/', getTechs);

router.get('/:id', getTechById);

export default router;