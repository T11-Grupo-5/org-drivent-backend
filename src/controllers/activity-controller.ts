import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { activitybyDay, hallsByDay, updateActivity } from '@/services';

export async function getActivitys(req: AuthenticatedRequest, res: Response) {
  const { DayId } = req.params;
  const result = await activitybyDay(Number(DayId));
  return res.status(httpStatus.OK).send(result);
}

export async function upActivitys(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { activityId } = req.params;
  const result = await updateActivity(Number(activityId), Number(userId));
  return res.status(httpStatus.OK).send(result);
}

export async function getHallsByDayId(req: AuthenticatedRequest, res: Response) {
  const { DayId } = req.params;
  const result = await hallsByDay(Number(DayId));
  return res.status(httpStatus.OK).send(result);
}
