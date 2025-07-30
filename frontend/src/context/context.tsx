import { createContext } from "react"

export interface GithubReposData {
  id?: number
  name: string
  full_name: string
  description?: string
  url: string
  git_url: string
  has_issues: boolean
  stargazers_count: number
  language: string | null
  watchers_count: number
  open_issues_count: number
  owner: {
    avatar_url: string
    html_url: string
  }
}

export interface GithubReposContextType {
  githubReposData: GithubReposData[]
  setGithubReposData: React.Dispatch<React.SetStateAction<GithubReposData[]>>
}

export const GithubReposContext = createContext<GithubReposContextType>({
  githubReposData: [],
  setGithubReposData: () => {},
})