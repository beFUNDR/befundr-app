// Type Project (mocké pour les besoins de la démo)
type Project = {
  id: string;
  name: string;
  description: string;
  image: string;
  logo: string;
  fundingStatus?: string;
  fundingPercent?: number;
  daysLeft?: number;
  backers?: number;
  supportedBy?: Community["name"];
  tags?: string[];
};

type Community = {
  name: string;
  logo: string;
  description: string;
};

type Partner = {
  name: string;
  logo: string;
  description: string;
};

type User = {
  wallet: string;
  name: string;
  avatar: string;
  bio: string;
  telegram: string;
  twitter: string;
  website: string;
  discord: string;
};
