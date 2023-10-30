import { Router } from 'express';
import { getActivitys, getHallsByDayId, upActivitys } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const activityRouter = Router();

activityRouter.all('/*', authenticateToken).put('/:activityId', upActivitys).get('/:DayId', getActivitys);

export { activityRouter };
