"use client";
import ModalLayout from "./_ModalLayout";
import { useWallet } from "@solana/wallet-adapter-react";
import { useUser, useUserAssets } from "@/hooks/dbData/useUser";
import Loader from "../displayElements/Loader";
import NftCard from "../cards/NftCard";

type Props = {
  onClose: () => void;
};

const AvatarModal = (props: Props) => {
  const { publicKey } = useWallet();
  const { data, isLoading, error } = useUserAssets(publicKey?.toString());
  const {
    updateUser,
    isUpdating,
    data: user,
  } = useUser(publicKey?.toString() ?? undefined);

  const handleSelectAvatar = async (image: string) => {
    if (!publicKey) return;
    await updateUser({ ...user, avatar: image });
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
      {data && (
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
    </ModalLayout>
  );
};

export default AvatarModal;
