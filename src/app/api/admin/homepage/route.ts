import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readHomepage, writeHomepage } from '@/lib/data';

const COOKIE_NAME = 'rullie-admin-session';

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  return !!session?.value;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const homepage = await readHomepage();
    return NextResponse.json(homepage);
  } catch {
    return NextResponse.json({ error: 'Veriler okunamadı' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const body = await request.json();
    await writeHomepage(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 });
  }
}
