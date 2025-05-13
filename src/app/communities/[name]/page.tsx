"use client";

import { useGetAllCollections } from "@/hooks/dbData/useCollection";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import InternetButton from "@/components/buttons/InternetButton";
import XButton from "@/components/buttons/XButton";
import DiscordButton from "@/components/buttons/DiscordButton";
import BackButton from "@/components/buttons/BackButton";
import TensorButton from "@/components/buttons/TensorButton";
import Loader from "@/components/displayElements/Loader";

const mockChartData = [
  { date: "1 jan", value: 0 },
  { date: "1 feb", value: 25000 },
  { date: "1 march", value: 95000 },
  { date: "1 april", value: 150000 },
  { date: "1 may", value: 250000 },
  { date: "1 june", value: 350000 },
];

const TABS = ["Dashboard", "Projects", "Leaderboard", "FAQs"];

const CommunityPage = () => {
  const params = useParams();
  const rawName = params.name as string;
  const decodedName = decodeURIComponent(rawName);
  const normalize = (str: string) =>
    str.trim().toLowerCase().replace(/\s+/g, " ");
  const { data: collections, isLoading } = useGetAllCollections();

  const collection = collections?.find(
    (collection) => normalize(collection.data.name) === normalize(decodedName)
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!collection) {
    return <div>Collection not found</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <BackButton />
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="flex-shrink-0">
          <Image
            src={collection.data.image}
            alt={collection.data.name}
            width={160}
            height={160}
            className="rounded-xl bg-custom-gray-900 border border-custom-gray-700"
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <h1 className="h2Style">{collection.data.name}</h1>
          <p className="bodyStyle">{collection.data.description}</p>
          {/* Stats mockées */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div>
              <div className="text-xl font-bold">USDC 350K</div>
              <div className="text-xs text-gray-400">
                Raised via contributions
              </div>
            </div>
            <div>
              <div className="text-xl font-bold">88%</div>
              <div className="text-xs text-gray-400">Success rate</div>
            </div>
            <div>
              <div className="text-xl font-bold">10</div>
              <div className="text-xs text-gray-400">Projects supported</div>
            </div>
            <div>
              <div className="text-xl font-bold">USDC 150</div>
              <div className="text-xs text-gray-400">Avg. contribution</div>
            </div>
            <div>
              <div className="text-xl font-bold">USDC 120K</div>
              <div className="text-xs text-gray-400">
                DAO grants distributed
              </div>
            </div>
            <div>
              <div className="text-xl font-bold">6 weeks</div>
              <div className="text-xs text-gray-400">Avg. project duration</div>
            </div>
            <div>
              <div className="text-xl font-bold">102</div>
              <div className="text-xs text-gray-400">Members on beFundr</div>
            </div>
          </div>
          {/* Réseaux sociaux mock */}
          <div className="flex flex-row gap-2 justify-start mb-2 mt-6">
            {collection.data.website && (
              <InternetButton href={collection.data.website} />
            )}
            {collection.data.twitter && (
              <XButton href={collection.data.twitter} />
            )}
            {collection.data.discord && (
              <DiscordButton href={collection.data.discord} />
            )}
            {collection.data.tensorLink && (
              <TensorButton href={collection.data.tensorLink} />
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}

      <div className="mt-8">
        <div className="flex flex-col md:flex-row md:items-end gap-8">
          <div>
            <div className="text-2xl font-bold mb-2">
              Total raised via contributions
            </div>
            <div className="text-3xl font-bold text-accent">USDC 350K</div>
          </div>
        </div>
        {/* Graphique */}
        <div className="w-full h-80 mt-8 bg-custom-gray-900 rounded-xl p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#f774e1"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
