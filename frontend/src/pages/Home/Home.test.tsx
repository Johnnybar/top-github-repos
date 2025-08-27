import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './Home';
import { GithubReposData } from '../../types/repo';

vi.mock('../../hooks/useGithubRepos');
vi.mock('../../hooks/useSortRepos');

const mockUseGithubRepos = vi.mocked(await import('../../hooks/useGithubRepos')).useGithubRepos;
const mockUseSortRepos = vi.mocked(await import('../../hooks/useSortRepos')).default;

describe('Home Page', () => {
  let queryClient: QueryClient;

  const mockRepos: GithubReposData[] = [
    {
      id: 1,
      name: 'test-repo-1',
      description: 'First test repository',
      clone_url: 'https://github.com/owner/repo-1.git',
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
      name: 'test-repo-2',
      description: 'Second test repository',
      clone_url: 'https://github.com/owner/repo-2.git',
      stargazers_count: 200,
      language: 'JavaScript',
      watchers_count: 100,
      open_issues_count: 10,
      owner: {
        avatar_url: 'https://via.placeholder.com/40',
        html_url: 'https://github.com/owner',
      },
    },
  ];

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });

    // Reset mocks
    vi.clearAllMocks();
  });

  it('should render the home page with title and description', () => {
    mockUseGithubRepos.mockReturnValue({
      data: { items: mockRepos },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    mockUseSortRepos.mockReturnValue({
      sortedRepos: mockRepos,
      sortConfig: { field: 'stars', direction: 'desc' },
      filterLanguage: '',
      handleSort: vi.fn(),
      handleLanguageFilter: vi.fn(),
      clearFilters: vi.fn(),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    expect(screen.getByText('Top GitHub Repositories')).toBeInTheDocument();
    expect(screen.getByText('Discover the most popular repositories on GitHub')).toBeInTheDocument();
  });

  it('should show initial state with search prompt when no search criteria', () => {
    mockUseGithubRepos.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    mockUseSortRepos.mockReturnValue({
      sortedRepos: [],
      sortConfig: { field: 'stars', direction: 'desc' },
      filterLanguage: '',
      handleSort: vi.fn(),
      handleLanguageFilter: vi.fn(),
      clearFilters: vi.fn(),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    expect(screen.getByText('Top GitHub Repositories')).toBeInTheDocument();
    expect(screen.getByText('Discover the most popular repositories on GitHub')).toBeInTheDocument();
  });

  it('should show loading state when fetching data', () => {
    mockUseGithubRepos.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      refetch: vi.fn(),
    });

    mockUseSortRepos.mockReturnValue({
      sortedRepos: [],
      sortConfig: { field: 'stars', direction: 'desc' },
      filterLanguage: '',
      handleSort: vi.fn(),
      handleLanguageFilter: vi.fn(),
      clearFilters: vi.fn(),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    expect(screen.getByText('Loading repositories...')).toBeInTheDocument();
  });

  it('should show repositories when data is loaded', () => {
    mockUseGithubRepos.mockReturnValue({
      data: { items: mockRepos, total_count: 2, incomplete_results: false },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    } as any);

    mockUseSortRepos.mockReturnValue({
      sortedRepos: mockRepos,
      sortConfig: { field: 'stars', direction: 'desc' },
      filterLanguage: 'TypeScript',
      handleSort: vi.fn(),
      handleLanguageFilter: vi.fn(),
      clearFilters: vi.fn(),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    expect(screen.getByText('test-repo-1')).toBeInTheDocument();
    expect(screen.getByText('test-repo-2')).toBeInTheDocument();
  });

  it('should show error message when API call fails', () => {
    const mockError = new Error('Failed to fetch repositories');
    mockUseGithubRepos.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: mockError,
      refetch: vi.fn(),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    expect(screen.getByText('Error loading repositories: Failed to fetch repositories')).toBeInTheDocument();
  });

  it('should show no results message when search returns empty', () => {
    mockUseGithubRepos.mockReturnValue({
      data: { items: [] },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    mockUseSortRepos.mockReturnValue({
      sortedRepos: [],
      sortConfig: { field: 'stars', direction: 'desc' },
      filterLanguage: 'TypeScript',
      handleSort: vi.fn(),
      handleLanguageFilter: vi.fn(),
      clearFilters: vi.fn(),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    expect(screen.getByText('No repositories found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your search criteria or language filter')).toBeInTheDocument();
  });

  it('should render view toggle buttons', () => {
    mockUseGithubRepos.mockReturnValue({
      data: { items: mockRepos },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    mockUseSortRepos.mockReturnValue({
      sortedRepos: mockRepos,
      sortConfig: { field: 'stars', direction: 'desc' },
      filterLanguage: '',
      handleSort: vi.fn(),
      handleLanguageFilter: vi.fn(),
      clearFilters: vi.fn(),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    expect(screen.getByLabelText('grid view')).toBeInTheDocument();
    expect(screen.getByLabelText('table view')).toBeInTheDocument();
  });

  it('should switch between grid and table view', async () => {
    mockUseGithubRepos.mockReturnValue({
      data: { items: mockRepos },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    mockUseSortRepos.mockReturnValue({
      sortedRepos: mockRepos,
      sortConfig: { field: 'stars', direction: 'desc' },
      filterLanguage: '',
      handleSort: vi.fn(),
      handleLanguageFilter: vi.fn(),
      clearFilters: vi.fn(),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    // Initially should show grid view
    expect(screen.getByText('test-repo-1')).toBeInTheDocument();
    expect(screen.getByText('test-repo-2')).toBeInTheDocument();

    // Switch to table view
    const tableButton = screen.getByLabelText('table view');
    fireEvent.click(tableButton);

    // Should still show repositories but in table format
    expect(screen.getByText('test-repo-1')).toBeInTheDocument();
    expect(screen.getByText('test-repo-2')).toBeInTheDocument();
  });
});
