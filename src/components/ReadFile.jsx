import React from "react";
import { X } from "lucide-react";

const ReadFile = ({ url, onClose }) => {
  if (!url) return null;

  const getFilePreview = () => {
    const extension = url.split('.').pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) {
      return <img src={url} alt="preview" className="w-full h-auto max-h-[80vh] object-contain" />;
    } else if (extension === "pdf") {
      return (
        <iframe
          src={url}
          title="PDF Preview"
          className="w-full h-[80vh] rounded"
        ></iframe>
      );
    } else {
      return <p className="text-center text-gray-600">Fichier non supporté : {extension}</p>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="text-lg font-medium">Aperçu du fichier</h3>
            <p className="text-sm text-gray-500">Affichage du contenu fourni</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          {getFilePreview()}
        </div>
      </div>
    </div>
  );
};

export default ReadFile;
