"use client"

import { useEffect, useState } from "react"
import EtablissementForm from "../../components/Etablissements/Form"
import { PencilIcon, TrashIcon, SearchIcon, PlusIcon, X } from "lucide-react"
import { AddEtablissement, DeleteEtablissement, GetAllEtablissements, UpdateEtablissement } from "../../functions/Etablissement/Etablissements"
import restauImg from '../../assets/images/restau.jpg';
import { toast } from "react-toastify"
import Loader from "../../components/loading/loader"
import ReadFile from "../../components/ReadFile"
import Pagination from "../../components/Pagination"
import ConfirAlert from "../../components/alert/ConfirmAlert"
const Etablissements = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [etablissements, setEtablissements] = useState([])
  const [dataEdit, setDataEdit] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [isDelete, setIsDelete] = useState(false)
  const [id, setId] = useState('');
  const fileUrl = import.meta.env.VITE_FILE_URL;

  const EtablissementsAll = async () => {
    setIsLoading(true)
    try {
      const response = await GetAllEtablissements()
      console.log(response)
      setEtablissements(response)
    } catch (err) {
      console.error(err)
    }
    finally {
      setIsLoading(false)
    }
  }
  const AddEtablissements = async (user) => {
    setIsLoading(true)
    try {
      const response = await AddEtablissement(user);
      toast.success('Ajouter avec succès ')
      EtablissementsAll()
      handleFormClose()
      console.log(response);
    } catch (error) {
      toast.error('Erreur lors de l\'ajout de l\'etablissement ')
      // Afficher une notification d'erreur ou gérer l'erreur comme vous le souhaitez
      console.error(error);
    }
    finally {
      setIsLoading(false)
    }
  }
  const UpdateEtablissements = async (user) => {
    setIsLoading(true)
    try {
      const response = await UpdateEtablissement(dataEdit.id, user)
      toast.success('Mise à jour effectuée avec succès')
      EtablissementsAll()
      handleFormClose()
      console.log(response)
    }
    catch (error) {
      toast.error('Erreur lors de la modification de l\'etablissement')
      console.error(error);
    }
    finally {
      setIsLoading(false)
    }
  }
  const handleEdit = async (user) => {
    setIsModalOpen(true)
    setDataEdit(user)
  }
  const handleDelete = (userId) => {
    setIsDelete(true)
    setId(userId)
  }
  const handleDeleteCancel = () => {
    setIsDelete(false)
    setId('')
  }

  const DeleteEts = async (userId) => {
    setIsLoading(true)
    try {
      const response = await DeleteEtablissement(userId);
      toast.success('etablissement supprimé avec succès')
      EtablissementsAll()
    } catch (error) {
      toast.error('Erreur lors de la suppression de l\'etablissement')
      console.error(error);
    }
    finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    EtablissementsAll();
  }, []);
  const handleFormClose = () => {
    setIsModalOpen(false)
  }

  const filteredEtablissements = etablissements.filter(
    (etab) =>
      // user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      etab.establishment_name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const totalPages = Math.ceil(filteredEtablissements.length / rowsPerPage);
  const currentData = filteredEtablissements.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      {isLoading && (<Loader />)}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Gestion des etablissements</h1>
        <p className="text-gray-600">Ajouter, modifier ou supprimer des etablissements</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-medium">Liste des etablissements</h2>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Rechercher un etablissement..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button
              onClick={() => (setDataEdit([]), setIsModalOpen(true))}
              className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700"
            >
              <PlusIcon size={16} className="mr-2" />
              Ajouter un etablissement
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
                  Image
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nom
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contact
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
                <tr key={etab.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {etab.image ? (

                      <button className="text-orange-500 hover:text-blue-900 mr-3" onClick={() => readingFileUrl(etab.image)}>
                        <img src={fileUrl + etab.image} alt={etab.establishment_name} className="w-12 h-12 rounded-full" />
                      </button>
                    ) : (
                      <img src={restauImg} alt="placeholder" className="w-12 h-12 rounded-full" />
                    )}

                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900"> {etab.establishment_name}  {etab.establishment_type?.establishment_types_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500">{etab.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${etab.establishment_type?.establishment_types_name === 'restaurant' ? 'bg-orange-100 text-orange-800' : etab.establishment_type?.establishment_types_name === 'boulangerie' ? 'bg-yellow-100 text-yellow-800' : etab.establishment_type?.establishment_types_name === 'boutique' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {etab.establishment_type?.establishment_types_name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-500"><span className="text-red-700"> {etab.contact.telephone}</span> <br />
                      {etab.contact.adresse}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-500 hover:text-blue-900 mr-3" onClick={() => handleEdit(etab)}>
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
      </div>

      {/* {isReadFile && (<ReadFile url={fileUrl} onClose={() => setIsReadFile(false)} />)} */}
      {/* Modal personnalisé */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-xl mx-4 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-medium">{dataEdit.length == 0 ? 'Ajouter un etablissement' : 'Modifier l\'etablissement'} </h3>
                <p className="text-sm text-gray-500">{dataEdit.length == 0 ? 'Remplissez le formulaire pour ajouter un nouvel etablissement' : 'Modifiez les informations pour mettre à jour l\'etablissement'} </p>
              </div>
              <button onClick={handleFormClose} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <EtablissementForm onClose={handleFormClose} onSubmit={dataEdit.length == 0 ? AddEtablissements : UpdateEtablissements} dataEdit={dataEdit} loading={setIsLoading} />
            </div>
          </div>
        </div>
      )}

      {isDelete && (<ConfirAlert message="Supprimer un établissement" onConfirm={DeleteEts} onCancel={handleDeleteCancel} id={id} />)}
    </div>
  )
}

export default Etablissements

