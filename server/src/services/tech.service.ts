import { prisma } from '../config/db.js';

export const getAllTechnologies = async () => {
  return prisma.technology.findMany();
};

export const getTechnologyById = async (id: string) => {
  return prisma.technology.findUnique({
    where: { id },
  });
}