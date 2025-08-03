import { describe, it, vi, expect, beforeEach, type Mock } from 'vitest';
import { getCharacterById } from '../api';
import { mockCharacters } from '../__mocks__/handlers';
import { downloadCsv } from '../helpers/downloadCsv';

const mockCreateObjectURL = vi.fn();

vi.mock('../api', () => ({
  getCharacterById: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
  globalThis.URL.createObjectURL = mockCreateObjectURL;
});

describe('downloadCsv', () => {
  it('download a CSV file with character data', async () => {
    const characters = mockCharacters;
    (getCharacterById as Mock).mockImplementation((id: string) =>
      Promise.resolve(characters.find((character) => character.id === id))
    );
    await downloadCsv(['1', '2', '3']);
    expect(getCharacterById).toHaveBeenCalledTimes(3);
    expect(getCharacterById).toHaveBeenCalledWith('1');
    expect(getCharacterById).toHaveBeenCalledWith('2');
    expect(getCharacterById).toHaveBeenCalledWith('3');
    expect(mockCreateObjectURL).toHaveBeenCalled();
  });
});
