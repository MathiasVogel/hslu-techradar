import { Category, Ring } from '../generated/client/client.js';

export const schemas = {
  // 1. Das komplette Modell (für GET Antworten)
  TechnologyDTO: {
    type: 'object',
    required: ['id', 'name', 'category', 'description', 'published'],
    properties: {
      id: { type: 'string', format: 'uuid', example: '550e8400-e29b-41d4-a716-446655440000' },
      name: { type: 'string', example: 'React' },
      category: {
        type: 'string',
        enum: Category,
        example: Category.LANGUAGES_AND_FRAMEWORKS
      },
      ring: {
        type: 'string',
        enum: Ring,
        example: Ring.ADOPT
      },
      description: { type: 'string', example: 'Die meistgenutzte Library für Web-Frontends.' },
      justification: { type: 'string', example: 'Industriestandard mit hoher Stabilität.' },
      published: { type: 'boolean', example: false },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
      publishedAt: { type: 'string', format: 'date-time' }
    }
  },

  // 2. Zum Erstellen (POST)
  TechnologyCreateDTO: {
    type: 'object',
    required: ['name', 'category', 'description'],
    properties: {
      name: { type: 'string', example: 'React' },
      category: {
        type: 'string',
        enum: Category
      },
      ring: {
        type: 'string',
        enum: Ring
      },
      description: { type: 'string' },
      justification: { type: 'string' },
      published: { type: 'boolean', default: false }
    }
  },

  // 3. Zum Updaten (PATCH) - Alles optional
  TechnologyUpdateDTO: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      category: {
        type: 'string',
        enum: Category
      },
      ring: {
        type: 'string',
        enum: Ring
      },
      description: { type: 'string' },
      justification: { type: 'string' },
      published: { type: 'boolean' }
    },
    description: "Alle Felder sind optional. Nur mitgeben, was geändert werden soll."
  }
};