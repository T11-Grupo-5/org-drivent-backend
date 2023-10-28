import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  //Seed Event
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driven.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }

  console.log({ event });
  //Seed TicketType
  const ticketTypes = await prisma.ticketType.findFirst();

  if (!ticketTypes) {
    const data = [
      {
        name: 'Presencial',
        price: 250,
        isRemote: false,
        includesHotel: false,
      },
      {
        name: 'Online',
        price: 100,
        isRemote: true,
        includesHotel: false,
      },
      {
        name: 'Presencial',
        price: 600,
        isRemote: false,
        includesHotel: true,
      },
    ];

    for (const ticketTypeData of data) {
      await prisma.ticketType.create({ data: ticketTypeData });
      console.log({ ticketTypeData });
    }
  }
  //Seed Hotel
  const hotels = await prisma.hotel.findFirst();

  if (!hotels) {
    const data = [
      {
        name: 'Driven Resort',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
      },
      {
        name: 'Driven Palace',
        image: 'https://www.ahstatic.com/photos/5451_ho_00_p_2048x1536.jpg',
      },
      {
        name: 'Driven World',
        image:
          'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_627,q_auto,w_1200/itemimages/96/95/96959_v6.jpeg',
      },
    ];

    for (const HotelData of data) {
      await prisma.hotel.create({ data: HotelData });
      console.log({ HotelData });
    }
  }
  //Seed Room
  const rooms = await prisma.room.findFirst();

  if (!rooms) {
    const data: { name: string; capacity: number; hotelId: number }[] = [];

    const numberOfSingleHotel1 = 35;
    const numberOfDoubleHotel1 = 34;

    const numberOfRoomHotel2 = 5;

    const numberOfRoomHotel3 = 1;

    for (let i = 0; i < numberOfSingleHotel1; i++) {
      data.push({
        name: 'Single',
        capacity: 1,
        hotelId: 1,
      });
    }

    for (let i = 0; i < numberOfDoubleHotel1; i++) {
      data.push({
        name: 'Double',
        capacity: 2,
        hotelId: 1,
      });
    }

    for (let i = 0; i < numberOfRoomHotel2; i++) {
      data.push({
        name: 'Single',
        capacity: 1,
        hotelId: 2,
      });
    }

    for (let i = 0; i < numberOfRoomHotel2; i++) {
      data.push({
        name: 'Double',
        capacity: 2,
        hotelId: 2,
      });
    }

    for (let i = 0; i < numberOfRoomHotel2; i++) {
      data.push({
        name: 'Triple',
        capacity: 3,
        hotelId: 2,
      });
    }

    for (let i = 0; i < numberOfRoomHotel3; i++) {
      data.push({
        name: 'Single',
        capacity: 1,
        hotelId: 3,
      });
    }

    for (let i = 0; i < numberOfRoomHotel3; i++) {
      data.push({
        name: 'Double',
        capacity: 1,
        hotelId: 3,
      });
    }

    for (const RoomData of data) {
      await prisma.room.create({ data: RoomData });
      console.log({ RoomData });
    }
  }
  //Seed Hall
  const halls = await prisma.hall.findFirst();

  if (!halls) {
    const data = [
      {
        name: 'Auditório Principal',
        hotelId: 1,
      },
      {
        name: 'Auditório Lateral',
        hotelId: 1,
      },
      {
        name: 'Sala de Workshop',
        hotelId: 1,
      },
    ];

    for (const HallData of data) {
      await prisma.hall.create({ data: HallData });
      console.log({ HallData });
    }
  }
  //Seed Day
  const days = await prisma.day.findFirst();
  if (!days) {
    const data = [
      {
        dayName: 'Sexta',
        date: dayjs().toDate(),
      },
      {
        dayName: 'Sábado',
        date: dayjs().add(1, 'day').toDate(),
      },
      {
        dayName: 'Domingo',
        date: dayjs().add(2, 'day').toDate(),
      },
    ];
    for (const DayData of data) {
      await prisma.day.create({ data: DayData });
      console.log({ DayData });
    }
  }
  //Seed Activity
  const activities = await prisma.activity.findFirst();
  if (!activities) {
    const data = [
      {
        name: 'Minecraft: montando o PC ideal',
        capacity: 27,
        startTime: dayjs().set('hour', 9).set('minute', 0).set('second', 0).toDate(),
        endTime: dayjs().set('hour', 10).set('minute', 0).set('second', 0).toDate(),
        dayId: 1,
        hallId: 1,
      },
      {
        name: 'LoL: montando o PC ideal',
        capacity: 0,
        startTime: dayjs().set('hour', 10).set('minute', 0).set('second', 0).toDate(),
        endTime: dayjs().set('hour', 11).set('minute', 0).set('second', 0).toDate(),
        dayId: 1,
        hallId: 1,
      },
      {
        name: 'Palestra x',
        capacity: 27,
        startTime: dayjs().set('hour', 9).set('minute', 0).set('second', 0).toDate(),
        endTime: dayjs().set('hour', 11).set('minute', 0).set('second', 0).toDate(),
        dayId: 1,
        hallId: 2,
      },
      {
        name: 'Palestra y',
        capacity: 27,
        startTime: dayjs().set('hour', 9).set('minute', 0).set('second', 0).toDate(),
        endTime: dayjs().set('hour', 10).set('minute', 0).set('second', 0).toDate(),
        dayId: 1,
        hallId: 3,
      },
      {
        name: 'Palestra z',
        capacity: 0,
        startTime: dayjs().set('hour', 10).set('minute', 0).set('second', 0).toDate(),
        endTime: dayjs().set('hour', 11).set('minute', 0).set('second', 0).toDate(),
        dayId: 1,
        hallId: 3,
      },
      {
        name: 'Minecraft: montando o PC ideal',
        capacity: 27,
        startTime: dayjs().set('hour', 9).set('minute', 0).set('second', 0).toDate(),
        endTime: dayjs().set('hour', 10).set('minute', 0).set('second', 0).toDate(),
        dayId: 2,
        hallId: 1,
      },
      {
        name: 'LoL: montando o PC ideal',
        capacity: 0,
        startTime: dayjs().set('hour', 10).set('minute', 0).set('second', 0).toDate(),
        endTime: dayjs().set('hour', 11).set('minute', 0).set('second', 0).toDate(),
        dayId: 2,
        hallId: 1,
      },
      {
        name: 'Minecraft: montando o PC ideal',
        capacity: 27,
        startTime: dayjs().set('hour', 9).set('minute', 0).set('second', 0).toDate(),
        endTime: dayjs().set('hour', 10).set('minute', 0).set('second', 0).toDate(),
        dayId: 3,
        hallId: 1,
      },
      {
        name: 'Minecraft: montando o PC ideal',
        capacity: 0,
        startTime: dayjs().set('hour', 10).set('minute', 0).set('second', 0).toDate(),
        endTime: dayjs().set('hour', 11).set('minute', 0).set('second', 0).toDate(),
        dayId: 3,
        hallId: 1,
      },
      {
        name: 'Minecraft: montando o PC ideal',
        capacity: 27,
        startTime: dayjs().set('hour', 9).set('minute', 0).set('second', 0).toDate(),
        endTime: dayjs().set('hour', 10).set('minute', 30).set('second', 0).toDate(),
        dayId: 3,
        hallId: 2,
      },
    ];
    for (const ActivitiesData of data) {
      await prisma.activity.create({ data: ActivitiesData });
      console.log({ ActivitiesData });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
