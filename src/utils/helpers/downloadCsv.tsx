import type { Character } from '../../interface/interface';

export const downloadCsv = async (selectedChars: Character[]) => {
  try {
    const rows = selectedChars.map(
      (character) =>
        `"${character.id}","${character.name}","${character.species}","${character.gender}","${character.status}"`
    );
    const csv = ['"id","name","species","gender","status"', ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedChars.length}_items.csv`;
    link.click();
  } catch (error) {
    throw new Error(`'Download failed:', ${error}`);
  }
};
