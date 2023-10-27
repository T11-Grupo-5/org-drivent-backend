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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
