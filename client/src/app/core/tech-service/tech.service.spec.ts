import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TechService } from './tech.service';
import { TechFormMode } from '../../shared/constants/tech-radar.constatns';
import { TechnologyDTO, CreateTechnologyDTO, UpdateTechnologyDTO } from '../api/api.types';

const { getMock, postMock, patchMock, deleteMock } = vi.hoisted(() => ({
  getMock: vi.fn(),
  postMock: vi.fn(),
  patchMock: vi.fn(),
  deleteMock: vi.fn()
}));

vi.mock('../api/client', () => ({
  client: {
    GET: getMock,
    POST: postMock,
    PATCH: patchMock,
    DELETE: deleteMock
  }
}));

const baseTech: TechnologyDTO = {
  id: '1',
  name: 'React',
  category: 'LANGUAGES_AND_FRAMEWORKS',
  ring: 'ADOPT',
  description: 'UI Library',
  justification: 'Popular',
  published: true,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  publishedAt: '2024-01-01T00:00:00.000Z'
};

describe('TechService', () => {
  let service: TechService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new TechService();
  });

  it('Lädt Technologien und setzt das Signal', async () => {
    getMock.mockResolvedValueOnce({ data: [baseTech], error: null });

    await service.fetchTechnologies();

    expect(getMock).toHaveBeenCalledWith('/api/technologies');
    expect(service.allTechnologies()).toEqual([baseTech]);
    expect(service.publishedTechnologies()).toEqual([baseTech]);
  });

  it('Fügt erstellte Technologie am Anfang ein', async () => {
    const existing: TechnologyDTO = { ...baseTech, id: '2', name: 'Angular' };
    getMock.mockResolvedValueOnce({ data: [existing], error: null });
    await service.fetchTechnologies();

    const createPayload: CreateTechnologyDTO = {
      name: 'Vue',
      category: 'LANGUAGES_AND_FRAMEWORKS',
      ring: 'TRIAL',
      description: 'Another UI framework',
      justification: 'Nice DX',
      published: false
    } as CreateTechnologyDTO;
    const created: TechnologyDTO = { ...createPayload, id: '3', publishedAt: undefined, createdAt: '', updatedAt: '' } as unknown as TechnologyDTO;
    postMock.mockResolvedValueOnce({ data: created, error: null });

    await service.createTechnology(createPayload);

    expect(postMock).toHaveBeenCalledWith('/api/technologies', { body: createPayload });
    expect(service.allTechnologies()[0]).toEqual(created);
    expect(service.allTechnologies()[1]).toEqual(existing);
  });

  it('Aktualisiert eine Technologie per id', async () => {
    getMock.mockResolvedValueOnce({ data: [baseTech], error: null });
    await service.fetchTechnologies();

    const update: UpdateTechnologyDTO = { ring: 'TRIAL', description: 'Updated' };
    const updatedFromApi: TechnologyDTO = { ...baseTech, ...update };
    patchMock.mockResolvedValueOnce({ data: updatedFromApi, error: null });

    await service.updateTechnology(baseTech.id, update);

    expect(patchMock).toHaveBeenCalledWith('/api/technologies/{id}', {
      params: { path: { id: baseTech.id } },
      body: update
    });
    expect(service.allTechnologies()[0]).toMatchObject({ ring: 'TRIAL', description: 'Updated' });
  });

  it('Entfernt Technologie nach erfolgreichem Löschen', async () => {
    const second: TechnologyDTO = { ...baseTech, id: '2', name: 'Angular' };
    getMock.mockResolvedValueOnce({ data: [baseTech, second], error: null });
    await service.fetchTechnologies();

    deleteMock.mockResolvedValueOnce({ error: null });

    await service.deleteTechnology(baseTech.id);

    expect(deleteMock).toHaveBeenCalledWith('/api/technologies/{id}', {
      params: { path: { id: baseTech.id } }
    });
    expect(service.allTechnologies()).toEqual([second]);
  });

  it('Setzt Form-Modi und Auswahl korrekt', () => {
    service.openCreate();
    expect(service.selectedTech()).toBeNull();
    expect(service.formMode()).toBe(TechFormMode.CREATE);

    service.openPublish(baseTech);
    expect(service.selectedTech()).toBe(baseTech);
    expect(service.formMode()).toBe(TechFormMode.PUBLISH);

    service.openEdit(baseTech);
    expect(service.selectedTech()).toBe(baseTech);
    expect(service.formMode()).toBe(TechFormMode.EDIT_INFO);

    service.openUpdateRing(baseTech);
    expect(service.selectedTech()).toBe(baseTech);
    expect(service.formMode()).toBe(TechFormMode.UPDATE_RING);
  });
});
