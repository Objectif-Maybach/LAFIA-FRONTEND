import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Plus, Trash2, Loader2, CheckCircle } from "lucide-react";

const ProductGallery = ({ 
  images = [], 
  productName, 
  onClose,
  productId ,
  fileUrl
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newImages, setNewImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleAddImages = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
  };

  const handleSubmitImages = async () => {
    if (newImages.length === 0) return;
    
    setIsLoading(true);
    
    // PRÊT POUR L'INTÉGRATION API - À COMPLÉTER
    try {
      const formData = new FormData();
      newImages.forEach(file => {
        formData.append("product_images[]", file);
      });
      formData.append("product_id", productId);
      
      // À REMPLACER PAR VOTRE APPEL API RÉEL
      console.log("Données à envoyer pour ajout d'images:", formData);
      // Exemple: await api.addProductImages(formData);
      
      setNewImages([]);
      // Ici vous devrez probablement rafraîchir les images du produit
    } catch (error) {
      console.error("Erreur lors de l'ajout d'images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm("Supprimer cette image ?")) return;
    
    setIsLoading(true);
    
    // PRÊT POUR L'INTÉGRATION API - À COMPLÉTER
    try {
      // À REMPLACER PAR VOTRE APPEL API RÉEL
      console.log("ID image à supprimer:", imageId);
      // Exemple: await api.deleteProductImage(imageId);
      
      // Ici vous devrez probablement rafraîchir les images du produit
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold">
            {productName} - {images.length} image(s)
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={isLoading}
          >
            <X size={24} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4">
          {images.length > 0 ? (
            <div className="relative h-96 bg-gray-50 rounded-lg flex items-center justify-center">
              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={handlePrev}
                    className="absolute left-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
                    disabled={isLoading}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="absolute right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
                    disabled={isLoading}
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Current image */}
              <img
                src={`${fileUrl}${images[currentIndex]?.file_name}`}
                alt={`${productName} - ${currentIndex + 1}`}
                className="max-h-full max-w-full object-contain"
              />

              {/* Delete button */}
              <button
                onClick={() => handleDeleteImage(images[currentIndex]?.id)}
                className="absolute bottom-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} />}
              </button>
            </div>
          ) : (
            <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
              Aucune image disponible
            </div>
          )}

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto py-2">
              {images.map((img, index) => (
                <button
                  key={img.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 border-2 rounded-md overflow-hidden ${
                    currentIndex === index ? 'border-blue-500' : 'border-transparent'
                  }`}
                  disabled={isLoading}
                >
                  <img
                    src={`${fileUrl}${img.file_name}`}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Add images section */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors disabled:opacity-50">
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Plus size={18} />
              )}
              Ajouter des images
              <input
                type="file"
                multiple
                onChange={handleAddImages}
                className="hidden"
                accept="image/*"
                disabled={isLoading}
              />
            </label>

            {newImages.length > 0 && (
              <>
                <span className="text-sm text-gray-600">
                  {newImages.length} image(s) sélectionnée(s)
                </span>
                <button
                  onClick={handleSubmitImages}
                  className="ml-auto flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <CheckCircle size={18} />
                  )}
                  Enregistrer
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;