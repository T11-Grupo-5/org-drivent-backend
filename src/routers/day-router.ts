import { Router } from 'express';
import { getAllDays } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const daysRouter = Router();

daysRouter.all('/*', authenticateToken).get('/', getAllDays);

export { daysRouter };
