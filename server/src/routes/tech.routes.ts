import { Router } from 'express';
import { getTechs, createTech, deleteTech, updateTech } from '../controllers/tech.controller.js';

const router = Router();

/**
 * @openapi
 * /api/technologies:
 *   get:
 *     summary: Alle Technologien abrufen
 *     responses:
 *       200:
 *         description: Erfolg
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TechnologyDTO'
 */
router.get('/', getTechs);

/**
 * @openapi
 * /api/technologies:
 *   post:
 *     summary: Neue Technologie erstellen
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TechnologyCreateDTO'
 *     responses:
 *       201:
 *         description: Erstellt
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TechnologyDTO'
 */
router.post('/', createTech);

/**
 * @openapi
 * /api/technologies/{id}:
 *   patch:
 *     summary: Technologie aktualisieren
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TechnologyUpdateDTO'
 *     responses:
 *       200:
 *         description: Aktualisiert
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TechnologyDTO'
 */
router.patch('/:id', updateTech);

/**
 * @openapi
 * /api/technologies/{id}:
 *   delete:
 *     summary: Technologie löschen
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Gelöscht
 */
router.delete('/:id', deleteTech);

export default router;