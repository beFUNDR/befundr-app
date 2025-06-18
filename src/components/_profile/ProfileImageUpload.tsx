"use client";
import { Camera } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import DefaultAvatar from "@/components/displayElements/DefaultAvatar";
import AvatarModal from "@/components/modals/AvatarModal";

type Props = {
  imageUrl: string;
  onImageChange: (file: File) => void;
};

export default function ProfileImageUpload({ imageUrl, onImageChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const { publicKey } = useWallet();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div
        className="relative w-24 h-24 rounded-full overflow-hidden cursor-pointer mb-2 bg-[#232323] border border-[#444]"
        onClick={() => setIsShowPopup(true)}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Profile"
            fill
            className="object-cover w-full h-full opacity-50"
          />
        ) : (
          publicKey && (
            <DefaultAvatar size={24} publicKey={publicKey?.toString()} />
          )
        )}
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
          <Camera size={40} />
        </span>
      </div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {isShowPopup && <AvatarModal onClose={() => setIsShowPopup(false)} />}
    </div>
  );
}
