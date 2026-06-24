import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

// ─── Style descriptor map ────────────────────────────────────────────────────
const STYLE_DESCRIPTORS: Record<string, string> = {
  'Brutalist':
    'brutalist architecture, raw exposed concrete, monolithic forms, heavy geometric masses, dramatic shadows',
  'Minimalist Japanese':
    'Japanese minimalist architecture, wabi-sabi, clean lines, natural materials, zen spatial composition, wooden elements',
  'Bauhaus':
    'Bauhaus architecture, functional modernism, primary colors, geometric abstraction, flat roof, industrial materials',
  'Futuristic':
    'futuristic architecture, parametric design, fluid organic curves, advanced materials, sci-fi urban aesthetic',
  'Art Deco':
    'Art Deco architecture, ornate geometric patterns, gold accents, vertical lines, glamorous symmetry, 1920s opulence',
  'Organic':
    'organic biomorphic architecture, nature-inspired forms, living walls, curved surfaces, blending with landscape',
};

// ─── Prompt construction ─────────────────────────────────────────────────────
export function buildFinalPrompt(userPrompt: string, styles: string[]): string {
  const styleString = styles.map((s) => STYLE_DESCRIPTORS[s] ?? s).join(', ');
  const stylePart = styleString ? ` Style: ${styleString}.` : '';
  return `Architectural concept art: ${userPrompt}.${stylePart} High quality architectural visualization, professional render, dramatic lighting, photorealistic detail, 8K resolution.`;
}

// ─── Pollinations provider ───────────────────────────────────────────────────
export async function generateWithPollinations(finalPrompt: string): Promise<Buffer> {
  const encoded = encodeURIComponent(finalPrompt);
  const url = `https://image.pollinations.ai/prompt/${encoded}?width=1024&height=768&nologo=true&enhance=true`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 35000);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error('invalid_prompt');
    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.length < 1000) throw new Error('api_error');
    return buffer;
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'AbortError') throw new Error('timeout');
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

// ─── Gemini provider ─────────────────────────────────────────────────────────
export async function generateWithGemini(finalPrompt: string): Promise<Buffer> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('api_error');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 35000);

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: finalPrompt }] }],
          generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
        }),
      }
    );
    if (!res.ok) {
      const text = await res.text();
      console.error('Gemini API Error:', res.status, text);
      throw new Error('api_error');
    }
    const data = await res.json();
    const parts = data?.candidates?.[0]?.content?.parts as Array<{ inlineData?: { mimeType?: string; data?: string } }> | undefined;
    const part = parts?.find(
      (p) => p.inlineData?.mimeType?.startsWith('image/')
    );
    if (!part?.inlineData?.data) throw new Error('api_error');
    return Buffer.from(part.inlineData.data, 'base64');
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'AbortError') throw new Error('timeout');
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

// ─── File I/O ─────────────────────────────────────────────────────────────────
export async function saveImageToDisk(buffer: Buffer): Promise<string> {
  const dir = path.join(process.cwd(), 'public', 'generated');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const filename = `${uuidv4()}.png`;
  fs.writeFileSync(path.join(dir, filename), buffer);
  return `/generated/${filename}`;
}

export async function deleteImageFromDisk(imagePath: string): Promise<void> {
  const fullPath = path.join(process.cwd(), 'public', imagePath);
  if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
}
