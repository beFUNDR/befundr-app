"use client";
import Image from "next/image";
import { Heart, Pencil, Trash } from "lucide-react";
import { useUser } from "@/hooks/dbData/useUser";
import toast from "react-hot-toast";
import { useWallet } from "@solana/wallet-adapter-react";
import { useUpdate } from "@/hooks/dbData/useUpdate";
import { useMemo, useState } from "react";
import DeleteUpdateModal from "../modals/DeleteUpdateModal";
import EditUpdateModal from "../modals/EditUpdateModal";
import { formatDate } from "@/utils/utilsFunctions";

interface Props {
  update: Update;
  updateId: string;
  isOwner: boolean;
  onClick?: () => void;
}

const UpdateCard = ({ update, updateId, isOwner, onClick }: Props) => {
  const { useGetUser } = useUser();
  const { data: user } = useGetUser(update.authorId);
  const { publicKey } = useWallet();
  const { useLikeUpdate } = useUpdate();
  const { mutateAsync: likeUpdate, isPending: isLiking } = useLikeUpdate;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleLike = async (updateId: string) => {
    if (!publicKey) {
      toast.error("Please connect your wallet to like an update");
      return;
    }
    try {
      await likeUpdate({
        updateId: updateId,
        projectId: update.projectId,
        userId: publicKey?.toString() || "",
      });
    } catch (err: any) {
      toast.error("Error liking update");
    }
  };

  const isLiked = useMemo(
    () => update.likesCount.includes(publicKey?.toString() || ""),
    [update.likesCount, publicKey]
  );

  return (
    <div
      className="bg-custom-gray-900 rounded-2xl p-6 flex flex-col gap-2 border border-custom-gray-800 w-full md:w-3xl mx-auto"
      onClick={onClick}
    >
      <div className="flex items-center gap-4 mb-1">
        {user && (
          <Image
            src={user?.data.avatar}
            alt={user?.data.name}
            width={48}
            height={48}
            className="rounded-full border border-gray-700"
          />
        )}
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between gap-2 w-full">
            <span className="text-2xl font-bold text-white leading-tight">
              {update.title}
            </span>
            {isOwner && (
              <div className="flex items-center gap-4">
                <button
                  className="text-gray-400 text-sm hover:text-white transition-colors duration-300"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <Pencil size={18} />
                </button>
                <button
                  className="text-gray-400 text-sm hover:text-red-500 transition-colors duration-300"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  <Trash size={18} />
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span className="font-semibold text-white">{user?.data.name}</span>
            <span>•</span>
            <span>
              {formatDate(update.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {update.edited && (
              <>
                <span>•</span>
                <span>
                  Edited on{" "}
                  {formatDate(update.edited).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="bodyStyle mb-2 whitespace-pre-line">{update.message}</div>
      <div className="flex items-center gap-6 mt-2 text-gray-400 text-sm">
        <button
          className="flex items-center gap-1"
          onClick={(e) => {
            e.stopPropagation();
            handleLike(updateId);
          }}
        >
          <Heart size={18} color="white" fill={isLiked ? "red" : ""} />
          <span>{update.likesCount.length}</span>
        </button>
      </div>
      {isDeleteModalOpen && (
        <DeleteUpdateModal
          updateId={updateId}
          projectId={update.projectId}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
      {isEditModalOpen && (
        <EditUpdateModal
          updateId={updateId}
          update={update}
          projectId={update.projectId}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UpdateCard;
