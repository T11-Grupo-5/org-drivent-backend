import { Router } from 'express';
import { getAllHalls } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const HallRouter = Router();

HallRouter.all('/*', authenticateToken).get('/', getAllHalls);

export { HallRouter };
