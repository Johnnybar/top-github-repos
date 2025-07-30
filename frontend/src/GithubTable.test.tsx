import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect } from 'vitest';
import { GithubTable } from './GithubTable';
import { mockRepoDetailsDialog, mockFetchGithubRepos } from './mocks';

// Mock the RepoDetailsDialog component
vi.mock('./RepoDetailsDialog', () => ({
  RepoDetailsDialog: ({ repoInfoOpen, setRepoInfoOpen, githubReposData }: any) => {
    return mockRepoDetailsDialog({ repoInfoOpen, setRepoInfoOpen, githubReposData });
  }
}));

// Mock the API
vi.mock('./api', () => ({
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

describe('GithubTable Component', () => {
  const TestWrapper = createTestWrapper();

  it('should render without crashing', () => {
    render(<GithubTable />, { wrapper: TestWrapper });
    expect(screen.getByTestId('repo-details-dialog')).toBeInTheDocument();
  });

  it('should handle search input changes', () => {
    render(<GithubTable />, { wrapper: TestWrapper });
    
    const searchInput = screen.getByPlaceholderText('Search repositories...');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    
    expect(searchInput).toHaveValue('test');
  });

  it('should handle starred filter toggle', () => {
    render(<GithubTable />, { wrapper: TestWrapper });
    
    const starredButton = screen.getByText('Show Starred');
    fireEvent.click(starredButton);
    
    expect(screen.getByText('Show All')).toBeInTheDocument();
  });
}); 