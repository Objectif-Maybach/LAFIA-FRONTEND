"use client"

import { useEffect, useState } from "react"
import UserForm from "../../components/Users/Form"
import ResetForm from "../../components/Reset/Form"
import { PencilIcon, TrashIcon, SearchIcon, PlusIcon, X, LockIcon } from "lucide-react"
import { AddUser, DeleteUser, GetAllUsers, ResetPassword, UpdateUser } from "../../functions/User/Users"
import { toast } from "react-toastify"
import Loader from "../../components/loading/loader"
import ConfirAlert from "../../components/alert/ConfirmAlert"
const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalResetOpen, setIsModalResetOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState([])
  const [dataEdit, setDataEdit] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [id, setId] = useState('');

  const UsersAll = async () => {
    setIsLoading(true)
    try {
      const response = await GetAllUsers()
      console.log(response)
      setUsers(response)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }
  const AddUsers = async (user) => {
    setIsLoading(true)
    try {
      const response = await AddUser(user);
      toast.success('Ajouter avec succès ')
      UsersAll()
      handleFormClose()
      console.log(response);
    } catch (error) {
      toast.error('Une erreur est survenue lors de l\'ajout de l\'utilisateur')
      // Afficher une notification d'erreur ou gérer l'erreur comme vous le souhaitez
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }
  const ResetUsers = async (user) => {
    setIsLoading(true)
    try {
      const response = await ResetPassword(dataEdit.id, user)
      toast.success('Réinitialisation effectuée avec succès')
      UsersAll()
      handleFormCloseReset()
      console.log(response)
    } catch (error) {
      toast.error('Erreur lors de la réinitialisation de l\'utilisateur')
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }
  const UpdateUsers = async (user) => {
    setIsLoading(true)
    try {
      const response = await UpdateUser(dataEdit.id, user)
      toast.success('Mise à jour effectuée avec succès')
      UsersAll()
      handleFormClose()
      console.log(response)
    }
    catch (error) {
      toast.error('Erreur lors de la modification de l\'utilisateur')
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }
  const handleEdit = async (user) => {
    setIsModalOpen(true)
    setDataEdit(user)
  }
  const handleReset = async (user) => {
    setIsModalResetOpen(true)
    setDataEdit(user)
  }
  const handleDelete = async (id) => {
    setIsDelete(true)
    setId(id)
  }
  const handleDeleteCancel = async () => {
    setIsDelete(false)
    setId('')
  }
  const DeleteUsers = async (userId) => {
    setIsLoading(true)
    try {
      const response = await DeleteUser(userId);
      toast.success('Utilisateur supprimé avec succès')
      UsersAll()
    } catch (error) {
      toast.error('Erreur lors de la suppression de l\'utilisateur')
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    UsersAll();
  }, []);
  const handleFormClose = () => {
    setIsModalOpen(false)
  }
  const handleFormCloseReset = () => {
    setIsModalResetOpen(false)
  }

  const filteredUsers = users.filter(
    (user) =>
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      {isLoading && (<Loader />)}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Gestion des utilisateurs</h1>
        <p className="text-gray-600">Ajouter, modifier ou supprimer des utilisateurs</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-medium">Liste des utilisateurs</h2>

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
              onClick={() => (setDataEdit([]), setIsModalOpen(true))}
              className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700"
            >
              <PlusIcon size={16} className="mr-2" />
              Ajouter un utilisateur
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
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Téléphone
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Rôle
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
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{user.full_name} </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500"><span className="text-red-700"> {user.contact.telephone}</span> <br />
                      {user.contact.adresse}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role.nom_role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : user.role.nom_role === "Livreur"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                        }`}
                    >
                      {user.role.nom_role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-yellow-600 hover:text-yellow-900 mr-3" onClick={() => handleReset(user)}>
                      <LockIcon size={16} />
                    </button>
                    <button className="text-blue-500 hover:text-blue-900 mr-3" onClick={() => handleEdit(user)}>
                      <PencilIcon size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(user.id)}>
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
            <span className="font-medium">{filteredUsers.length}</span> sur{" "}
            <span className="font-medium">{filteredUsers.length}</span> résultats
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
                <h3 className="text-lg font-medium">{dataEdit.length == 0 ? 'Ajouter un utilisateur' : 'Modifier l\'utilisateur'}  </h3>
                <p className="text-sm text-gray-500">{dataEdit.length == 0 ? 'Remplissez le formulaire pour ajouter un nouvel utilisateur' : 'Modifiez les informations pour mettre à jour l\'utilisateur'} </p>
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
              <UserForm onClose={handleFormClose} onSubmit={dataEdit.length == 0 ? AddUsers : UpdateUsers} dataEdit={dataEdit} loading={setIsLoading} />
            </div>
          </div>
        </div>
      )}
      {isModalResetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-xl mx-4 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-medium">Reinitialisation  </h3>
                <p className="text-sm text-gray-500">Reinitialiser le mot de passe de {dataEdit.full_name} </p>
              </div>
              <button onClick={handleFormCloseReset} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            {error && (
              <div className="bg-red-50 border text-center border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <div className="p-4">
              <ResetForm onClose={handleFormCloseReset} onSubmit={ResetUsers} dataEdit={dataEdit} />
            </div>
          </div>
        </div>
      )}
      {isDelete && (<ConfirAlert message="Supprimer un utilisateur" onConfirm={DeleteUsers} onCancel={handleDeleteCancel} id={id} />)}
    </div>
  );
};
export default Users

