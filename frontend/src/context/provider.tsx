import { ReactNode, useState } from "react"
import { GithubReposContext, GithubReposData } from "./context"

interface GithubProviderProps {
  children: ReactNode
}

export const GithubProvider = ({ children }: GithubProviderProps) => {
  const [githubReposData, setGithubReposData] = useState<GithubReposData[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const value = {
    githubReposData,
    setGithubReposData,
    loading,
    setLoading,
  }

  return (
    <GithubReposContext.Provider value={value}>
      {children}
    </GithubReposContext.Provider>
  )
}
