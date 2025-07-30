import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect } from 'vitest';
import App from './App';
import { mockGithubTable } from '../mocks';

// Mock the GithubTable component
vi.mock('./GithubTable', () => ({
  GithubTable: () => {
    return mockGithubTable();
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

describe('App Component', () => {
  const TestWrapper = createTestWrapper();

  it('should render without crashing', () => {
    render(<App />, { wrapper: TestWrapper });
    expect(screen.getByTestId('github-table')).toBeInTheDocument();
  });
}); 