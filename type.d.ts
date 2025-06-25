//TODO Remove this file once all the types are fully declared in their respective folders

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

type Update = {
  projectId: string;
  title: string;
  authorId: string;
  createdAt: string; // format: YYYY-MM-DD
  message: string;
  likesCount: string[]; // array of userIds
  edited?: string; // format: YYYY-MM-DD
};

type CreateProjectUpdateDto = {
  projectId: string;
  title: string;
  authorId: string;
  message: string;
};

type MissionApplicationStatus = "pending" | "accepted" | "rejected";

type MissionApplication = {
  missionId: string;
  userId: string;
  text: string;
  status: MissionApplicationStatus;
  createdAt: Date;
};

interface MissionToCreate {
  projectId: string;
  title: string;
  skill: string;
  description: string;
  isPaid: boolean;
}

type GameProgram = {
  points: number;
};
