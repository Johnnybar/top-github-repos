
import { GithubReposMock, GithubReposData, RepoInfoState } from "./types";
import { vi } from 'vitest';

export const githubReposMock: GithubReposMock = {
    "items": [
      {
          "id": 78483432,
          "full_name": "TranslucentTB/TranslucentTB",
          "url": "https://api.github.com/repos/TranslucentTB/TranslucentTB",
          "stargazers_count": 17590,
          "language": "C++",
          "name": "TranslucentTB",
          "watchers_count": 17590,
          "open_issues_count": 249,
          "owner": {
              "avatar_url": "https://avatars.githubusercontent.com/u/25557326?v=4",
              "html_url": "https://github.com/TranslucentTB"
          },
          "description": "A lightweight, customizable, and transparent theme for Windows Taskbar"
      },
      {
          "id": 78544867,
          "full_name": "opendigg/awesome-github-wechat-weapp",
          "url": "https://api.github.com/repos/opendigg/awesome-github-wechat-weapp",
          "stargazers_count": 9271,
          "language": null,
          "name": "awesome-github-wechat-weapp",
          "watchers_count": 9271,
          "open_issues_count": 11,
          "owner": {
              "avatar_url": "https://avatars.githubusercontent.com/u/23257329?v=4",
              "html_url": "https://github.com/opendigg"
          },
          "description": "收集、发现、分享 GitHub 上高质量的微信小程序开发资源、实战经验、优秀案例、入门进阶教程等"
      },
      {
          "id": 78544867,
          "full_name": "opendigg/awesome-github-wechat-weapp",
          "url": "https://api.github.com/repos/opendigg/awesome-github-wechat-weapp",
          "stargazers_count": 9271,
          "language": null,
          "name": "awesome-github-wechat-weapp",
          "watchers_count": 9271,
          "open_issues_count": 11,
          "owner": {
              "avatar_url": "https://avatars.githubusercontent.com/u/23257329?v=4",
              "html_url": "https://github.com/opendigg"
          },
          "description": "收集、发现、分享 GitHub 上高质量的微信小程序开发资源、实战经验、优秀案例、入门进阶教程等"
      },
      {
          "id": 78494737,
          "full_name": "Meituan-Dianping/walle",
          "url": "https://api.github.com/repos/Meituan-Dianping/walle",
          "stargazers_count": 6838,
          "language": "Java",
          "name": "walle",
          "watchers_count": 6838,
          "open_issues_count": 108,
          "owner": {
              "avatar_url": "https://avatars.githubusercontent.com/u/20238146?v=4",
              "html_url": "https://github.com/Meituan-Dianping"
          },
          "description": "美团外卖 Android 客户端 - 美团外卖 Android 客户端，覆盖 Android 9.0 以上系统，支持 Android 10.0 以上系统"
      },
      {
          "id": 78566876,
          "full_name": "prettier/prettier-vscode",
          "url": "https://api.github.com/repos/prettier/prettier-vscode",
          "stargazers_count": 5321,
          "language": "TypeScript",
          "name": "prettier-vscode",
          "watchers_count": 5321,
          "open_issues_count": 94,
          "owner": {
              "avatar_url": "https://avatars.githubusercontent.com/u/25822731?v=4",
              "html_url": "https://github.com/prettier"
          },
          "description": "VS Code 的 Prettier 插件"
      },
      {
          "id": 78492853,
          "full_name": "wux-weapp/wux-weapp",
          "url": "https://api.github.com/repos/wux-weapp/wux-weapp",
          "stargazers_count": 5067,
          "language": "JavaScript",
          "name": "wux-weapp",
          "watchers_count": 5067,
          "open_issues_count": 30,
          "owner": {
              "avatar_url": "https://avatars.githubusercontent.com/u/40567621?v=4",
              "html_url": "https://github.com/wux-weapp"
          },
          "description": "A UI library for WeChat Mini Programs"
      },
      {
          "id": 78498440,
          "full_name": "lando/lando",
          "url": "https://api.github.com/repos/lando/lando",
          "stargazers_count": 4180,
          "language": null,
          "name": "lando",
          "watchers_count": 4180,
          "open_issues_count": 161,
          "owner": {
              "avatar_url": "https://avatars.githubusercontent.com/u/31605584?v=4",
              "html_url": "https://github.com/lando"
          },
          "description": "A local development environment for Node.js"
      },
      {
          "id": 78546446,
          "full_name": "Blankj/awesome-comment",
          "url": "https://api.github.com/repos/Blankj/awesome-comment",
          "stargazers_count": 2528,
          "language": null,
          "name": "awesome-comment",
          "watchers_count": 2528,
          "open_issues_count": 15,
          "owner": {
              "avatar_url": "https://avatars.githubusercontent.com/u/17978187?v=4",
              "html_url": "https://github.com/Blankj"
          },
          "description": "A collection of awesome comment styles"
      },
      {
          "id": 78508757,
          "full_name": "SeanNaren/deepspeech.pytorch",
          "url": "https://api.github.com/repos/SeanNaren/deepspeech.pytorch",
          "stargazers_count": 2127,
          "language": "Python",
          "name": "deepspeech.pytorch",
          "watchers_count": 2127,
          "open_issues_count": 5,
          "owner": {
              "avatar_url": "https://avatars.githubusercontent.com/u/6707363?v=4",
              "html_url": "https://github.com/SeanNaren"
          },
          "description": "DeepSpeech PyTorch implementation"
      },
      {
          "id": 78494786,
          "full_name": "ermongroup/cs228-notes",
          "url": "https://api.github.com/repos/ermongroup/cs228-notes",
          "stargazers_count": 1965,
          "language": "SCSS",
          "name": "cs228-notes",
          "watchers_count": 1965,
          "open_issues_count": 13,
          "owner": {
              "avatar_url": "https://avatars.githubusercontent.com/u/13688605?v=4",
              "html_url": "https://github.com/ermongroup"
          },
          "description": "CS228 Notes"
      },
      {
          "id": 78570728,
          "full_name": "PokemonUnity/PokemonUnity",
          "url": "https://api.github.com/repos/PokemonUnity/PokemonUnity",
          "stargazers_count": 1881,
          "language": "C#",
          "name": "PokemonUnity",
          "watchers_count": 1881,
          "open_issues_count": 10,
          "owner": {
              "avatar_url": "https://avatars.githubusercontent.com/u/31811577?v=4",
              "html_url": "https://github.com/PokemonUnity"
          },
          "description": "Pokemon Unity"
      }
  ]
}

// Test mocks for components
export const mockGithubTable = () => <div data-testid="github-table">GithubTable Component</div>;

export const mockRepoDetailsDialog = ({ repoInfoOpen, setRepoInfoOpen, githubReposData }: any) => (
  <div data-testid="repo-details-dialog">
    RepoDetailsDialog Component
  </div>
);

export const mockFetchGithubRepos = vi.fn().mockResolvedValue(githubReposMock);

// Test data for API tests
export const mockApiResponse = {
  items: [
    {
      id: 123,
      html_url: 'https://github.com/test-owner/test-repo',
      stargazers_count: 100,
      language: 'JavaScript',
      name: 'test-repo',
      watchers_count: 50,
      open_issues_count: 5,
      description: 'A test repository',
      owner: {
        avatar_url: 'https://example.com/avatar.jpg',
        html_url: 'https://github.com/test-owner'
      }
    }
  ],
  total_count: 1,
  incomplete_results: false
};

// Mock data for RepoDetailsDialog tests
export const mockRepos: GithubReposData[] = [
  {
    id: 1,
    name: 'test-repo',
    full_name: 'test-owner/test-repo',
    description: 'A test repository',
    url: 'https://github.com/test-owner/test-repo',
    language: 'JavaScript',
    stargazers_count: 100,
    watchers_count: 50,
    open_issues_count: 5,
    owner: {
      avatar_url: 'https://example.com/avatar.jpg',
      html_url: 'https://github.com/test-owner'
    }
  }
];

export const mockRepoInfoOpen: RepoInfoState = {
  id: 1,
  open: true
};

export const mockSetRepoInfoOpen = vi.fn();

