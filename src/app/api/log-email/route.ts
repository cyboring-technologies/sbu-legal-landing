import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { error: 'Documentos.legal is archived and does not accept submissions.' },
    { status: 410 }
  );
}
