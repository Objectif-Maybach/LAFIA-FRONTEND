import React from 'react';
import StoreForm from '../components/StoreForm';
import { PencilIcon, TrashIcon, SearchIcon } from 'lucide-react';
const Stores = () => {
  // Sample store data
  const stores = [{
    id: 1,
    name: 'Le Petit Café',
    type: 'Restaurant',
    address: '12 Rue de la Paix, Paris',
    phone: '01 23 45 67 89'
  }, {
    id: 2,
    name: 'Boulangerie Tartine',
    type: 'Boulangerie',
    address: '45 Avenue Victor Hugo, Lyon',
    phone: '04 56 78 90 12'
  }, {
    id: 3,
    name: 'Épicerie Bio',
    type: 'Épicerie',
    address: '8 Rue des Fleurs, Marseille',
    phone: '04 91 23 45 67'
  }, {
    id: 4,
    name: 'Pharmacie Centrale',
    type: 'Pharmacie',
    address: '23 Boulevard Saint-Michel, Paris',
    phone: '01 45 67 89 01'
  }];
  return <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Gestion des boutiques
        </h1>
        <p className="text-gray-600">
          Ajouter, modifier ou supprimer des boutiques partenaires
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-medium">Liste des boutiques</h2>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon size={16} className="text-gray-400" />
                </div>
                <input type="text" className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Rechercher une boutique..." />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
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
                      Téléphone
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stores.map(store => <tr key={store.id} className="hover:bg-gray-50">
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
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
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
                Affichage de <span className="font-medium">1</span> à{' '}
                <span className="font-medium">4</span> sur{' '}
                <span className="font-medium">4</span> résultats
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
        <div className="lg:col-span-1">
          <StoreForm />
        </div>
      </div>
    </div>;
};
export default Stores;