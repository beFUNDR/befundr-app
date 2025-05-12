"use client";
import Image from "next/image";
import { MessageCircle, Heart } from "lucide-react";
import { useUser } from "@/hooks/dbData/useUser";

interface Props {
  update: Update;
  onClick?: () => void;
}

const UpdateCard = ({ update, onClick }: Props) => {
  const { data: user } = useUser(update.authorId);

  return (
    <div
      className="bg-custom-gray-900 rounded-2xl p-6 flex flex-col gap-2 border border-custom-gray-800 max-w-3xl mx-auto"
      onClick={onClick}
    >
      <div className="flex items-center gap-4 mb-1">
        {user && (
          <Image
            src={user?.avatar}
            alt={user?.name}
            width={48}
            height={48}
            className="rounded-full border border-gray-700"
          />
        )}
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-white leading-tight">
            {update.title}
          </span>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span className="font-semibold text-white">{user?.name}</span>
            <span>•</span>
            <span>
              {new Date(update.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
      <div className="bodyStyle mb-2">{update.message}</div>
      <div className="flex items-center gap-6 mt-2 text-gray-400 text-sm">
        <div className="flex items-center gap-1">
          <MessageCircle size={18} />
          <span>{update.commentsCount}</span>
        </div>
        <div className="flex items-center gap-1">
          <Heart size={18} />
          <span>{update.likesCount}</span>
        </div>
      </div>
    </div>
  );
};

export default UpdateCard;
