import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Plus, Trash2, Loader2, CheckCircle } from "lucide-react";
import { addProduitImages } from "../../functions/ProduitImage/addProduitImage";
import { deleteProduitImage } from "../../functions/ProduitImage/deleteProduitImage";
import { getOneProduitImage } from "../../functions/ProduitImage/getOneProduitImage";

const ProductGallery = ({ 
  productName, 
  productId,
  onClose,
  fileUrl,
  isLoading: parentLoading,
  ProduitsAll
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newImages, setNewImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);

  // Charger les images du produit
  const fetchProductImages = async () => {
    try {
      setIsLoading(true);
      const response = await getOneProduitImage(productId);
      setImages(response || []);
    } catch (error) {
      console.error('Erreur lors du chargement des images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Charger les images au montage
  useEffect(() => {
    fetchProductImages();
  }, [productId]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleAddImages = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
    
    // Créer des URLs de prévisualisation
    const previews = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      isPreview: true,
      file_name: URL.createObjectURL(file) // Pour la prévisualisation
    }));
    setPreviewImages(previews);
  };

  const handleSubmitImages = async () => {
    if (newImages.length === 0) return;
    
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      newImages.forEach(file => {
        formData.append("images[]", file);
      });
      formData.append("product", productId);
      
      await addProduitImages(formData);
      await ProduitsAll();
      await fetchProductImages(); // Rafraîchir les images
      setNewImages([]);
      setPreviewImages([]);
    } catch (error) {
      console.error("Erreur lors de l'ajout d'images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm("Supprimer cette image ?")) return;
    
    setIsLoading(true);
    
    try {
      await deleteProduitImage(imageId);
      await ProduitsAll();
      await fetchProductImages(); // Rafraîchir les images
      if (currentIndex >= images.length - 1) {
        setCurrentIndex(Math.max(0, images.length - 2));
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Nettoyer les URLs de prévisualisation
  useEffect(() => {
    return () => {
      previewImages.forEach(image => URL.revokeObjectURL(image.preview));
    };
  }, [previewImages]);

  // Combiner les images existantes et les prévisualisations
  const allImages = [...images, ...previewImages];

  const loading = parentLoading || isLoading;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold">
            {productName} - {allImages.filter(img => !img.isPreview).length} image(s)
            {loading && <Loader2 size={18} className="animate-spin ml-2 inline" />}
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4">
          {allImages.length > 0 ? (
            <div className="relative h-96 bg-gray-50 rounded-lg flex items-center justify-center">
              {allImages.length > 1 && (
                <>
                  <button 
                    onClick={handlePrev}
                    className="absolute left-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
                    disabled={loading}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="absolute right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
                    disabled={loading}
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              <img
                src={allImages[currentIndex]?.isPreview 
                  ? allImages[currentIndex].file_name 
                  : `${fileUrl}${allImages[currentIndex]?.file_name}`}
                alt={`${productName} - ${currentIndex + 1}`}
                className="max-h-full max-w-full object-contain"
              />

              {!allImages[currentIndex]?.isPreview && (
                <button
                  onClick={() => handleDeleteImage(allImages[currentIndex]?.id)}
                  className="absolute bottom-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} />}
                </button>
              )}
            </div>
          ) : (
            <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
              {loading ? 'Chargement...' : 'Aucune image disponible'}
            </div>
          )}

          {allImages.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto py-2">
              {allImages.map((img, index) => (
                <button
                  key={img.id || `preview-${index}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 border-2 rounded-md overflow-hidden ${
                    currentIndex === index ? 'border-orange-500' : 'border-transparent'
                  }`}
                  disabled={loading}
                >
                  <img
                    src={img.isPreview ? img.file_name : `${fileUrl}${img.file_name}`}
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
            <label className="flex items-center gap-2 px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-700 cursor-pointer transition-colors disabled:opacity-50">
              {loading ? (
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
                disabled={loading}
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
                  disabled={loading}
                >
                  {loading ? (
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