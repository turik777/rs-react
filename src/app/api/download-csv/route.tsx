import type { Character } from '../../../interface/interface';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const selectedChars: Character[] = await request.json();

  const rows = selectedChars.map(
    (character) =>
      `"${character.id}","${character.name}","${character.species}","${character.gender}","${character.status}"`
  );
  const csv = ['"id","name","species","gender","status"', ...rows].join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${selectedChars.length}_items.csv"`,
    },
  });
}
