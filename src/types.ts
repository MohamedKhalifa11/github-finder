export type GitHubUser = {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  url: string;
  html_url: string;
  bio?: string;
  followers: number;
  following: number;
  created_at: string;
};
