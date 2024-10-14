import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { PaperClipIcon } from "@heroicons/react/outline"; // Importando o ícone de clip
import { Button } from "@/components/ui/button"; // Importando o componente de botão
import ConfirmModal from "./ConfirmModal";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (content: string, media?: File[]) => void; // Modifiquei para aceitar mídia
  userImage: string;
}

const PostModal: React.FC<PostModalProps> = ({
  isOpen,
  onClose,
  onCreatePost,
  userImage,
}) => {
  const [newPost, setNewPost] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      onCreatePost(newPost, mediaFiles); // Envia o conteúdo e os arquivos
      setNewPost("");
      setMediaFiles([]);
      onClose();
    }
  };

  const handleClose = useCallback(() => {
    if (newPost || mediaFiles.length > 0) {
      setIsConfirmOpen(true);
    } else {
      setNewPost("");
      setMediaFiles([]);
      onClose();
    }
  }, [newPost, mediaFiles, onClose]);

  const handleConfirmDiscard = () => {
    setNewPost("");
    setMediaFiles([]);
    onClose();
    setIsConfirmOpen(false);
  };

  const handleCancelDiscard = () => {
    setIsConfirmOpen(false);
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setMediaFiles((prevFiles) => [...prevFiles, ...filesArray]);
    }
  };

  const handleRemoveMedia = (index: number) => {
    setMediaFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const remainingCharacters = 300 - newPost.length;
  const isLowOnCharacters = remainingCharacters < 50;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-background dark:bg-gray-800 border border-blue-500 rounded-lg shadow-lg p-4 w-11/12 md:w-1/3 max-h-full overflow-y-auto">
          <div className="flex items-start mb-4">
            <Image
              src={userImage}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full mr-2"
            />
            <form onSubmit={handleSubmit} className="flex-grow">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="w-full bg-transparent p-2 rounded-md focus:outline-none font-semibold resize-none max-h-36 overflow-hidden"
                placeholder="Fala ai"
                rows={6}
                maxLength={300}
              />
              <div className="flex items-center mt-2">
                <label htmlFor="media-upload" className="cursor-pointer">
                  <Button
                    type="button"
                    className="flex items-center justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <PaperClipIcon className="w-5 h-5 mr-1" />{" "}
                    {/* Ícone de clip */}
                  </Button>
                </label>
                <input
                  id="media-upload"
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleMediaChange}
                  className="hidden"
                />
              </div>
              <div className="flex flex-wrap mt-2">
                {mediaFiles.map((file, index) => (
                  <div key={index} className="relative mr-2 mb-2">
                    <span className="text-sm">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMedia(index)}
                      className="absolute top-0 right-0 text-red-600 hover:text-red-800"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-1">
                <span
                  className={`text-sm ${
                    isLowOnCharacters ? "text-red-600" : "text-gray-500"
                  }`}
                >
                  {`${remainingCharacters} caracteres restantes`}
                </span>
              </div>
              <div className="flex justify-end space-x-2 mt-2">
                <Button
                  type="button"
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Postar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onConfirm={handleConfirmDiscard}
        onCancel={handleCancelDiscard}
      />
    </>
  );
};

export default PostModal;
