import { Router } from 'express';
import { getActivitys, upActivitys } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const activityRouter = Router();

activityRouter.all('/*', authenticateToken).get('/:DayId', getActivitys).put('/:activityId', upActivitys);

export { activityRouter };