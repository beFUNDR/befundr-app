"use client";
import ModalLayout from "./_ModalLayout";
import { useWallet } from "@solana/wallet-adapter-react";
import { useUserAssets } from "@/hooks/dbData/useUser";
import Loader from "../displayElements/Loader";
import NftCard from "../cards/NftCard";

type Props = {
  onClose: () => void;
};

const AvatarModal = (props: Props) => {
  const { publicKey } = useWallet();
  const { data, isLoading, error } = useUserAssets(publicKey?.toString());

  return (
    <ModalLayout item="start" justify="center" onClose={props.onClose}>
      {isLoading && (
        <>
          <Loader />
          <div className="bodyStyle">Fetching assets...</div>
        </>
      )}
      {error && <div>Erreur lors du chargement des assets</div>}
      {data && (
        <>
          <p className="h3Style">Eligible collections:</p>
          <p className="bodyStyle">
            Selection the nft you want to use as profile picture:
          </p>
          <div className="grid grid-cols-5 gap-8 justify-center items-center w-full">
            {data.result.items.map((item: any) => (
              <NftCard
                key={item.id}
                image={item.content.links.image}
                name={item.content.metadata.name}
              />
            ))}
            {data.result.items.map((item: any) => (
              <NftCard
                key={item.id}
                image={item.content.links.image}
                name={item.content.metadata.name}
              />
            ))}
            {data.result.items.map((item: any) => (
              <NftCard
                key={item.id}
                image={item.content.links.image}
                name={item.content.metadata.name}
              />
            ))}
            {data.result.items.map((item: any) => (
              <NftCard
                key={item.id}
                image={item.content.links.image}
                name={item.content.metadata.name}
              />
            ))}
            {data.result.items.map((item: any) => (
              <NftCard
                key={item.id}
                image={item.content.links.image}
                name={item.content.metadata.name}
              />
            ))}
            {data.result.items.map((item: any) => (
              <NftCard
                key={item.id}
                image={item.content.links.image}
                name={item.content.metadata.name}
              />
            ))}
            {data.result.items.map((item: any) => (
              <NftCard
                key={item.id}
                image={item.content.links.image}
                name={item.content.metadata.name}
              />
            ))}
            {data.result.items.map((item: any) => (
              <NftCard
                key={item.id}
                image={item.content.links.image}
                name={item.content.metadata.name}
              />
            ))}
            {data.result.items.map((item: any) => (
              <NftCard
                key={item.id}
                image={item.content.links.image}
                name={item.content.metadata.name}
              />
            ))}
            {data.result.items.map((item: any) => (
              <NftCard
                key={item.id}
                image={item.content.links.image}
                name={item.content.metadata.name}
              />
            ))}
            {data.result.items.map((item: any) => (
              <NftCard
                key={item.id}
                image={item.content.links.image}
                name={item.content.metadata.name}
              />
            ))}
            {data.result.items.map((item: any) => (
              <NftCard
                key={item.id}
                image={item.content.links.image}
                name={item.content.metadata.name}
              />
            ))}
            {data.result.items.map((item: any) => (
              <NftCard
                key={item.id}
                image={item.content.links.image}
                name={item.content.metadata.name}
              />
            ))}
            {data.result.items.map((item: any) => (
              <NftCard
                key={item.id}
                image={item.content.links.image}
                name={item.content.metadata.name}
              />
            ))}
          </div>
        </>
      )}
    </ModalLayout>
  );
};

export default AvatarModal;
