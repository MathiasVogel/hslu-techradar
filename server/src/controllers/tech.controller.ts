import * as TechService from '../services/tech.service.js';
import { Request, Response } from 'express';

export const getTechs = async (req: Request, res: Response) => {
  try {
    const data = await TechService.getAllTechnologies();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Laden der Daten' });
  }
};

export const getTechById = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  try {
    const data = await TechService.getTechnologyById(id);
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: 'Technologie nicht gefunden' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Laden der Daten' });
  }
}