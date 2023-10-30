import { prisma } from '@/config';

export async function FindActivityByDayId(DayId: number) {
  return await prisma.activity.findMany({
    where: {
      Days: {
        some: {
          id: DayId,
        },
      },
    },
    include: { Users: { select: { id: true } } },
  });
}

export async function getAllDays() {
  return await prisma.day.findMany({});
}

export async function ActivityById(activityId: number) {
  return await prisma.activity.findMany({
    where: {
      id: activityId,
    },
    include: { Users: true },
  });
}

export async function InsertUserActivity(activityId: number, UserId: number) {
  return prisma.activity.update({
    where: {
      id: activityId,
    },
    data: {
      Users: {
        connect: {
          id: UserId,
        },
      },
    },
    include: { Users: true },
  });
}

export async function FindHallsByDay(dayId: number) {
  return await prisma.hall.findMany({
    include: {
      Activities: true,
    },
    where: {
      Activities: {
        some: {
          id: dayId,
        },
      },
    },
  });
}
