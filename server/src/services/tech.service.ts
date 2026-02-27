import { Prisma, Technology } from '../generated/client/client.js';
import { prisma } from '../config/db.js';

export const getAllTechnologies = async () => {
  return prisma.technology.findMany({
    orderBy: [
      { published: 'asc' },
      { name: 'asc' }
    ]
  });
};

export const createTech = async (data: Prisma.TechnologyCreateInput): Promise<Technology> => {
  return prisma.technology.create({
    data: data
  });
};

export const deleteTech = async (id: string) => {
  return prisma.technology.delete({
    where: { id }
  });
}

export const updateTech = async (id: string, data: Prisma.TechnologyUpdateInput) => {
  const current = await prisma.technology.findUnique({ where: { id } });

  if (!current) return null;

  if (data.published === true && !current.publishedAt) {
    data.publishedAt = new Date();
  }

  return prisma.technology.update({
    where: { id },
    data: data
  });
};