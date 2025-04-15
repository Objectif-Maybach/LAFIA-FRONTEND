"use client"

import { useEffect, useState } from "react"
import DriversForm from "../../components/Drivers/Form"
import { PencilIcon, TrashIcon, SearchIcon, PlusIcon, X, LockIcon } from "lucide-react"
import { getAllDriver } from '../../functions/driver/getAllDriver';
import { addDriver } from '../../functions/driver/addDriver';
import { editDriver } from '../../functions/driver/editDriver';
import { deleteDriver } from '../../functions/driver/deleteDriver';
import { toast } from "react-toastify"
import Loader from "../../components/loading/loader"
const Drivers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [drivers, setDrivers] = useState([])
  const [dataEdit, setDataEdit] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const DriversAll = async () => {
    setIsLoading(true)
    try {
      const response = await getAllDriver()
      console.log(response)
      setDrivers(response)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }
  const AddDrivers = async (user) => {
    setIsLoading(true)
    try {
      const response = await addDriver(user);
      toast.success('Ajouter avec succès ')
      DriversAll()
      handleFormClose()
      console.log(response);
    } catch (error) {
      toast.error('Erreur lors de l\'ajout avec succès ')
      // Afficher une notification d'erreur ou gérer l'erreur comme vous le souhaitez
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }
  
  const UpdateDrivers = async (user) => {
    setIsLoading(true)
    try {
      const response = await editDriver(dataEdit.id, user)
      toast.success('Mise à jour effectuée avec succès')
      DriversAll()
      handleFormClose()
      console.log(response)
    }
    catch (error) {
      toast.error('Erreur lors de la modification de l\'livreur')
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }
  const handleEdit = async (user) => {
    setIsModalOpen(true)
    setDataEdit(user)
  }
 
  const handleDelete = async (userId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce livreur ?')) {
      setIsLoading(true)
      try {
        const response = await deleteDriver(userId);
        toast.success('Utilisateur supprimé avec succès')
        DriversAll()
      } catch (error) {
        toast.error('Erreur lors de la suppression de l\'livreur')
        console.error(error);
      } finally {
        setIsLoading(false)
      }
    }
  }
  useEffect(() => {
    DriversAll();
  }, []);
  const handleFormClose = () => {
    setIsModalOpen(false)
  }
 
  const filteredDrivers = drivers.filter(
    (user) =>
      user.driver_name.toLowerCase().includes(searchQuery.toLowerCase()) 
  )

  return (
    <div>
      {isLoading && (<Loader />)}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Gestion des livreurs</h1>
        <p className="text-gray-600">Ajouter, modifier ou supprimer des livreurs</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-medium">Liste des livreurs</h2>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Rechercher un livreur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button
              onClick={() => (setDataEdit([]), setIsModalOpen(true))}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <PlusIcon size={16} className="mr-2" />
              Ajouter un livreur
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nom et Prénom
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Piece d'identité
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Téléphone
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
              {filteredDrivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{driver.driver_name} </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{driver.piece}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500"><span className="text-red-700"> {driver.contact.telephone}</span> <br />
                      {driver.contact.adresse}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => handleEdit(driver)}>
                      <PencilIcon size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(driver.id)}>
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
            <span className="font-medium">{filteredDrivers.length}</span> sur{" "}
            <span className="font-medium">{filteredDrivers.length}</span> résultats
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

      {/* Modal personnalisé */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-xl mx-4 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-medium">{dataEdit.length == 0 ? 'Ajouter un livreur' : 'Modifier l\'livreur'}  </h3>
                <p className="text-sm text-gray-500">{dataEdit.length == 0 ? 'Remplissez le formulaire pour ajouter un nouvel livreur' : 'Modifiez les informations pour mettre à jour l\'livreur'} </p>
              </div>
              <button onClick={handleFormClose} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            {error && (
              <div className="bg-red-50 border text-center border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <div className="p-4">
              <DriversForm onClose={handleFormClose} onSubmit={dataEdit.length == 0 ? AddDrivers : UpdateDrivers} dataEdit={dataEdit} />
            </div>
          </div>
        </div>
      )}
     
    </div>
  );
};
export default Drivers

