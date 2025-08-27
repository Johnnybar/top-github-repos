import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useSortRepos from './useSortRepos';
import { GithubReposData } from '../types/repo';

describe('useSortRepos Hook', () => {
  const mockRepos: GithubReposData[] = [
    {
      id: 1,
      name: 'repo-a',
      description: 'First repository',
      clone_url: 'https://github.com/owner/repo-a.git',
      stargazers_count: 100,
      language: 'TypeScript',
      watchers_count: 50,
      open_issues_count: 5,
      owner: {
        avatar_url: 'https://via.placeholder.com/40',
        html_url: 'https://github.com/owner',
      },
    },
    {
      id: 2,
      name: 'repo-b',
      description: 'Second repository',
      clone_url: 'https://github.com/owner/repo-b.git',
      stargazers_count: 200,
      language: 'JavaScript',
      watchers_count: 100,
      open_issues_count: 10,
      owner: {
        avatar_url: 'https://via.placeholder.com/40',
        html_url: 'https://github.com/owner',
      },
    },
    {
      id: 3,
      name: 'repo-c',
      description: 'Third repository',
      clone_url: 'https://github.com/owner/repo-c.git',
      stargazers_count: 150,
      language: 'Python',
      watchers_count: 75,
      open_issues_count: 8,
      owner: {
        avatar_url: 'https://via.placeholder.com/40',
        html_url: 'https://github.com/owner',
      },
    },
  ];

  it('should initialize with default sort configuration', () => {
    const { result } = renderHook(() => useSortRepos(mockRepos));
    
    expect(result.current.sortConfig.field).toBe('stars');
    expect(result.current.sortConfig.direction).toBe('desc');
    expect(result.current.filterLanguage).toBe('');
  });

  it('should sort repositories by stars in descending order by default', () => {
    const { result } = renderHook(() => useSortRepos(mockRepos));
    
    expect(result.current.sortedRepos[0].stargazers_count).toBe(200);
    expect(result.current.sortedRepos[1].stargazers_count).toBe(150);
    expect(result.current.sortedRepos[2].stargazers_count).toBe(100);
  });

  it('should sort repositories by stars in ascending order when toggled', () => {
    const { result } = renderHook(() => useSortRepos(mockRepos));
    
    act(() => {
      result.current.handleSort('stars');
    });
    
    expect(result.current.sortConfig.direction).toBe('asc');
    expect(result.current.sortedRepos[0].stargazers_count).toBe(100);
    expect(result.current.sortedRepos[2].stargazers_count).toBe(200);
  });

  it('should sort repositories by name in alphabetical order', () => {
    const { result } = renderHook(() => useSortRepos(mockRepos));
    
    act(() => {
      result.current.handleSort('name');
    });
    
    // Default direction is desc, so names should be in reverse alphabetical order
    expect(result.current.sortedRepos[0].name).toBe('repo-c');
    expect(result.current.sortedRepos[1].name).toBe('repo-b');
    expect(result.current.sortedRepos[2].name).toBe('repo-a');
  });

  it('should sort repositories by name in reverse alphabetical order when toggled to asc', () => {
    const { result } = renderHook(() => useSortRepos(mockRepos));
    
    act(() => {
      result.current.handleSort('name');
      result.current.handleSort('name'); // Toggle to asc
    });
    
    expect(result.current.sortConfig.direction).toBe('asc');
    expect(result.current.sortedRepos[0].name).toBe('repo-a');
    expect(result.current.sortedRepos[1].name).toBe('repo-b');
    expect(result.current.sortedRepos[2].name).toBe('repo-c');
  });

  it('should filter repositories by language', () => {
    const { result } = renderHook(() => useSortRepos(mockRepos));
    
    act(() => {
      result.current.handleLanguageFilter('TypeScript');
    });
    
    expect(result.current.filterLanguage).toBe('TypeScript');
    expect(result.current.sortedRepos).toHaveLength(1);
    expect(result.current.sortedRepos[0].language).toBe('TypeScript');
  });

  it('should clear filters and reset sort configuration', () => {
    const { result } = renderHook(() => useSortRepos(mockRepos));
    
    act(() => {
      result.current.handleLanguageFilter('TypeScript');
      result.current.handleSort('name');
    });
    
    act(() => {
      result.current.clearFilters();
    });
    
    expect(result.current.filterLanguage).toBe('');
    expect(result.current.sortConfig.field).toBe('stars');
    expect(result.current.sortConfig.direction).toBe('desc');
    expect(result.current.sortedRepos).toHaveLength(3);
  });

  it('should handle repositories without language', () => {
    const reposWithNullLanguage = mockRepos.map(repo => ({
      ...repo,
      language: null,
    }));
    
    const { result } = renderHook(() => useSortRepos(reposWithNullLanguage));
    
    act(() => {
      result.current.handleSort('language');
    });
    
    expect(result.current.sortedRepos).toHaveLength(3);
  });
});
