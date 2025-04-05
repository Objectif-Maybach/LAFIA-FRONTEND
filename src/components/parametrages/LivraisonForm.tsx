interface FormProps {
  onClose: () => void
  onSubmit: () => void
}
const LivraisonForm: React.FC<FormProps> = ({ onClose, onSubmit }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
            Nom du type de livraison
          </label>
          <input
            type="text"
            id="nom"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez le nom du type de livraison"
          />
        </div>
        <div>
          <label htmlFor="tarif" className="block text-sm font-medium text-gray-700 mb-1">
            Tarif
          </label>
          <input
            type="number"
            id="tarif"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez le tarif"
          />
        </div>
        <div>
          <label htmlFor="delai" className="block text-sm font-medium text-gray-700 mb-1">
            Délai (en jours)
          </label>
          <input
            type="number"
            id="delai"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez le délai"
          />
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Enregistrer
          </button>
        </div>
      </div>
    </form>
  )
}
export default LivraisonForm;