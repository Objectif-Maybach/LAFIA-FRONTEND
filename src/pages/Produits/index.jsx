import React, { useState } from 'react';
import StoreForm from '../../components/Produits/StoreForm';
import { PencilIcon, TrashIcon, SearchIcon, PlusIcon, X } from 'lucide-react';
import restauImg from '../../assets/images/restau.jpg';

const Produits = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [dataEdit, setDataEdit] = useState([])
    const [update, setUpdate] = useState(false)


    const clean = () => {
      setDataEdit([]);
      setUpdate(false)
    };
    const handleFormClose = () => {
      setIsModalOpen(false);
      clean();
    };
    const openModal = () => {
      setIsModalOpen(true);
      
    };
const AddUsers = async () =>{
  console.log("hello");
 
}
const updateState = (prop) => {
  openModal();
  setDataEdit(prop);
  setUpdate(true);
};
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
          Gestion des boutiques
        </h1>
        <p className="text-gray-600">
          Ajouter, modifier ou supprimer des boutiques partenaires
        </p>
      </div>
     
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-medium">Liste des boutiques</h2>
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
              Ajouter un établissement
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
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Adresse
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Distance
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>

                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProduits.map(store => <tr key={store.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={store.photo} alt={store.name} className="w-16 h-16 object-cover rounded-md"  />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {store.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${store.type === 'Restaurant' ? 'bg-orange-100 text-orange-800' : store.type === 'Boulangerie' ? 'bg-yellow-100 text-yellow-800' : store.type === 'Épicerie' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                          {store.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{store.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{store.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="text-gray-500">{store.distance}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => updateState(store)}>
                          <PencilIcon size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
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
                <h3 className="text-lg font-medium">{update ? 'Ajouter un établissement': 'Modifier l\'établissement'} </h3>
    
              </div>
              <button onClick={handleFormClose} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
           
            <div className="p-4">
              <StoreForm onClose={handleFormClose} onSubmit={AddUsers} dataEdit={dataEdit} />
            </div>
          </div>
        </div>
      )}
      </div>

};
export default Produits;