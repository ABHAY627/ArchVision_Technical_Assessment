import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { deleteImageFromDisk } from '@/lib/imageApi';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const sessionId = req.cookies.get('archvision_session')?.value;
  if (!sessionId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const generation = await prisma.generation.findUnique({
    where: { id: params.id },
  });

  if (!generation || generation.sessionId !== sessionId) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await deleteImageFromDisk(generation.imagePath);
  await prisma.generation.delete({ where: { id: params.id } });

  return NextResponse.json({ success: true });
}

export async function generateStaticParams() {
  return [];
}
