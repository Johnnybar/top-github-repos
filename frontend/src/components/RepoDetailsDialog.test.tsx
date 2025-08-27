import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { RepoDetailsDialog } from './RepoDetailsDialog';
import { GithubReposData } from '../types/repo';

describe('RepoDetailsDialog Component', () => {
  const mockOnClose = vi.fn();
  
  const mockRepos: GithubReposData[] = [
    {
      id: 123,
      name: 'test-repo',
      full_name: 'test-owner/test-repo',
      description: 'A test repository for testing purposes',
      clone_url: 'https://github.com/test-owner/test-repo.git',
      language: 'TypeScript',
      stargazers_count: 1000,
      watchers_count: 500,
      open_issues_count: 25,
      owner: {
        avatar_url: 'https://example.com/avatar.jpg',
        html_url: 'https://github.com/test-owner'
      }
    }
  ];

  it('should render without crashing when open and repoId is provided', () => {
    render(
      <RepoDetailsDialog
        open={true}
        repoId={123}
        onClose={mockOnClose}
        repos={mockRepos}
      />
    );
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    render(
      <RepoDetailsDialog
        open={true}
        repoId={123}
        onClose={mockOnClose}
        repos={mockRepos}
      />
    );
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should not render when open is false', () => {
    render(
      <RepoDetailsDialog
        open={false}
        repoId={123}
        onClose={mockOnClose}
        repos={mockRepos}
      />
    );
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should not render when repoId is null', () => {
    render(
      <RepoDetailsDialog
        open={true}
        repoId={null}
        onClose={mockOnClose}
        repos={mockRepos}
      />
    );
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should display repository name as title', () => {
    render(
      <RepoDetailsDialog
        open={true}
        repoId={123}
        onClose={mockOnClose}
        repos={mockRepos}
      />
    );
    
    expect(screen.getByText('test-owner/test-repo')).toBeInTheDocument();
  });

  it('should display repository description', () => {
    render(
      <RepoDetailsDialog
        open={true}
        repoId={123}
        onClose={mockOnClose}
        repos={mockRepos}
      />
    );
    
    expect(screen.getByText('A test repository for testing purposes')).toBeInTheDocument();
  });

  it('should display repository statistics', () => {
    render(
      <RepoDetailsDialog
        open={true}
        repoId={123}
        onClose={mockOnClose}
        repos={mockRepos}
      />
    );
    
    expect(screen.getByText('1000 stars')).toBeInTheDocument();
    expect(screen.getByText('500 watchers')).toBeInTheDocument();
    expect(screen.getByText('25 issues')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });
}); 