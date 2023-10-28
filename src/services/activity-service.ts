import { conflictError, notFoundError } from '@/errors';
import { ActivityById, FindActivityByDayId, FindHallsByDay, InsertUserActivity } from '@/repositories';

export async function activitybyDay(DayId: number) {
  const result = await FindActivityByDayId(DayId);
  if (!result) throw notFoundError();
  return result;
}

export async function updateActivity(activityId: number, UserId: number) {
  const checkCapacity = await ActivityById(activityId);
  if (checkCapacity[0].capacity <= checkCapacity[0].Users.length) throw conflictError;
  const result = await InsertUserActivity(activityId, UserId);
  return result;
}

export async function hallsByDay(dayId: number) {
  const result = await FindHallsByDay(dayId);
  return result;
}
