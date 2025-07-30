import { vi } from 'vitest';
import { githubReposMock } from './mocks';

// Test-only mocks that use Vitest
export const mockFetchGithubRepos = vi.fn().mockResolvedValue(githubReposMock);
export const mockSetRepoInfoOpen = vi.fn(); 