"use client";

import imageCompression from "browser-image-compression";
import { useState } from "react";
import Image from "next/image";

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  fileType: "image/webp",
};

export default function ImageConverter() {
  const [images, setImages] = useState<File[]>([]);
  const [compressedImages, setCompressedImages] = useState<File[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImages(fileArray);
      setCompressedImages([]);
    }
  };

  const convertImage = async (file: File) => {
    try {
      const compressedFile = await imageCompression(file, options);

      const webpFile = new File(
        [compressedFile],
        file.name.replace(/\.[^.]+$/, ".webp"),
        { type: "image/webp" }
      );
      return webpFile;
    } catch {
      return file;
    }
  };

  const handleCompressImages = async () => {
    if (images.length === 0) return;
    setIsCompressing(true);
    try {
      const compressedFiles = await Promise.all(
        Array.from(images).map((file) => convertImage(file))
      );
      setCompressedImages(compressedFiles);
      console.log("Images compressed successfully");
    } catch (error) {
      console.error("Error compressing images:", error);
    } finally {
      setIsCompressing(false);
    }
  };

  const downloadImage = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name; // Keep the original filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up the URL object
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Converter</h1>
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          multiple
          className="mb-2"
        />
        <div className="flex flex-wrap gap-4">
          <div className="flex  flex-wrap gap-4 mb-5">
            {images.map((image, index) => (
              <div key={index} className="mb-4">
                <Image
                  src={URL.createObjectURL(image)}
                  alt={`Original Image ${index + 1}`}
                  width={100}
                  height={100}
                  className="object-contain"
                />
                <p className="text-sm text-gray-500">
                  Size: {image.size.toFixed(2)} bytes
                </p>
              </div>
            ))}
          </div>
          <div className="flex  flex-wrap gap-4">
            {compressedImages.map((compressedImage, index) => (
              <div key={index} className="mb-4">
                <Image
                  src={URL.createObjectURL(compressedImage)}
                  alt={`Compressed Image ${index + 1}`}
                  width={100}
                  height={100}
                  className="object-contain"
                />
                <p className="text-sm text-gray-500">
                  Size: {compressedImage.size.toFixed(2)} bytes
                </p>
                <button
                  onClick={() => downloadImage(compressedImage)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Download {compressedImage.name}
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleCompressImages}
          disabled={images.length === 0 || isCompressing}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {isCompressing ? "Compressing..." : "Compress Images"}
        </button>
      </div>
    </div>
  );
}
