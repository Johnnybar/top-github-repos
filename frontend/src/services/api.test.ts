import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchGithubRepos } from './api';
import { GithubApiResponse } from '../types/repo';

// Mock fetch globally
global.fetch = vi.fn();

describe('API Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchGithubRepos', () => {
    it('should return error when API call fails', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      await expect(fetchGithubRepos('', '')).rejects.toThrow('HTTP error! status: 500 - Internal Server Error');
      expect(global.fetch).toHaveBeenCalledWith('/api/github-repos');
    });

    it('should process successful API response correctly', async () => {
      const mockApiResponse: GithubApiResponse = {
        items: [
          {
            id: 123,
            name: 'test-repo',
            description: 'A test repository',
            clone_url: 'https://github.com/owner/test-repo.git',
            stargazers_count: 100,
            language: 'JavaScript',
            watchers_count: 50,
            open_issues_count: 5,
            owner: {
              avatar_url: 'https://via.placeholder.com/40',
              html_url: 'https://github.com/owner',
            },
          }
        ],
        total_count: 1,
        incomplete_results: false
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse)
      });

      const result = await fetchGithubRepos('', '');

      expect(global.fetch).toHaveBeenCalledWith('/api/github-repos');
      expect(result.items).toHaveLength(1);
      expect(result.items[0].id).toBe(123);
      expect(result.items[0].language).toBe('JavaScript');
    });

    it('should include search query in URL when provided', async () => {
      const mockApiResponse: GithubApiResponse = {
        items: [],
        total_count: 0,
        incomplete_results: false
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse)
      });

      await fetchGithubRepos('react', '');

      expect(global.fetch).toHaveBeenCalledWith('/api/github-repos?q=react');
    });

    it('should include language filter in URL when provided', async () => {
      const mockApiResponse: GithubApiResponse = {
        items: [],
        total_count: 0,
        incomplete_results: false
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse)
      });

      await fetchGithubRepos('', 'TypeScript');

      expect(global.fetch).toHaveBeenCalledWith('/api/github-repos?language=TypeScript');
    });

    it('should include both search query and language filter in URL when provided', async () => {
      const mockApiResponse: GithubApiResponse = {
        items: [],
        total_count: 0,
        incomplete_results: false
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockApiResponse)
      });

      await fetchGithubRepos('react', 'TypeScript');

      expect(global.fetch).toHaveBeenCalledWith('/api/github-repos?q=react&language=TypeScript');
    });
  });
}); 