import { NextResponse } from 'next/server';

import prisma from '@/app/shared/model/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    title,
    imageSrc,
    category,
    description,
    location,
    price,
    roomCount,
    guestCount,
    bathroomCount,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      userId: currentUser.id,
      title,
      imageSrc,
      category,
      description,
      locationValue: location.value,
      price: parseInt(price, 10),
      roomCount,
      guestCount,
      bathroomCount,
    },
  });
  return NextResponse.json(listing);
}
