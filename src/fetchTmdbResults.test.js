import { afterEach, describe, expect, it, vi } from 'vitest';
import axios from './axios';
import { fetchTmdbResults } from './fetchTmdbResults';

describe('fetchTmdbResults', () => {
  afterEach(() => vi.restoreAllMocks());

  it('returns the results array from TMDB', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue({ data: { results: [{ id: 1 }] } });

    await expect(fetchTmdbResults('/trending?api_key=secret')).resolves.toEqual([{ id: 1 }]);
  });

  it('returns no results and logs the endpoint without the API key when TMDB fails', async () => {
    vi.spyOn(axios, 'get').mockRejectedValue(new Error('Network Error'));
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    await expect(fetchTmdbResults('/trending/all/week?api_key=secret')).resolves.toEqual([]);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('/trending/all/week'));
    expect(warn.mock.calls.flat().join(' ')).not.toContain('secret');
  });
});
