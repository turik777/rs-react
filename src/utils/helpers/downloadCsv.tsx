import { getCharacterById } from '../api';

export const downloadCsv = async (selectedChars: string[]) => {
  try {
    const charactersToDownload = await Promise.all(
      selectedChars.map((id) => getCharacterById(id))
    );
    const rows = charactersToDownload.map(
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
