"use client";
import React, { useEffect, useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";

type Props = {
  name: string;
  handleSelection: (name: string, files: File[]) => void;
  objectFit: string;
  resolution: string;
  defaultImages?: string[];
  maxImages?: number;
};

const MultiImageSelector = (props: Props) => {
  const [imagesToDisplay, setImagesToDisplay] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const MAX_IMAGES = props.maxImages || 4;

  useEffect(() => {
    if (props.defaultImages) setImagesToDisplay(props.defaultImages);
  }, [props.defaultImages]);

  const handleUploadClick = () => {
    if (imagesToDisplay.length >= MAX_IMAGES) {
      alert(`You can't select more than ${MAX_IMAGES} images`);
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const validFiles = newFiles.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        alert(`The file ${file.name} exceeds the maximum size of 2MB`);
        return false;
      }
      return true;
    });

    if (imagesToDisplay.length + validFiles.length > MAX_IMAGES) {
      alert(`You can't select more than ${MAX_IMAGES} images`);
      return;
    }

    const newImageUrls = validFiles.map((file) => URL.createObjectURL(file));
    setImagesToDisplay((prev) => [...prev, ...newImageUrls]);
    setSelectedFiles((prev) => [...prev, ...validFiles]);
    props.handleSelection(props.name, [...selectedFiles, ...validFiles]);

    // Reset the input to allow the same file selection
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    setImagesToDisplay((prev) => prev.filter((_, i) => i !== index));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    props.handleSelection(
      props.name,
      selectedFiles.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-4">
      <div
        className="border-2 border-dashed border-gray-600 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer bg-transparent"
        onClick={handleUploadClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept="image/png, image/jpeg, image/webp"
          multiple
        />
        <Upload
          size={42}
          className="text-accent bg-custom-gray-600 rounded-full p-2 mb-2"
        />
        <span className="bodyStyle mb-2">Select up to {MAX_IMAGES} images</span>
        <span className="text-xs text-gray-500 mb-4">
          Recommended size: {props.resolution}px
        </span>
        <span className="text-xs text-gray-500 mb-4">
          Recommended format: JPG, PNG, WEBP max 2MB.
        </span>
        {imagesToDisplay.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {imagesToDisplay.map((imageUrl, index) => (
              <div
                key={index}
                className="relative flex justify-center items-center aspect-square w-32 h-32 rounded-xl overflow-hidden"
              >
                <Image
                  src={imageUrl}
                  className={`${
                    props.objectFit === "cover"
                      ? "object-cover"
                      : props.objectFit === "contain"
                      ? "object-contain"
                      : ""
                  }`}
                  alt={`Image ${index + 1}`}
                  fill
                />
                <button
                  className="absolute top-2 right-2 text-white bg-black/60 rounded-full p-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(index);
                  }}
                  type="button"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiImageSelector;
