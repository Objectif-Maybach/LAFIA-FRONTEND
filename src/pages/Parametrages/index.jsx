"use client";

import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon, SearchIcon, PlusIcon, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { toast } from "react-toastify";
import CategorieForm from "../../components/parametrages/categoryForm";
import TypeEtablissementForm from "../../components/parametrages/TypeEtablissementForm";
import { motion } from "framer-motion";
import { GetAllTypeEtablissements, updateTypeEtablissement, AddTypeEtablissement, DeleteTypeEtablissement } from "../../functions/TypeEtablissements";
import {GetAllCategories, AddCategorie, updateCategorie, DeleteCategorie} from "../../functions/Categories";


const notify = (message) =>
  toast.success("Connexion réussie !", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

const Parametrage = () => {
  const [activeTab, setActiveTab] = useState("categories");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dataEdit, setDataEdit] = useState([]);
  const [update, setUpdate] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [id, setId] = useState('');

  const clean = () => {
    setDataEdit([]);
    setUpdate(false)
  };

  const [typesEtablissements, setTypesEtablissements] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleFormClose = () => {
    setIsModalOpen(false);
    setModalType("");
    clean();
  };

  const handleFormSubmit = () => {
    setIsModalOpen(false);
    setModalType("");
  };

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
    
  };

  const updateState = (type, prop) => {
    openModal(type);
    setDataEdit(prop);
    setUpdate(true);
  };
  const dataTypeEtablissement = async () => {
    try {
      const response = await GetAllTypeEtablissements();
      setTypesEtablissements(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const addDataTypeEtablissement = async (data) => {
    try{
      await AddTypeEtablissement(data);
      toast.success('Ajout effectué avec succès')
      dataTypeEtablissement();
      setIsModalOpen(false);
      setModalType("");
    }catch (error) {
      toast.error('Erreur lors de l\'ajout')
      console.error("Error sending data:", error);
     
    }
  }
  const updateDataTypeEtablissement = async (data) => {
    try{
      await updateTypeEtablissement(dataEdit.id, data);
      toast.success('Modification effectuée avec succès')
      dataTypeEtablissement();
      setIsModalOpen(false);
      setModalType("");
    }catch (error) {
      toast.error('Erreur lors de la modification')
      console.error("Error sending data:", error);
     
    }
  }
  const deleteDataTypeEtablissement = async (id) => {
    try{
      await DeleteTypeEtablissement(id);
      toast.success('Suppression effectuée avec succès')
      dataTypeEtablissement();
      setIsDelete(false);
      setModalType("");
      clean();
    }
    catch (error) {
      toast.error('Erreur lors de la suppression')
      console.error("Error sending data:", error);
  }
}
 const dataCategorie= async ()=> {
  try{
    const response = await GetAllCategories();
    setCategories(response);
    console.log(response)
  } catch (error) {
    console.error("Error fetching data:", error);
  }
 }
 const addDataCategorie = async (data) => {
  try{
    await AddCategorie(data);
    toast.success('Ajout effectué avec succès')
    dataCategorie();
    setIsModalOpen(false);
    setModalType("");
  } catch (error) {
    toast.error('Erreur lors de l\'ajout')
    console.error("Error sending data:", error);
  }
  
 }
 const updateDataCategorie = async (data) => {
  try{
    await updateCategorie(dataEdit.id, data);
    setUpdate(false)
    clean();
    dataCategorie();
    setIsModalOpen(false);
    setModalType("");
    toast.success('Modification effectuée avec succès')
   
  }catch (error){
    toast.error('Erreur lors de la modification')
    console.error("Error sending data:", error);
  }
 }
 const deleteDataCategorie = async (id) => {
  try{
    await DeleteCategorie(id);
    toast.success('Suppression effectuée avec succès')
    dataCategorie();
    setIsDelete(false);
    setModalType("");
  }
  catch (error) {
    toast.error('Erreur lors de la suppression')
    console.error("Error sending data:", error);
}
}
  useEffect(() => {
    dataCategorie();
    dataTypeEtablissement();
    
  }, []);

  const filteredCategories = categories.filter(
    (cat) =>
      cat.category_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTypesEtablissements = typesEtablissements.filter(
    (type) =>
      type.establishment_type_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      type.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Paramétrage</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="relative border-b border-gray-200 mb-6">
            <TabsList className="relative flex w-full justify-start bg-transparent p-0 h-auto">
              <TabsTrigger
                value="categories"
                className="relative px-6 py-3 text-sm font-medium tracking-wide transition-all data-[state=active]:text-black data-[state=active]:font-semibold data-[state=inactive]:text-gray-500 bg-transparent rounded-none border-0"
              >
                Catégories
                {activeTab === "categories" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                    layoutId="activeTabIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </TabsTrigger>
              <TabsTrigger
                value="typesEtablissements"
                className="relative px-6 py-3 text-sm font-medium tracking-wide transition-all data-[state=active]:text-black data-[state=active]:font-semibold data-[state=inactive]:text-gray-500 bg-transparent rounded-none border-0"
              >
                Types d'établissements
                {activeTab === "typesEtablissements" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                    layoutId="activeTabIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-medium">
              {activeTab === "categories"
                ? "Liste des catégories"
                : activeTab === "typesEtablissements"
                  ? "Liste des types d'établissements"
                  : "Liste des options de livraison"}
            </h2>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Rechercher ${
                    activeTab === "categories"
                      ? "une catégorie"
                      : activeTab === "typesEtablissements"
                        ? "un type d'établissement"
                        : "une option de livraison"
                  }...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button
                onClick={() => openModal(activeTab)}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <PlusIcon size={16} className="mr-2" />
                Ajouter{" "}
                {activeTab === "categories"
                  ? "une catégorie"
                  : activeTab === "typesEtablissements"
                    ? "un type d'établissement"
                    : "une option de livraison"}
              </button>
            </div>
          </div>

          <TabsContent value="categories" className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
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
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCategories.map((categorie) => (
                    <tr key={categorie.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{categorie.category_name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-500">{categorie.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {/* <button onClick={notify} className="text-blue-600 hover:text-blue-900 mr-3">
                        <ToastContainer />
                          <PencilIcon size={16} />
                        </button> */}
                        <button
                          onClick={() => updateState(activeTab, categorie)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <PencilIcon size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900" onClick={() => {setIsDelete(true); setId(categorie.id)}}>
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
                <span className="font-medium">{filteredCategories.length}</span> sur{" "}
                <span className="font-medium">{filteredCategories.length}</span> résultats
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
          </TabsContent>

          <TabsContent value="typesEtablissements" className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
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
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTypesEtablissements.map((type) => (
                    <tr key={type.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{type.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{type.establishment_type_name}</div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-gray-500">{type.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => updateState(activeTab, type)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <PencilIcon size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900" onClick={() => {setIsDelete(true); setId(type.id)}}>
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
                <span className="font-medium">{filteredTypesEtablissements.length}</span> sur{" "}
                <span className="font-medium">{filteredTypesEtablissements.length}</span> résultats
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
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal personnalisé */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-xl mx-4 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-medium">
                  {update
                    ? modalType === "categories"
                      ? "Modifier une catégorie"
                      : modalType === "typesEtablissements"
                        ? "Modifier un type d'établissement"
                        : "Modifier une option de livraison"
                    : modalType === "categories"
                      ? "Ajouter une catégorie"
                      : modalType === "typesEtablissements"
                        ? "Ajouter un type d'établissement"
                        : "Ajouter une option de livraison"}
                </h3>
              </div>
              <button onClick={handleFormClose} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              {modalType === "categories" && (
                <CategorieForm onClose={handleFormClose} onSubmit={ update? updateDataCategorie: addDataCategorie} dataEdit={dataEdit} />
              )}
              {modalType === "typesEtablissements" && (
                <TypeEtablissementForm
                  onClose={handleFormClose}
                  onSubmit={update ? updateDataTypeEtablissement :
                    addDataTypeEtablissement}
                  dataEdit={dataEdit}
                />
              )}
            </div>
          </div>
        </div>
      )}
      {isDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-xl mx-4 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-medium">
                  {modalType === "categories"
                    ? "Supprimer une catégorie"
                       :"Supprimer un type d'établissement"
                     }
                </h3>
              </div>
              <button onClick={()=> {setIsDelete(false); setId('')}} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <p>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={()=> {setIsDelete(false); setId('')}}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                >
                  <X size={18} className="mr-2" />
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => {activeTab==='categories' ? deleteDataCategorie(id) :
                    deleteDataTypeEtablissement(id);
                    setIsDelete(false);
                    setId('');
                  }}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


export default Parametrage

