import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RepoCard from './RepoCard';
import { GithubReposData } from '../../types/repo';

describe('RepoCard Component', () => {
  const mockRepo: GithubReposData = {
    id: 1,
    name: 'test-repo',
    full_name: 'owner/test-repo',
    description: 'A test repository',
    clone_url: 'https://github.com/owner/test-repo.git',
    stargazers_count: 100,
    language: 'TypeScript',
    watchers_count: 50,
    open_issues_count: 10,
    owner: {
      avatar_url: 'https://via.placeholder.com/40',
      html_url: 'https://github.com/owner',
    },
  };

  const mockOnClick = vi.fn();

  it('should render repository information correctly', () => {
    render(<RepoCard repo={mockRepo} onClick={mockOnClick} />);
    
    expect(screen.getByText('owner/test-repo')).toBeInTheDocument();
    expect(screen.getByText('A test repository')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('should call onClick when View Details button is clicked', () => {
    render(<RepoCard repo={mockRepo} onClick={mockOnClick} />);
    
    const viewDetailsButton = screen.getByText('View Details');
    fireEvent.click(viewDetailsButton);
    
    expect(mockOnClick).toHaveBeenCalledWith(mockRepo);
  });

  it('should render clone button with correct URL', () => {
    render(<RepoCard repo={mockRepo} onClick={mockOnClick} />);
    
    const cloneButton = screen.getByText('Clone');
    expect(cloneButton).toHaveAttribute('href', mockRepo.clone_url);
    expect(cloneButton).toHaveAttribute('target', '_blank');
    expect(cloneButton).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should handle repository without description', () => {
    const repoWithoutDescription = { ...mockRepo, description: null };
    render(<RepoCard repo={repoWithoutDescription} onClick={mockOnClick} />);
    
    expect(screen.queryByText('A test repository')).not.toBeInTheDocument();
  });

  it('should handle repository without language', () => {
    const repoWithoutLanguage = { ...mockRepo, language: null };
    render(<RepoCard repo={repoWithoutLanguage} onClick={mockOnClick} />);
    
    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
  });

  it('should display owner information', () => {
    render(<RepoCard repo={mockRepo} onClick={mockOnClick} />);
    
    const avatar = screen.getByAltText(mockRepo.owner.html_url);
    expect(avatar).toHaveAttribute('src', mockRepo.owner.avatar_url);
  });
});
