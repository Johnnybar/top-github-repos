// GitHub repository data type - only includes properties actually used in the application
export interface GithubReposData {
  id: number
  name: string
  full_name: string
  description?: string
  clone_url: string
  stargazers_count: number
  language: string | null
  watchers_count: number
  open_issues_count: number
  owner: {
    avatar_url: string
    html_url: string
  }
}

// GitHub API response wrapper type
export interface GithubApiResponse {
  items: GithubReposData[]
  total_count: number
  incomplete_results: boolean
}

// State management types
export interface RepoInfoState {
  id: number | null
  open: boolean
}

// Mock data type for testing
export interface GithubReposMock {
  items: GithubReposData[]
} 