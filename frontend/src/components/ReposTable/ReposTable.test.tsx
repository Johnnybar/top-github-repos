import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ReposTable from "./ReposTable";
import { GithubReposData } from "../../types/repo";

// Mock DataGrid to avoid complex rendering issues in tests
vi.mock("@mui/x-data-grid", () => ({
  DataGrid: ({ rows, onRowClick }: any) => (
    <div data-testid="data-grid">
      {rows.map((repo: GithubReposData) => (
        <div key={repo.id || repo.name} onClick={() => onRowClick({ row: repo })}>
          <div>{repo.name}</div>
          <div>{repo.description}</div>
          <div>{repo.language}</div>
          <div>{repo.stargazers_count}</div>
          <div>{repo.watchers_count}</div>
          <div>{repo.open_issues_count}</div>
          <div>{repo.clone_url}</div>
        </div>
      ))}
    </div>
  ),
}));

// Mock data for testing
const mockRepos: GithubReposData[] = [
  {
    id: 1,
    name: "test-repo-1",
    description: "A test repository",
    clone_url: "https://github.com/test/repo1.git",
    stargazers_count: 1000,
    language: "JavaScript",
    watchers_count: 100,
    open_issues_count: 10,
    owner: {
      avatar_url: "https://example.com/avatar1.jpg",
      html_url: "https://github.com/test",
    },
  },
  {
    id: 2,
    name: "test-repo-2",
    description: "Another test repository",
    clone_url: "https://github.com/test/repo2.git",
    stargazers_count: 500,
    language: "TypeScript",
    watchers_count: 50,
    open_issues_count: 5,
    owner: {
      avatar_url: "https://example.com/avatar2.jpg",
      html_url: "https://github.com/test",
    },
  },
];

const mockSortConfig = {
  field: "stars" as const,
  direction: "desc" as const,
};

const mockOnSort = vi.fn();
const mockOnRepoClick = vi.fn();

describe("ReposTable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders DataGrid with repository data", () => {
    render(
      <ReposTable
        repos={mockRepos}
        sortConfig={mockSortConfig}
        onSort={mockOnSort}
        onRepoClick={mockOnRepoClick}
      />
    );

    expect(screen.getByTestId("data-grid")).toBeInTheDocument();
    expect(screen.getByText("test-repo-1")).toBeInTheDocument();
    expect(screen.getByText("test-repo-2")).toBeInTheDocument();
  });

  it("displays repository information correctly", () => {
    render(
      <ReposTable
        repos={mockRepos}
        sortConfig={mockSortConfig}
        onSort={mockOnSort}
        onRepoClick={mockOnRepoClick}
      />
    );

    // Check if descriptions are displayed
    expect(screen.getByText("A test repository")).toBeInTheDocument();
    expect(screen.getByText("Another test repository")).toBeInTheDocument();

    // Check if languages are displayed
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();

    // Check if clone URLs are displayed
    expect(screen.getByText("https://github.com/test/repo1.git")).toBeInTheDocument();
    expect(screen.getByText("https://github.com/test/repo2.git")).toBeInTheDocument();
  });



  it("calls onRepoClick when repository row is clicked", () => {
    render(
      <ReposTable
        repos={mockRepos}
        sortConfig={mockSortConfig}
        onSort={mockOnSort}
        onRepoClick={mockOnRepoClick}
      />
    );

    // Click on first repository row
    fireEvent.click(screen.getByText("test-repo-1"));
    expect(mockOnRepoClick).toHaveBeenCalledWith(mockRepos[0]);

    // Click on second repository row
    fireEvent.click(screen.getByText("test-repo-2"));
    expect(mockOnRepoClick).toHaveBeenCalledWith(mockRepos[1]);
  });

  it("handles repositories without language", () => {
    const reposWithoutLanguage: GithubReposData[] = [
      {
        ...mockRepos[0],
        language: null,
      },
    ];

    render(
      <ReposTable
        repos={reposWithoutLanguage}
        sortConfig={mockSortConfig}
        onSort={mockOnSort}
        onRepoClick={mockOnRepoClick}
      />
    );

    expect(screen.getByText("test-repo-1")).toBeInTheDocument();
  });

  it("handles repositories without description", () => {
    const reposWithoutDescription: GithubReposData[] = [
      {
        ...mockRepos[0],
        description: null,
      },
    ];

    render(
      <ReposTable
        repos={reposWithoutDescription}
        sortConfig={mockSortConfig}
        onSort={mockOnSort}
        onRepoClick={mockOnRepoClick}
      />
    );

    // Should still display the repository name
    expect(screen.getByText("test-repo-1")).toBeInTheDocument();
    // Should not display description
    expect(screen.queryByText("A test repository")).not.toBeInTheDocument();
  });
});
