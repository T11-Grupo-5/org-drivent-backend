import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { getDays } from '@/services';

export async function getAllDays(req: AuthenticatedRequest, res: Response) {
  const response = await getDays();

  return res.status(httpStatus.OK).send(response);
}
