import React, { useState } from 'react';
import StoreForm from '../../components/Produits/Form';
import { PencilIcon, TrashIcon, SearchIcon, PlusIcon, X } from 'lucide-react';
import restauImg from '../../assets/images/restau.jpg';

const Produits = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [produits, setProduits] = useState([])
  const [dataEdit, setDataEdit] = useState([])
  const [error, setError] = useState('')

  const ProduitsAll = async () => {
    try {
      const response = await GetAllProduits()
      console.log(response)
      setProduits(response)
    } catch (err) {
      console.error(err)
    }
  }
  const AddProduits = async (produit) => {
    try {
      const response = await AddProduit(produit);
      toast.success('Ajouter avec succès ')
      ProduitsAll()
      handleFormClose()
      console.log(response);
    } catch (error) {
      toast.error('Erreur lors de l\'ajout avec succès ')
      // Afficher une notification d'erreur ou gérer l'erreur comme vous le souhaitez
      console.error(error);
    }
  }
  const UpdateProduits = async (produit) => {
    try {
      const response = await UpdateProduit(dataEdit.id, produit)
      toast.success('Mise à jour effectuée avec succès')
      ProduitsAll()
      handleFormClose()
      console.log(response)
    }
    catch (error) {
      toast.error('Erreur lors de la modification de l\'utilisateur')
      console.error(error);
    }
  }
  const handleEdit = async (produit) => {
    setIsModalOpen(true)
    setDataEdit(produit)
  }
  const handleDelete = async (produitId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        const response = await DeleteProduit(produitId);
        toast.success('Utilisateur supprimé avec succès')
        ProduitsAll()
      } catch (error) {
        toast.error('Erreur lors de la suppression de l\'utilisateur')
        console.error(error);
      }
    }
  }
  useEffect(() => {
    ProduitsAll();
  }, []);
  const handleFormClose = () => {
    setIsModalOpen(false)
  }

  const allProduits = [{
    id: 1,
    name: 'Le Petit Café',
    type: 'Restaurant',
    address: '12 Rue de la Paix, Paris',
    phone: '01 23 45 67 89',
    distance: '1.2 km',
    photo: restauImg,
  }, {
    id: 2,
    name: 'Boulangerie Tartine',
    type: 'Boulangerie',
    address: '45 Avenue Victor Hugo, Lyon',
    phone: '04 56 78 90 12',
    distance: '3.5 km',
    photo: restauImg,

  }, {
    id: 3,
    name: 'Épicerie Bio',
    type: 'Épicerie',
    address: '8 Rue des Fleurs, Marseille',
    phone: '04 91 23 45 67',
    distance: '2.0 km',
    photo: restauImg,
  }, {
    id: 4,
    name: 'Pharmacie Centrale',
    type: 'Pharmacie',
    address: '23 Boulevard Saint-Michel, Paris',
    phone: '01 45 67 89 01',
    distance: '4.1 km',
    photo: restauImg,
  }];

  const filteredProduits = allProduits.filter(store =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return <div>
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Gestion des produits
      </h1>
      <p className="text-gray-600">
        Ajouter, modifier ou supprimer des produits partenaires
      </p>
    </div>

    <div className="lg:col-span-2">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-medium">Liste des produits</h2>
          <div className="relative">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Rechercher un utilisateur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button

                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={openModal}
              >
                <PlusIcon size={16} className="mr-2" />
                Ajouter un produit
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Photos
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Etablissement
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categorie
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>

              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProduits.map(produit => <tr key={produit.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={restauImg} alt={produit.product_name} className="w-16 h-16 object-cover rounded-md" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">
                    {produit.product_name}
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-500">{produit.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-500">{produit.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="text-gray-500">{produit.establishment}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="text-gray-500">{produit.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => handleEdit(produit)}>
                    <PencilIcon size={16} />
                  </button>
                  <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(produit.id)}>
                    <TrashIcon size={16} />
                  </button>
                </td>
              </tr>)}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Affichage de <span className="font-medium">1</span> à{" "}
            <span className="font-medium">{filteredProduits.length}</span> sur{" "}
            <span className="font-medium">{filteredProduits.length}</span> résultats
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50" disabled>
              Précédent
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50" disabled>
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
    {isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-xl mx-4 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h3 className="text-lg font-medium">{update ? 'Ajouter un produit' : 'Modifier un produit'} </h3>

            </div>
            <button onClick={handleFormClose} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>

          <div className="p-4">
            <StoreForm onClose={handleFormClose} onSubmit={AddProduits} dataEdit={dataEdit} />
          </div>
        </div>
      </div>
    )}
  </div>

};
export default Produits;