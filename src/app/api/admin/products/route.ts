import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readProducts, updateProduct } from '@/lib/data';

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
    const products = await readProducts();
    return NextResponse.json({ products });
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
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Ürün ID gerekli' }, { status: 400 });
    }

    const updated = await updateProduct(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 });
    }

    return NextResponse.json({ product: updated });
  } catch {
    return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 });
  }
}
