import { describe, it, expect, beforeEach, vi } from "vitest";
import * as TechService from "../src/services/tech.service.js";
import { prisma } from "../src/config/db.js";

vi.mock("../src/config/db.js", () => {
  const technology = {
    findMany: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn()
  };
  return { prisma: { technology } };
});

const prismaMock = prisma as unknown as {
  technology: {
    findMany: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
    findUnique: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
  };
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("TechService", () => {
  it("Liefert alle Technologien sortiert nach published und name", async () => {
    const technologies = [{ id: "1", name: "Alpha" }];
    prismaMock.technology.findMany.mockResolvedValueOnce(technologies);
    const result = await TechService.getAllTechnologies();
    expect(result).toEqual(technologies);
    expect(prismaMock.technology.findMany).toHaveBeenCalledWith({
      orderBy: [
        { published: "asc" },
        { name: "asc" }
      ]
    });
  });

  it("Erstellt eine Technologie mit den übergebenen Daten", async () => {
    const payload = { name: "Neu" } as any;
    const created = { id: "42", ...payload } as any;
    prismaMock.technology.create.mockResolvedValueOnce(created);
    const result = await TechService.createTech(payload);
    expect(result).toEqual(created);
    expect(prismaMock.technology.create).toHaveBeenCalledWith({ data: payload });
  });

  it("Löscht eine Technologie per ID", async () => {
    const deleted = { id: "11" } as any;
    prismaMock.technology.delete.mockResolvedValueOnce(deleted);
    const result = await TechService.deleteTech("11");
    expect(result).toEqual(deleted);
    expect(prismaMock.technology.delete).toHaveBeenCalledWith({ where: { id: "11" } });
  });

  it("Gibt null zurück, wenn updateTech keine bestehende Technologie findet", async () => {
    prismaMock.technology.findUnique.mockResolvedValueOnce(null);
    const result = await TechService.updateTech("missing", { name: "X" } as any);
    expect(result).toBeNull();
    expect(prismaMock.technology.update).not.toHaveBeenCalled();
  });

  it("Setzt publishedAt, wenn erstmals veröffentlicht wird", async () => {
    prismaMock.technology.findUnique.mockResolvedValueOnce({
      id: "21",
      published: false,
      publishedAt: null
    } as any);
    prismaMock.technology.update.mockResolvedValueOnce({ id: "21", published: true } as any);
    const result = await TechService.updateTech("21", { published: true } as any);
    expect(prismaMock.technology.update).toHaveBeenCalledWith({
      where: { id: "21" },
      data: expect.objectContaining({ published: true, publishedAt: expect.any(Date) })
    });
    expect(result).toEqual({ id: "21", published: true });
  });
});
