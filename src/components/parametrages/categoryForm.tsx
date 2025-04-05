interface FormProps {
    onClose: () => void
    onSubmit: () => void
  }
const CategorieForm: React.FC<FormProps> = ({ onClose, onSubmit }) => {
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
            Nom de la catégorie
          </label>
          <input
            type="text"
            id="nom"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez le nom de la catégorie"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez une description"
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
export default CategorieForm;