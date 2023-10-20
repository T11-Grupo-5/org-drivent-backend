import { Event } from '@prisma/client';
import dayjs from 'dayjs';
import { notFoundError } from '@/errors';
import { eventRepository } from '@/repositories';
import { exclude } from '@/utils/prisma-utils';
import redis, { DEFAULT_EXP } from '@/config/redis';

async function getFirstEvent() {
  const event = await eventRepository.findFirst();
  if (!event) throw notFoundError();

  const excludedEvent = exclude(event, 'createdAt', 'updatedAt');

  return excludedEvent;
}

async function isCurrentEventActive(): Promise<boolean> {
  const cacheKey = 'isCurrentEventActive';
  const cachedResult = await redis.get(cacheKey);

  if (cachedResult) {
    return JSON.parse(cachedResult);
  } else {
    const event = await eventRepository.findFirst();
    if (!event) return false;

    const now = dayjs();
    const eventStartsAt = dayjs(event.startsAt);
    const eventEndsAt = dayjs(event.endsAt);

    const isActive = now.isAfter(eventStartsAt) && now.isBefore(eventEndsAt);

    await redis.setEx(cacheKey, DEFAULT_EXP, JSON.stringify(isActive));

    return isActive;
  }
}

export const eventsService = {
  getFirstEvent,
  isCurrentEventActive,
};
