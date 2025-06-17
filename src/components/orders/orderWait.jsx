import Loader from '../../components/loading/loader'
import { GetAllWaitCommandes, DeleteCommande, DeleteWaitCommande, AddCommande } from "../../functions/Commandes/Commandes"
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Eye, EyeIcon, PencilIcon, TrashIcon, X, SearchIcon } from "lucide-react"
import OneOrder from './oneOrder'
import Pagination from '../Pagination'
// import OrderForm from './Form'
import OrderWaitForm from './formWaitOrder'
import ConfirAlert from '../alert/ConfirmAlert'
export default function OrderWait() {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dataEdit, setDataEdit] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [waitCommandes, setWaitCommandes] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [id, setId] = useState('');
  const [isOneOrder, setIsOneOrder] = useState(false);
  const [order, setOrder] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [search, setSearch] = useState('');

  const CommandesAll = async () => {

    try {
      const response = await GetAllWaitCommandes()
      setWaitCommandes(response)
    } catch (err) {
      console.error(err)
    }
   
  }
  const handleSubmit = async (data) => {
    setIsLoading(true)
    try {
      console.log('data', data)
      const response = await AddCommande(data);
      await DeleteWaitCommande(dataEdit.id);
      CommandesAll()
      setIsLoading(false)
      setIsModalOpen(false)
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
  const handleEdit = async (order) => {
    setIsModalOpen(true)
    setDataEdit(order)
  }
const filteredCommandes = waitCommandes.filter(
  (etab) =>
    etab.order_date.toLowerCase().includes(search.toLowerCase()) ||
    etab.contact.adresse.toLowerCase().includes(search.toLowerCase())
);
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
          <div className="flex justify-end m-2">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={16} className="text-gray-400" />
                </div>
                <input
                type="text"
                className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Commande..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            </div>
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
                      Montant
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
                        <div className="font-medium text-gray-900">{etab.client.full_name} </div>
                        <div className="font-medium text-red-900">{etab.client.contact} </div>

                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-900 font-medium">
                          { etab.montant? etab.montant.toLocaleString() : '' } FCFA
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              En attente
                            </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">

                        <button className="text-blue-500 hover:text-blue-900 mr-3"
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
              <OrderWaitForm onClose={handleFormClose} onSubmit={handleSubmit} dataEdit={dataEdit} loading={setIsLoading} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}