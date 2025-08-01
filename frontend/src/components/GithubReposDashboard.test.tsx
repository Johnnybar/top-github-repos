import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect } from 'vitest';
import { GithubReposDashboard } from './GithubReposDashboard';
import { mockRepoDetailsDialog } from '../mocks';
import { mockFetchGithubRepos } from '../test-mocks';

// Mock the RepoDetailsDialog component
vi.mock('./RepoDetailsDialog', () => ({
  RepoDetailsDialog: ({ repoInfoOpen, setRepoInfoOpen, githubReposData }: any) => {
    return mockRepoDetailsDialog({ repoInfoOpen, setRepoInfoOpen, githubReposData });
  }
}));

// Mock the API service
vi.mock('../services/api', () => ({
  fetchGithubRepos: () => {
    return mockFetchGithubRepos();
  }
}));

// Create a wrapper with QueryClient for testing
const createTestWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('GithubReposDashboard Component', () => {
  const TestWrapper = createTestWrapper();

  it('should render without crashing', () => {
    render(<GithubReposDashboard />, { wrapper: TestWrapper });
    expect(screen.getByTestId('repo-details-dialog')).toBeInTheDocument();
  });

  it('should handle starred filter toggle', () => {
    render(<GithubReposDashboard />, { wrapper: TestWrapper });
    
    const starredButton = screen.getByText('Show Starred');
    fireEvent.click(starredButton);
    
    expect(screen.getByText('Show All')).toBeInTheDocument();
  });
}); 