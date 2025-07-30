import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { RepoDetailsDialog } from './RepoDetailsDialog';
import { mockRepos, mockRepoInfoOpen } from '../mocks';
import { mockSetRepoInfoOpen } from '../test-mocks';

describe('RepoDetailsDialog Component', () => {
  it('should render without crashing', () => {
    render(
      <RepoDetailsDialog
        repoInfoOpen={mockRepoInfoOpen}
        setRepoInfoOpen={mockSetRepoInfoOpen}
        githubReposData={mockRepos}
      />
    );
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should call setRepoInfoOpen when close button is clicked', () => {
    render(
      <RepoDetailsDialog
        repoInfoOpen={mockRepoInfoOpen}
        setRepoInfoOpen={mockSetRepoInfoOpen}
        githubReposData={mockRepos}
      />
    );
    
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    
    expect(mockSetRepoInfoOpen).toHaveBeenCalledWith({ id: null, open: false });
  });

  it('should not render when repoInfoOpen.open is false', () => {
    const closedRepoInfo = {
      id: 1,
      open: false
    };

    render(
      <RepoDetailsDialog
        repoInfoOpen={closedRepoInfo}
        setRepoInfoOpen={mockSetRepoInfoOpen}
        githubReposData={mockRepos}
      />
    );
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
}); 