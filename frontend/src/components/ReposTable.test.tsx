import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ReposTable } from './ReposTable';
import { GithubReposData } from '../types';

// Mock the DataGrid component
vi.mock('@mui/x-data-grid', () => ({
  DataGrid: ({ rows, onRowClick }: any) => (
    <div data-testid="data-grid">
      {rows.map((row: GithubReposData) => (
        <div key={row.id} onClick={() => onRowClick({ row })}>
          {row.name}
        </div>
      ))}
    </div>
  ),
}));

describe('ReposTable Component', () => {
  const mockOnStarToggle = vi.fn();
  const mockOnRowClick = vi.fn();
  const mockStarredRepos = new Set([1, 3]);
  
  const mockRepos: GithubReposData[] = [
    {
      id: 1,
      name: 'test-repo1',
      full_name: 'test-owner/test-repo1',
      description: 'A test repository',
      clone_url: 'https://github.com/test/repo1',
      language: 'JavaScript',
      stargazers_count: 100,
      watchers_count: 50,
      open_issues_count: 5,
      owner: {
        avatar_url: 'https://example.com/avatar1.jpg',
        html_url: 'https://github.com/test-owner'
      }
    },
    {
      id: 2,
      name: 'test-repo2',
      full_name: 'test-owner/test-repo2',
      description: 'Another test repository',
      clone_url: 'https://github.com/test/repo2',
      language: 'TypeScript',
      stargazers_count: 200,
      watchers_count: 100,
      open_issues_count: 10,
      owner: {
        avatar_url: 'https://example.com/avatar2.jpg',
        html_url: 'https://github.com/test-owner'
      }
    }
  ];

  it('should render repos count', () => {
    render(
      <ReposTable
        filteredRows={mockRepos}
        starredRepos={mockStarredRepos}
        onStarToggle={mockOnStarToggle}
        onRowClick={mockOnRowClick}
        isMobile={false}
      />
    );
    
    expect(screen.getByText('2 repos found')).toBeInTheDocument();
  });

  it('should render data grid with rows', () => {
    render(
      <ReposTable
        filteredRows={mockRepos}
        starredRepos={mockStarredRepos}
        onStarToggle={mockOnStarToggle}
        onRowClick={mockOnRowClick}
        isMobile={false}
      />
    );
    
    expect(screen.getByTestId('data-grid')).toBeInTheDocument();
    expect(screen.getByText('test-repo1')).toBeInTheDocument();
    expect(screen.getByText('test-repo2')).toBeInTheDocument();
  });

  it('should show correct count for empty rows', () => {
    render(
      <ReposTable
        filteredRows={[]}
        starredRepos={mockStarredRepos}
        onStarToggle={mockOnStarToggle}
        onRowClick={mockOnRowClick}
        isMobile={false}
      />
    );
    
    expect(screen.getByText('0 repos found')).toBeInTheDocument();
  });
}); 