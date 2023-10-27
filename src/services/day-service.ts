import { notFoundError } from '@/errors';
import { getAllDays } from '@/repositories';

export async function getDays() {
  const response = await getAllDays();
  if (!response) throw notFoundError();
  return response;
}
