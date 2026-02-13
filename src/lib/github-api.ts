/**
 * GitHub API Service for DB-less content persistence
 * Allows admin panel to commit content changes directly to the repository
 */

export interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
  branch: string;
}

export interface CommitFileOptions {
  path: string;
  content: string;
  message: string;
  branch?: string;
}

export interface CommitResult {
  success: boolean;
  sha?: string;
  url?: string;
  error?: string;
}

/**
 * GitHub API client for content management
 */
export class GitHubAPIClient {
  private config: GitHubConfig;
  private baseUrl = 'https://api.github.com';

  constructor(config: GitHubConfig) {
    this.config = config;
  }

  /**
   * Get the current SHA of a file
   */
  private async getFileSHA(path: string): Promise<string | null> {
    try {
      const url = `${this.baseUrl}/repos/${this.config.owner}/${this.config.repo}/contents/${path}?ref=${this.config.branch}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.config.token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.sha;
      }
      return null;
    } catch (error) {
      console.error('Error getting file SHA:', error);
      return null;
    }
  }

  /**
   * Commit a file to the repository
   */
  async commitFile(options: CommitFileOptions): Promise<CommitResult> {
    try {
      const { path, content, message, branch = this.config.branch } = options;

      // Get current file SHA if it exists
      const sha = await this.getFileSHA(path);

      // Encode content to base64
      const encodedContent = btoa(unescape(encodeURIComponent(content)));

      const url = `${this.baseUrl}/repos/${this.config.owner}/${this.config.repo}/contents/${path}`;
      const body: any = {
        message,
        content: encodedContent,
        branch,
      };

      // Include SHA if file exists (for updates)
      if (sha) {
        body.sha = sha;
      }

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.config.token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.message || 'Failed to commit file',
        };
      }

      const data = await response.json();
      return {
        success: true,
        sha: data.content.sha,
        url: data.content.html_url,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Commit portfolio content to the repository
   */
  async commitPortfolioContent(content: any, message: string = 'Update portfolio content'): Promise<CommitResult> {
    const jsonContent = JSON.stringify(content, null, 2);
    return this.commitFile({
      path: 'src/data/content.json',
      content: jsonContent,
      message,
    });
  }

  /**
   * Test GitHub API connection
   */
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      const url = `${this.baseUrl}/repos/${this.config.owner}/${this.config.repo}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.config.token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.message || 'Failed to connect to GitHub',
        };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}

/**
 * Get GitHub configuration from localStorage
 */
export function getGitHubConfig(): GitHubConfig | null {
  try {
    const config = localStorage.getItem('github_config');
    if (!config) return null;
    return JSON.parse(config);
  } catch {
    return null;
  }
}

/**
 * Save GitHub configuration to localStorage
 */
export function saveGitHubConfig(config: GitHubConfig): void {
  localStorage.setItem('github_config', JSON.stringify(config));
}

/**
 * Clear GitHub configuration from localStorage
 */
export function clearGitHubConfig(): void {
  localStorage.removeItem('github_config');
}

/**
 * Create a GitHub API client from stored configuration
 */
export function createGitHubClient(): GitHubAPIClient | null {
  const config = getGitHubConfig();
  if (!config) return null;
  return new GitHubAPIClient(config);
}
