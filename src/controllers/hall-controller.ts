import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { getHalls } from '@/services';

export async function getAllHalls(req: AuthenticatedRequest, res: Response) {
  const response = await getHalls();

  return res.status(httpStatus.OK).send(response);
}
