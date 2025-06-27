export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
  githubUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  imageHint?: string;
};

export type Project = {
  id: string;
  name:string;
  creatorId: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  fundingGoal: number;
  currentFunding: number;
  backers: number;
  requiredSkills: string[];
  imageHint?: string;
};

export type Contribution = {
  id: string;
  projectId: string;
  backerId: string;
  amount: number;
  timestamp: string;
};
