// GitHub repository data type - only includes properties actually used in the application
export interface GithubReposData {
  id: number
  name: string
  full_name: string
  description?: string
  url: string
  stargazers_count: number
  language: string | null
  watchers_count: number
  open_issues_count: number
  owner: {
    avatar_url: string
    html_url: string
  }
}

// Raw GitHub API response item type
export interface GithubApiItem {
  id: number
  html_url: string
  stargazers_count: number
  language: string | null
  name: string
  watchers_count: number
  open_issues_count: number
  description: string | null
  owner: {
    avatar_url: string
    html_url: string
  }
}

// GitHub API response structure
export interface GithubApiResponse {
  items: GithubApiItem[]
  total_count: number
  incomplete_results: boolean
}

// Repo info dialog state type
export interface RepoInfoState {
  id: number | null
  open: boolean
}

// Mock data structure
export interface GithubReposMock {
  items: GithubReposData[]
} 