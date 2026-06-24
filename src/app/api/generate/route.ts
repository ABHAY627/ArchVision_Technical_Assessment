import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  buildFinalPrompt,
  generateWithPollinations,
  generateWithGemini,
  saveImageToDisk,
} from '@/lib/imageApi';

export const runtime = 'nodejs';
export const maxDuration = 60;

const ERROR_MESSAGES: Record<string, string> = {
  timeout: 'Generation timed out. The AI service is busy — please try again.',
  invalid_prompt:
    "This prompt couldn't be processed. Try a more specific architectural description.",
  api_error: 'Something went wrong. The AI returned an unexpected response.',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, styles } = body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'invalid_prompt', message: 'Prompt is required.' },
        { status: 400 }
      );
    }
    if (prompt.length > 500) {
      return NextResponse.json(
        { error: 'invalid_prompt', message: 'Prompt too long (max 500 chars).' },
        { status: 400 }
      );
    }

    const sessionId = req.cookies.get('archvision_session')?.value ?? `anon_${Date.now()}`;
    const finalPrompt = buildFinalPrompt(prompt.trim(), Array.isArray(styles) ? styles : []);
    const provider = process.env.AI_PROVIDER ?? 'pollinations';

    let buffer: Buffer;
    try {
      if (provider === 'gemini') {
        try {
          buffer = await generateWithGemini(finalPrompt);
        } catch (geminiErr: any) {
          console.warn('[/api/generate] Gemini failed, falling back to Pollinations:', geminiErr.message);
          buffer = await generateWithPollinations(finalPrompt);
        }
      } else {
        buffer = await generateWithPollinations(finalPrompt);
      }
    } catch (err: any) {
      const errorType = ['timeout', 'invalid_prompt', 'api_error'].includes(err.message)
        ? err.message
        : 'api_error';
      return NextResponse.json(
        { error: errorType, message: ERROR_MESSAGES[errorType] },
        { status: 422 }
      );
    }

    const imagePath = await saveImageToDisk(buffer);
    const generation = await prisma.generation.create({
      data: {
        sessionId,
        prompt: prompt.trim(),
        styles: Array.isArray(styles) ? styles : [],
        imagePath,
      },
    });

    const response = NextResponse.json({
      id: generation.id,
      imagePath,
      prompt: prompt.trim(),
    });

    response.cookies.set('archvision_session', sessionId, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });

    return response;
  } catch (err) {
    console.error('[/api/generate]', err);
    return NextResponse.json(
      { error: 'api_error', message: ERROR_MESSAGES['api_error'] },
      { status: 500 }
    );
  }
}
