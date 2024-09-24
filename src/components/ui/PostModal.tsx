import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/solid";
import ConfirmModal from "./ConfirmModal";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (content: string) => void;
  userImage: string;
}

const PostModal: React.FC<PostModalProps> = ({
  isOpen,
  onClose,
  onCreatePost,
  userImage,
}) => {
  const [newPost, setNewPost] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      onCreatePost(newPost);
      setNewPost("");
      onClose();
    }
  };

  const handleClose = useCallback(() => {
    if (newPost) {
      setIsConfirmOpen(true);
    } else {
      setNewPost("");
      onClose();
    }
  }, [newPost, onClose]);

  const handleConfirmDiscard = () => {
    setNewPost("");
    onClose();
    setIsConfirmOpen(false);
  };

  const handleCancelDiscard = () => {
    setIsConfirmOpen(false);
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
        <div className="bg-white dark:bg-gray-800 border border-blue-500 rounded-lg shadow-lg p-4 w-11/12 md:w-1/3 max-h-full overflow-y-auto">
          <div className="flex items-start mb-4">
            <Image
              src={userImage}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full mr-2"
            />
            <form onSubmit={handleSubmit} className="flex-grow">
              <div className="flex justify-between mb-2">
                <button
                  type="button"
                  className="text-blue-500"
                  onClick={handleClose}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Postar
                </button>
              </div>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="w-full dark:bg-transparent p-2 rounded-md focus:outline-none dark:text-white resize-none max-h-36 overflow-hidden"
                placeholder="Fala ai"
                rows={6}
                maxLength={300}
              />
              <div
                className={`flex items-center justify-between mt-1 text-sm ${
                  isLowOnCharacters ? "text-red-600" : "text-gray-500"
                }`}
              >
                <HeartIcon className="h-5 w-5 mr-1" />
                <span>{`${remainingCharacters} caracteres restantes`}</span>
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
