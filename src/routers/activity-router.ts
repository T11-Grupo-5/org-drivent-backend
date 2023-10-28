import { Router } from 'express';
import { getActivitys, getHallsByDayId, upActivitys } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const activityRouter = Router();

activityRouter
  .all('/*', authenticateToken)
  .get('/:DayId', getActivitys)
  .put('/:activityId', upActivitys)
  .get('/halls/:DayId', getHallsByDayId);

export { activityRouter };
