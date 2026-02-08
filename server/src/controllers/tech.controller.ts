import * as TechService from '../services/tech.service.js';
import { Request, Response } from 'express';

export const getTechs = async (req: Request, res: Response) => {
  try {
    const data = await TechService.getAllTechnologies();
    res.json(data);
  } catch (error) {
    console.error("DEBUG DB-FEHLER:", error);
    res.status(500).json({ error: 'Fehler beim Laden der Daten' });
  }
};

export const createTech = async (req: Request, res: Response) => {
  try {
    const data = await TechService.createTech(req.body);
    res.status(201).json(data);
  } catch (error) {
    console.error("DEBUG DB-FEHLER:", error);
    res.status(500).json({ error: 'Fehler beim Erstellen der Technologie' });
  }
}

export const deleteTech = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const deleted = await TechService.deleteTech(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Technologie nicht gefunden' });
    }

    res.status(200).send();
  } catch (error) {
    console.error("DEBUG DB-FEHLER:", error);
    res.status(500).json({ error: 'Fehler beim Löschen der Technologie' });
  }
}

export const updateTech = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = await TechService.updateTech(id, req.body);

    if (!data) {
      return res.status(404).json({ error: 'Technologie nicht gefunden' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("DEBUG DB-FEHLER:", error);
    res.status(500).json({ error: 'Fehler beim Aktualisieren der Technologie' });
  }
}