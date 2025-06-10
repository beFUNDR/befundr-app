// Type Project (mocké pour les besoins de la démo)
type Project = {
  userId: string;
  name: string;
  category: string;
  mainImage: string;
  logo: string;
  images: string[];
  headLine: string;
  description: string;
  pitchLink?: string;
  videoLink?: string;
  otherLink?: string;
  website?: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
  status: string;
  supportedBy?: string[];
  id: PublicKey;
};

type ProjectToCreate = {
  userId: string;
  name: string;
  category: string;
  mainImage: string;
  logo: string;
  images: string[];
  headLine: string;
  description: string;
  pitchLink?: string;
  videoLink?: string;
  otherLink?: string;
  website?: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
  status: string;
  project_counter?: BN;
};

type UpdateProjectParams = {
  userId: string;
  name: string;
  category: string;
  mainImage: string;
  logo: string;
  headLine: string;
  description: string;
  website: string;
  twitter: string;
  discord: string;
  telegram: string;
  status: string;
  project_counter: BN;
  id: PublicKey;
};

type Collection = {
  name: string;
  image: string;
  description: string;
  address: string;
  tensorLink: string;
  website: string;
  twitter: string;
  discord: string;
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
  skills: string[];
  isCompleteProfil: boolean;
};

type Update = {
  title: string;
  authorId: string;
  date: string; // format: YYYY-MM-DD
  message: string;
  commentsCount: number;
  likesCount: number;
};

type Mission = {
  title: string;
  skill: string;
  projectId: string;
  description: string;
  isPaid: boolean;
  status: "open" | "onGoing" | "done" | "cancelled";
  createdAt: Date;
  doneBy?: string;
};

interface MissionToCreate {
  projectId: string;
  title: string;
  skill: string;
  description: string;
  isPaid: boolean;
  doneByUserId?: string;
}

type GameProgram = {
  points: number;
};
