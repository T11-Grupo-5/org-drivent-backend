import { prisma } from '@/config';

export async function findAllHall() {
  return prisma.hall.findMany();
}
