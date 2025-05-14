import Loader from '../../components/loading/loader'
import { GetAllCommandes, DeleteCommande } from "../../functions/Commandes/Commandes"
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { TrashIcon, X } from "lucide-react"
import OneOrder from './oneOrder'

export default function ListOrders({ search }) {
  const [isLoading, setIsLoading] = useState(false);
  const [commandes, setCommandes] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [id, setId] = useState('');
  const [isOneOrder, setIsOneOrder] = useState(false);
  const [order, setOrder] = useState({});


  const CommandesAll = async () => {
    setIsLoading(true)
    try {
      const response = await GetAllCommandes()
      console.log(response)
      setCommandes(response)
    } catch (err) {
      console.error(err)
    }
    finally {
      setIsLoading(false)
    }
  }
  const handleDelete = async (userId) => {

    setIsLoading(true)
    try {
      const response = await DeleteCommande(userId);
      CommandesAll()
      toast.success('Commande supprimée avec succès')
    } catch (error) {
      toast.error('Erreur lors de la suppression de la commande')
      console.error(error);
    }
    finally {
      setIsLoading(false)
    }

  }

  const clean = () => {
    setIsOneOrder(false)
    setOrder({})
  }
  useEffect(() => {
    CommandesAll();
  }, []);

  const filteredCommandess = commandes.filter(
    (etab) =>
      // user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      etab.order_date.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {isLoading && (<Loader />)}

      <div className="bg-white rounded-lg shadow overflow-hidden">

        {!isOneOrder && (
          <>
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
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Montant total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
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
                    <tr
                      key={etab.id}
                      className="hover:bg-gray-50 cursor-pointer"

                    >
                      <td className="px-6 py-4 whitespace-nowrap" onClick={() => {
                        setOrder(etab);
                        setIsOneOrder(true);
                      }}>
                        <span>{new Date(etab.order_date).toLocaleDateString("fr-FR")}</span>

                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{etab.contact.adresse} </div>
                        <div className="font-medium text-gray-900">{etab.contact.telephone} </div>

                      </td>
                      <td className="px-6 py-4 whitespace-nowrap" onClick={() => {
                        setOrder(etab);
                        setIsOneOrder(true);
                      }}>
                        <div className="text-gray-500">{etab.driver ? etab.driver.driver_name : 'Inconnu'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap" onClick={() => {
                        setOrder(etab);
                        setIsOneOrder(true);
                      }}>
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                         0 produits
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                          1000
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span >
                          {etab.order_statut.id === 0 ? (
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              En attente
                            </span>
                          ) : etab.order_statut.id === 1 ? (
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Livré
                            </span>
                          ) : (
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Annulé
                            </span>
                          )}
                        </span>
                      </td>


                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">

                        <button className="text-red-600 hover:text-red-900" onClick={() => { setIsDelete(true); setId(etab.id) }}>
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
          </>
        )}
      </div>
      {isDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-xl mx-4 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-medium">
                  Supprimer une commande
                </h3>
              </div>
              <button onClick={() => { setIsDelete(false); setId('') }} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <p>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => { setIsDelete(false); setId('') }}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                >
                  <X size={18} className="mr-2" />
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDelete(id);
                    setIsDelete(false);
                    setId('');
                  }}
                  className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-sm"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isOneOrder && <OneOrder order={order} clean={clean} />}




    </div>


  )
}