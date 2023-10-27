import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { bookRoom, changeBooking, getBooking, getBookingsByRoomId } from '@/controllers';
import { bookingSchema } from '@/schemas/booking-schema';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getBooking)
  .get('/:roomId', getBookingsByRoomId)
  .post('/', validateBody(bookingSchema), bookRoom)
  .put('/:bookingId', validateBody(bookingSchema), changeBooking);

export { bookingRouter };
