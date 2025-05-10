/**
 * LOCAL DATA
 *
 * Only for testing purposes
 */
export const user = {
  name: "Jérôme",
  address: "0xA3F9...10A1B3",
  avatar: "/images/avatar.png", // Replace with actual path
};

const mockProject: Project = {
  id: "1",
  name: "beFUNDR",
  description: "The decentralized incubator",
  image: "/images/projects/befundr_image.png",
  logo: "/images/projects/befundr_logo.png",
  fundingStatus: "Funding",
  fundingPercent: 50,
  daysLeft: 25,
  backers: 120,
  supportedBy: "monke",
  tags: ["Community", "Product", "AI"],
};

export const projects = [
  mockProject,
  mockProject,
  mockProject,
  mockProject,
  mockProject,
  mockProject,
];

export const communities = [
  {
    name: "Monke",
    logo: "/images/communities/monke.png",
    description: "The monke community",
  },
  {
    name: "Superteam",
    logo: "/images/communities/superteam.png",
    description: "The superteam community",
  },
  {
    name: "Gecko",
    logo: "/images/communities/gecko.png",
    description: "The gecko community",
  },
];

export const partners = [
  {
    name: "Collaterize",
    logo: "/images/partners/collaterize.png",
    description: "The leading tokenization platform.",
  },
  {
    name: "Konn3ct",
    logo: "/images/partners/konnect.jpg",
    description: "Your web3 community from URL to IRL",
  },
];
