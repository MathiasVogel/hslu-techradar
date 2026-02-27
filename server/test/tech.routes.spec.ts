import express from "express";
import request from "supertest";
import { describe, it, expect, beforeEach, vi } from "vitest";
import techRoutes from "../src/routes/tech.routes.js";
import * as TechService from "../src/services/tech.service.js";

vi.mock("../src/services/tech.service.js", () => ({
  getAllTechnologies: vi.fn(),
  createTech: vi.fn(),
  deleteTech: vi.fn(),
  updateTech: vi.fn()
}));

const serviceMock = TechService as unknown as {
  getAllTechnologies: ReturnType<typeof vi.fn>;
  createTech: ReturnType<typeof vi.fn>;
  deleteTech: ReturnType<typeof vi.fn>;
  updateTech: ReturnType<typeof vi.fn>;
};

const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.use("/api/technologies", techRoutes);
  return app;
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Tech routes", () => {
  it("Liefert eine Liste von Technologien", async () => {
    const technologies = [{ id: "1", name: "Alpha" }];
    serviceMock.getAllTechnologies.mockResolvedValueOnce(technologies);
    const response = await request(buildApp()).get("/api/technologies");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(technologies);
  });

  it("Erstellt eine Technologie", async () => {
    const payload = { name: "Neu" };
    const created = { id: "99", ...payload } as any;
    serviceMock.createTech.mockResolvedValueOnce(created);
    const response = await request(buildApp())
      .post("/api/technologies")
      .send(payload);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(created);
    expect(serviceMock.createTech).toHaveBeenCalledWith(payload);
  });

  it("Liefert 404 beim Update einer unbekannten Technologie", async () => {
    serviceMock.updateTech.mockResolvedValueOnce(null);
    const response = await request(buildApp())
      .patch("/api/technologies/does-not-exist")
      .send({ name: "X" });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });

  it("Aktualisiert eine vorhandene Technologie", async () => {
    const updated = { id: "2", name: "Beta" } as any;
    serviceMock.updateTech.mockResolvedValueOnce(updated);
    const response = await request(buildApp())
      .patch("/api/technologies/2")
      .send({ name: "Beta" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(updated);
  });

  it("Löscht eine Technologie", async () => {
    serviceMock.deleteTech.mockResolvedValueOnce({ id: "4" } as any);
    const response = await request(buildApp()).delete("/api/technologies/4");
    expect(response.status).toBe(200);
    expect(serviceMock.deleteTech).toHaveBeenCalledWith("4");
  });

  it("Liefert 404 beim Löschen einer unbekannten Technologie", async () => {
    serviceMock.deleteTech.mockResolvedValueOnce(null as any);
    const response = await request(buildApp()).delete("/api/technologies/404");
    expect(response.status).toBe(404);
  });
});
