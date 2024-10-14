import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-background dark:bg-gray-800 border border-blue-500 rounded-lg shadow-lg p-4 w-10/12 md:w-1/4">
        <h2 className="text-lg font-semibold">Descartar rascunho?</h2>
        <p className="mt-2 text-sm ">
          Você tem certeza de que gostaria de descartar este rascunho?
        </p>
        <div className="flex justify-end mt-4">
          <button
            className="px-2 py-2  rounded-md "
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="px-2 py-2 bg-red-600 text-white rounded-md ml-2 hover:bg-red-700 dark:hover:bg-red-500"
            onClick={onConfirm}
          >
            Descartar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
