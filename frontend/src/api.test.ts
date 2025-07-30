import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchGithubRepos } from './api';
import { githubReposMock } from './mocks';

// Mock fetch globally
global.fetch = vi.fn();

describe('API Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchGithubRepos', () => {
    it('should return mock data when API call fails', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      const result = await fetchGithubRepos();

      expect(global.fetch).toHaveBeenCalledWith('/api/github-repos');
      expect(result).toEqual(githubReposMock.items);
    });

    it('should process successful API response correctly', async () => {
      const { mockApiResponse } = await import('./mocks');

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockApiResponse))
      });

      const result = await fetchGithubRepos();

      expect(global.fetch).toHaveBeenCalledWith('/api/github-repos');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(123);
      expect(result[0].language).toBe('JavaScript');
    });
  });
}); 