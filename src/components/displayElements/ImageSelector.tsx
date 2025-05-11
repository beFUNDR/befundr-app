"use client";
import React, { useEffect, useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";

type Props = {
  name: string; // "mainImage", "logo", etc.
  handleSelection: (name: string, file: File) => void;
  objectFit: string; // 'cover' or 'contain'
  resolution: string;
  defaultImage?: string | null | undefined;
};

const ImageSelector = (props: Props) => {
  const [imageToDisplay, setImageToDisplay] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  useEffect(() => {
    if (props.defaultImage) setImageToDisplay(props.defaultImage);
  }, [props.defaultImage]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert("Le fichier dépasse la taille maximale de 2MB");
        setImageToDisplay("");
        return;
      }
      setImageToDisplay(URL.createObjectURL(file));
      props.handleSelection(props.name, file);
    }
  };

  const handleCancelSelection = () => {
    setImageToDisplay("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <div
        className="border-2 border-dashed border-gray-600 rounded-xl p-6 flex flex-col items-center justify-center mb-6 cursor-pointer bg-transparent"
        onClick={handleUploadClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept="image/png, image/jpeg, image/webp"
        />
        <Upload
          size={42}
          className="text-accent bg-custom-gray-600 rounded-full p-2 mb-2"
        />
        <span className="bodyStyle mb-2">Select an image</span>
        <span className="text-xs text-gray-500 mb-4">
          Recommended size: {props.resolution}px
        </span>
        <span className="text-xs text-gray-500 mb-4">
          Recommended format: JPG, PNG, WEBP max 2MB.
        </span>
        {imageToDisplay && (
          <div className="relative flex justify-center items-center aspect-square w-32 h-32 rounded-xl ">
            <Image
              src={imageToDisplay}
              className=" object-cover"
              alt="image"
              fill
            />
            <button
              className="absolute top-0 right-0 text-white bg-black/60 rounded-full p-1"
              onClick={(e) => {
                e.stopPropagation();
                handleCancelSelection();
              }}
              type="button"
            >
              <X />
            </button>
          </div>
        )}
      </div>

      {/* Si image sélectionnée */}
      {/* {imageToDisplay && (
        <div className="relative flex justify-center items-center w-full aspect-[2.8/1] h-[180px] border-2 border-dashed border-gray-600 rounded-xl mb-6 bg-black">
          <button
            className="absolute top-2 right-2 z-50 text-white bg-black/60 rounded-full p-1"
            onClick={handleCancelSelection}
            type="button"
          >
            ×
          </button>
          <Image
            src={imageToDisplay}
            className={`absolute z-40 ${
              props.objectFit === "cover"
                ? "object-cover"
                : props.objectFit === "contain"
                ? "object-contain"
                : ""
            } rounded-xl`}
            alt="image"
            fill
          />
        </div>
      )} */}
    </>
  );
};

export default ImageSelector;
