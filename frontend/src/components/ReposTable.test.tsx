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
  
  const mockFilteredRows: GithubReposData[] = [
    {
      id: 1,
      name: 'Test Repo 1',
      full_name: 'test/repo1',
      description: 'Test description 1',
      url: 'https://github.com/test/repo1',
      language: 'JavaScript',
      stargazers_count: 100,
      watchers_count: 50,
      open_issues_count: 5,
      owner: {
        avatar_url: 'https://example.com/avatar1.jpg',
        html_url: 'https://github.com/testuser1'
      }
    },
    {
      id: 2,
      name: 'Test Repo 2',
      full_name: 'test/repo2',
      description: 'Test description 2',
      url: 'https://github.com/test/repo2',
      language: 'TypeScript',
      stargazers_count: 200,
      watchers_count: 100,
      open_issues_count: 10,
      owner: {
        avatar_url: 'https://example.com/avatar2.jpg',
        html_url: 'https://github.com/testuser2'
      }
    }
  ];

  it('should render repos count', () => {
    render(
      <ReposTable
        filteredRows={mockFilteredRows}
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
        filteredRows={mockFilteredRows}
        starredRepos={mockStarredRepos}
        onStarToggle={mockOnStarToggle}
        onRowClick={mockOnRowClick}
        isMobile={false}
      />
    );
    
    expect(screen.getByTestId('data-grid')).toBeInTheDocument();
    expect(screen.getByText('Test Repo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Repo 2')).toBeInTheDocument();
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