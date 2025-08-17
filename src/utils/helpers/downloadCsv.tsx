import type { Character } from '../../interface/interface';

export const downloadCsv = async (selectedChars: Character[]) => {
  const response = await fetch('/api/download-csv', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/csv',
    },
    body: JSON.stringify(selectedChars),
  });
  const blob = await response.blob();
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${selectedChars.length}_items.csv`;
  link.click();
};
