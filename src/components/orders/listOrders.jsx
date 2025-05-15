import Loader from '../../components/loading/loader'
import { GetAllCommandes, DeleteCommande, updateCommande } from "../../functions/Commandes/Commandes"
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Eye, EyeIcon, PencilIcon, TrashIcon, X } from "lucide-react"
import OneOrder from './oneOrder'
import Pagination from '../Pagination'
import OrderForm from './Form'
import ConfirAlert from '../alert/ConfirmAlert'
export default function ListOrders({ search }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dataEdit, setDataEdit] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [commandes, setCommandes] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [id, setId] = useState('');
  const [isOneOrder, setIsOneOrder] = useState(false);
  const [order, setOrder] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const CommandesAll = async () => {
    setIsLoading(true)
    try {
      const response = await GetAllCommandes()
      setCommandes(response)
    } catch (err) {
      console.error(err)
    }
    finally {
      setIsLoading(false)
    }
  }
  const handleSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await updateCommande(dataEdit.id, data);
      CommandesAll()
      toast.success('Commande modifiée avec succès')
    } catch (error) {
      toast.error('Erreur lors de la modification de la commande')
      console.error(error);
    }
    finally {
      setIsLoading(false)
    }
  }
  const handleDelete = (userId) => {
    setIsDelete(true)
    setId(userId)
  }
  const handleDeleteCancel = () => {
    setIsDelete(false)
    setId('')
  }
  const DeleteOrder = async (userId) => {

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
    setCurrentPage(1);
  }, [search]);

  const handleFormClose = () => {
    setIsModalOpen(false)
  }
  const handleEdit = async (user) => {
    setIsModalOpen(true)
    setDataEdit(user)
  }
  const filteredCommandes = commandes.filter(
    (etab) =>
      // user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      etab.order_date.toLowerCase().includes(search.toLowerCase())
  )
  const totalPages = Math.ceil(filteredCommandes.length / rowsPerPage);
  const currentData = filteredCommandes.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
                  {currentData.map((etab) => (
                    <tr
                      key={etab.id}
                      className="hover:bg-gray-50 cursor-pointer"

                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span>{new Date(etab.order_date).toLocaleDateString("fr-FR")}</span>

                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{etab.contact.adresse} </div>
                        <div className="font-medium text-red-900">{etab.contact.telephone} </div>

                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{etab.driver ? etab.driver.driver_name : 'Inconnu'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span >
                          {etab.order_statut.id === 1 ? (
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              En cours
                            </span>
                          ) : etab.order_statut.id === 2? (
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

                        <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => {
                          setOrder(etab);
                          setIsOneOrder(true);
                        }}>
                          <Eye size={16} />
                        </button>
                        <button className="text-orange-500 hover:text-blue-900 mr-3"
                          onClick={() => handleEdit(etab)}>
                          <PencilIcon size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900"
                          onClick={() => {
                            setIsDelete(true);
                            setId(etab.id)
                          }}>
                          <TrashIcon size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(value) => {
                setRowsPerPage(value);
                setCurrentPage(1);
              }}
            />
          </>
        )}
      </div>
      
      {isDelete && (<ConfirAlert message="Supprimer une commande" onConfirm={DeleteOrder} onCancel={handleDeleteCancel} id={id} />)}
      
      {isOneOrder && <OneOrder order={order} clean={clean} />}
      
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-xl mx-4 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-medium">Modifier la commande </h3>
                <p className="text-sm text-gray-500">Modifiez les informations pour mettre à jour la commande </p>
              </div>
              <button onClick={handleFormClose} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <OrderForm onClose={handleFormClose} onSubmit={handleSubmit} dataEdit={dataEdit} loading={setIsLoading} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}