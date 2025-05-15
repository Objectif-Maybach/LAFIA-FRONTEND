import React, { useEffect, useState } from 'react';
import StoreForm from '../../components/Produits/Form';
import { getAllProduit } from '../../functions/Produit/getAllProduit';
import { addProduit } from '../../functions/Produit/addProduit';
import { editProduit } from '../../functions/Produit/editProduit';
import { deleteProduit } from '../../functions/Produit/deleteProduit';
import { PencilIcon, TrashIcon, SearchIcon, PlusIcon, X } from 'lucide-react';
import no_image from '../../assets/images/no_image.png';
import { toast } from 'react-toastify';
import Loader from '../../components/loading/loader';
import ProductGallery from '../../components/Produits/Galerie';
import Pagination from '../../components/Pagination';
import ConfirAlert from '../../components/alert/ConfirmAlert';

const Produits = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [produits, setProduits] = useState([])
  const [dataEdit, setDataEdit] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [isDelete, setIsDelete] = useState(false)
  const [id, setId] = useState('');
  const fileUrl = import.meta.env.VITE_FILE_URL;

  const ProduitsAll = async () => {
    setIsLoading(true)
    try {
      const response = await getAllProduit()
      console.log(response)
      setProduits(response)
    } catch (err) {
      console.error(err)
    }
    finally {
      setIsLoading(false)
    }
  }
  const AddProduits = async (produit) => {
    setIsLoading(true)
    try {
      const response = await addProduit(produit);
      toast.success('Ajouter avec succès ')
      ProduitsAll()
      handleFormClose()
      console.log(response);
    } catch (error) {
      toast.error('Erreur lors de l\'ajout avec succès ')
      // Afficher une notification d'erreur ou gérer l'erreur comme vous le souhaitez
      console.error(error);
    }
    finally {
      setIsLoading(false)
    }
  }
  const UpdateProduits = async (produit) => {
    setIsLoading(true)
    try {
      const response = await editProduit(dataEdit.id, produit)
      toast.success('Mise à jour effectuée avec succès')
      ProduitsAll()
      handleFormClose()
      console.log(response)
    }
    catch (error) {
      toast.error('Erreur lors de la modification du produit')
      console.error(error);
    }
    finally {
      setIsLoading(false)
    }
  }
  const handleEdit = async (produit) => {
    setIsModalOpen(true)
    setDataEdit(produit)
  }
  const handleDelete = async (id) => {
    setIsDelete(true)
    setId(id)
  }
  const handleDeleteCancel = async () => {
    setIsDelete(false)
    setId(0)
  }
  const DeleteProduct = async (produitId) => {
    setIsLoading(true)
    try {
      const response = await deleteProduit(produitId);
      toast.success('produit supprimé avec succès')
      ProduitsAll()
    } catch (error) {
      toast.error('Erreur lors de la suppression du produit')
      console.error(error);
    }
    finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    ProduitsAll();
  }, []);
  const handleFormClose = () => {
    setIsModalOpen(false)
  }

  const filteredProduits = produits.filter(store =>
    store.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredProduits.length / rowsPerPage);
  const currentData = filteredProduits.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );


  return (
    <div>
      {isLoading && (<Loader />)}
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
                    placeholder="Rechercher un produit..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <button

                  className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700"
                  onClick={() => (setDataEdit([]), setIsModalOpen(true))}
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
                {currentData.map(produit => <tr key={produit.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={produit.images.length ? fileUrl + produit.images[0].file_name : no_image}
                      alt={produit.product_name}
                      className="w-16 h-16 object-cover rounded-md cursor-pointer"
                      onClick={() => {
                        setCurrentProduct(produit);
                        setGalleryOpen(true);
                      }}
                    />
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
                    <div className="text-gray-500">{produit.establishment?.establishment_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="text-gray-500">{produit.category?.category_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-orange-500 hover:text-blue-900 mr-3" onClick={() => handleEdit(produit)}>
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
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-xl mx-4 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-medium">{dataEdit.length == 0 ? 'Ajouter un produit' : 'Modifier un produit'} </h3>

              </div>
              <button onClick={handleFormClose} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <StoreForm onClose={handleFormClose} onSubmit={dataEdit.length == 0 ? AddProduits : UpdateProduits} dataEdit={dataEdit} loading={setIsLoading} />
            </div>
          </div>
        </div>
      )}

      {isDelete && (<ConfirAlert message="Supprimer un produit" onConfirm={DeleteProduct} onCancel={handleDeleteCancel} id={id}/>)}
    </div>

  );

};
export default Produits;