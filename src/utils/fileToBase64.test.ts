import { describe, it, expect, vi } from 'vitest';
import { fileToBase64 } from './fileToBase64';

const mockFile = new File(['test file'], 'test.txt', {
  type: 'text/plain',
});
const mockResult = 'data:text/plain;base64,hw4dHzq3rm61aW3S';
const mockError = new Error('Read error');
const readerMock = {
  readAsDataURL: vi.fn(),
  onload: vi.fn(),
  onerror: vi.fn(),
  result: mockResult,
};

describe('fileToBase64', () => {
  it('should resolve with base64 string when read successfully', async () => {
    vi.spyOn(globalThis, 'FileReader').mockImplementation(
      () => readerMock as unknown as FileReader
    );
    const promise = fileToBase64(mockFile);
    readerMock.onload();
    await expect(promise).resolves.toBe(mockResult);
    expect(readerMock.readAsDataURL).toHaveBeenCalledWith(mockFile);
  });

  it('should reject with error when reading fails', async () => {
    vi.spyOn(globalThis, 'FileReader').mockImplementation(
      () => readerMock as unknown as FileReader
    );
    const promise = fileToBase64(mockFile);
    readerMock.onerror(mockError);
    await expect(promise).rejects.toBe(mockError);
  });
});
