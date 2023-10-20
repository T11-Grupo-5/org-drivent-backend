import { TicketStatus } from '@prisma/client';
import e from 'express';
import { invalidDataError, notFoundError } from '@/errors';
import { cannotListHotelsError } from '@/errors/cannot-list-hotels-error';
import { enrollmentRepository, hotelRepository, ticketsRepository } from '@/repositories';
import redis, { DEFAULT_EXP } from '@/config/redis';

async function validateUserBooking(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  const type = ticket.TicketType;

  if (ticket.status === TicketStatus.RESERVED || type.isRemote || !type.includesHotel) {
    throw cannotListHotelsError();
  }
}

async function getHotels(userId: number) {
  await validateUserBooking(userId);

  const cacheKey = `hotels`;
  const cachedHotels = await redis.get(cacheKey);

  if (cachedHotels) {
    return JSON.parse(cachedHotels);
  } else {
    const hotels = await hotelRepository.findHotels();

    if (hotels.length === 0) throw notFoundError();

    await redis.setEx(cacheKey, DEFAULT_EXP, JSON.stringify(hotels));

    return hotels;
  }
}

async function getHotelsWithRooms(userId: number, hotelId: number) {
  await validateUserBooking(userId);

  if (!hotelId || isNaN(hotelId)) throw invalidDataError('hotelId');

  const cacheKey = `hotel:${hotelId}`;
  const cachedHotelWithRooms = await redis.get(cacheKey);

  if (cacheKey) {
    return JSON.parse(cachedHotelWithRooms);
  } else {
    const hotelWithRooms = await hotelRepository.findRoomsByHotelId(hotelId);
    if (!hotelWithRooms) throw notFoundError();

    await redis.setEx(cacheKey, DEFAULT_EXP, JSON.stringify(hotelWithRooms));

    return hotelWithRooms;
  }
}

export const hotelsService = {
  getHotels,
  getHotelsWithRooms,
};
