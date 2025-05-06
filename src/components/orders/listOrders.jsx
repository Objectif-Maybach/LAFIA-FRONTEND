import Loader from '../../components/loading/loader'
import { GetAllCommandes, DeleteCommande } from "../../functions/Commandes/Commandes"
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'

export default function ListOrders(){
    const [isLoading, setIsLoading] = useState(false);
    const [commandes, setCommandess] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const CommandessAll = async () => {
        setIsLoading(true)
        try {
          const response = await GetAllCommandes()
          console.log(response)
          setCommandess(response)
        } catch (err) {
          console.error(err)
        }
        finally {
          setIsLoading(false)
        }
      }
       const handleDelete = async (userId) => {
          if (confirm('Êtes-vous sûr de vouloir supprimer cet etablissement ?')) {
            setIsLoading(true)
            try {
              const response = await DeleteCommande(userId);
              toast.success('etablissement supprimé avec succès')
              CommandessAll()
            } catch (error) {
              toast.error('Erreur lors de la suppression de l\'etablissement')
              console.error(error);
            }
            finally {
              setIsLoading(false)
            }
          }
        }
        useEffect(() => {
          CommandessAll();
        }, []);

        const filteredCommandess = commandes.filter(
            (etab) =>
              // user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              etab.establishment_name.toLowerCase().includes(searchQuery.toLowerCase())
          )
    
    return(
        <div>
    {isLoading && (<Loader />)}

             <div className="bg-white rounded-lg shadow overflow-hidden">
       

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
               
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Informations du client
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Livreur
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nombres de produits
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCommandess.map((etab) => (
                <tr key={etab.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {etab.image ? (

                      <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => readingFileUrl(etab.image)}>
                        <img src={etab.image} alt={etab.establishment_name} className="w-12 h-12 rounded-full" />
                      </button>
                    ) : (
                      <img src={restauImg} alt="placeholder" className="w-12 h-12 rounded-full" />
                    )}

                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{etab.establishment_name} </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{etab.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${etab.establishment_type?.establishment_type_name === 'restaurant' ? 'bg-orange-100 text-orange-800' : etab.establishment_type?.establishment_type_name === 'boulangerie' ? 'bg-yellow-100 text-yellow-800' : etab.establishment_type?.establishment_type_name === 'boutique' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {etab.establishment_type?.establishment_type_name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500"><span className="text-red-700"> {etab.contact.telephone}</span> <br />
                      {etab.contact.adresse}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => handleEdit(etab)}>
                      <PencilIcon size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(etab.id)}>
                      <TrashIcon size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Affichage de <span className="font-medium">1</span> à{" "}
            <span className="font-medium">{filteredCommandess.length}</span> sur{" "}
            <span className="font-medium">{filteredCommandess.length}</span> résultats
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
        
       
    )
}