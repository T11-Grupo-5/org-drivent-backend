import { notFoundError } from '@/errors';
import { findAllHall } from '@/repositories';

export async function getHalls() {
  const response = await findAllHall();
  if (!response) throw notFoundError();
  return response;
}
