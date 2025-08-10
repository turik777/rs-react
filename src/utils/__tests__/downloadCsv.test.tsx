import { describe, it, vi, expect, beforeEach } from 'vitest';
import { mockCharacters } from '../__mocks__/handlers';
import { downloadCsv } from '../helpers/downloadCsv';

const mockCreateObjectURL = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  globalThis.URL.createObjectURL = mockCreateObjectURL;
});

describe('downloadCsv', () => {
  it('download a CSV file with character data', async () => {
    await downloadCsv(mockCharacters);
    expect(mockCreateObjectURL).toHaveBeenCalled();
  });
});
