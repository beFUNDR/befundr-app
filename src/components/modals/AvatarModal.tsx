"use client";
import ModalLayout from "./_ModalLayout";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  useGetUser,
  useUpdateUser,
  useGetUserAssets,
} from "@/features/users/hooks/useUser";
import Loader from "../displayElements/Loader";
import NftCard from "../cards/NftCard";
import Link from "next/link";

type Props = {
  onClose: () => void;
};

const AvatarModal = (props: Props) => {
  const { publicKey } = useWallet();
  const { data, isLoading, error } = useGetUserAssets(publicKey?.toString());
  const { data: userData } = useGetUser(publicKey?.toString() ?? "");
  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUser();

  const handleSelectAvatar = async (image: string) => {
    if (!publicKey || !userData) return;
    await updateUser({ ...userData.data, avatar: image });
    props.onClose();
  };

  return (
    <ModalLayout item="start" justify="center" onClose={props.onClose}>
      {isLoading && (
        <>
          <Loader />
        </>
      )}
      {error && <div>Erreur lors du chargement des assets</div>}
      {data && data.result.items.length > 0 && (
        <>
          <p className="h3Style">Eligible collections:</p>
          <p className="bodyStyle">
            Selection the nft you want to use as profile picture:
          </p>
          <div className="grid grid-cols-5 gap-8 justify-center items-start justify-items-start w-full">
            {data.result.items.map((item: any) => (
              <div
                key={item.id}
                onClick={() => handleSelectAvatar(item.content.links.image)}
              >
                <NftCard
                  image={item.content.links.image}
                  name={item.content.metadata.name}
                />
              </div>
            ))}
          </div>
        </>
      )}
      {data && data.result.items.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 h-full w-full">
          <p className="h3Style mb-6">No assets found</p>
          <p className="bodyStyle">
            You don’t own any NFTs from our whitelisted partner collections.
          </p>
          <p className="bodyStyle">
            You’ll keep this default avatar until you hold an eligible asset.
          </p>
          <p className="bodyStyle">
            But no worries — you can still enjoy the full beFUNDR experience!
          </p>
          <Link
            href="/communities"
            className="text-accent underline font-semibold text-base my-6 w-fit"
          >
            Discover the communities →
          </Link>
        </div>
      )}
    </ModalLayout>
  );
};

export default AvatarModal;
