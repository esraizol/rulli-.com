import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { promises as fs } from 'fs';
import path from 'path';

const COOKIE_NAME = 'rullie-admin-session';
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'images');

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  return !!session?.value;
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) ?? 'products';

    if (!file) {
      return NextResponse.json({ error: 'Dosya gerekli' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Desteklenmeyen dosya formatı. JPEG, PNG, WebP veya AVIF kullanın.' },
        { status: 400 },
      );
    }

    // Validate file size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'Dosya boyutu 10MB\'ı geçemez' },
        { status: 400 },
      );
    }

    // Sanitize filename
    const safeName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9._-]/g, '-')
      .replace(/-+/g, '-');

    const targetDir = path.join(UPLOAD_DIR, folder);
    await fs.mkdir(targetDir, { recursive: true });

    const targetPath = path.join(targetDir, safeName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(targetPath, buffer);

    const publicUrl = `/images/${folder}/${safeName}`;
    return NextResponse.json({ url: publicUrl, filename: safeName });
  } catch {
    return NextResponse.json({ error: 'Yükleme başarısız' }, { status: 500 });
  }
}
