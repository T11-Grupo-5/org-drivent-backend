import { prisma } from '@/config';

export async function findAllDays() {
  return prisma.day.findMany();
}
