// Type Project (mocké pour les besoins de la démo)
type Project = {
  userId: string;
  name: string;
  category: string;
  mainImage: string;
  logo: string;
  headLine: string;
  description: string;
  website?: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
  status: string;
  supportedBy?: Community["name"][];
};

type ProjectToCreate = {
  userId: string;
  name: string;
  category: string;
  mainImage: string;
  logo: string;
  headLine: string;
  description: string;
  website?: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
  status: string;
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
