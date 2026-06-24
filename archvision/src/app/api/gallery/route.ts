import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const sessionId = req.cookies.get('archvision_session')?.value;
  if (!sessionId) return NextResponse.json({ images: [] });

  const images = await prisma.generation.findMany({
    where: { sessionId },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ images });
}
