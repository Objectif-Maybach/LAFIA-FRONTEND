import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon, SearchIcon, PlusIcon, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { toast } from "react-toastify";
import CategorieForm from "../../components/parametrages/categoryForm";
import TypeEtablissementForm from "../../components/parametrages/typeEtablissementForm";
import { motion } from "framer-motion";
import { GetAllTypeEtablissements, updateTypeEtablissement, AddTypeEtablissement, DeleteTypeEtablissement } from "../../functions/TypeEtablissement/TypeEtablissements";
import { GetAllCategories, AddCategorie, updateCategorie, DeleteCategorie } from "../../functions/Categorie/Categories";
import Loader from "../../components/loading/loader";
import TypeEtablissement from "./TypeEtablissement";
import Categorie from "./Categorie";
import { AddStatutOrder, DeleteStatutOrder, GetAllStatutOrders, updateStatutOrder } from "../../functions/StatutCommande/StatutCommandes";
import StatutOrderForm from "../../components/parametrages/statutOrderForm";
import StatutOrder from "./StatutCommandes";
import ConfirAlert from "../../components/alert/ConfirmAlert";


const Parametrage = () => {
  const [activeTab, setActiveTab] = useState("categories");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dataEdit, setDataEdit] = useState([]);
  const [update, setUpdate] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [id, setId] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const clean = () => {
    setDataEdit([]);
    setUpdate(false)
  };

  const [typesEtablissements, setTypesEtablissements] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statutOrders, setStatutOrders] = useState([]);

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
    setIsLoading(true)
    try {
      const response = await GetAllTypeEtablissements();
      setTypesEtablissements(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    finally {
      setIsLoading(false)
    }
  }
  const addDataTypeEtablissement = async (data) => {
    setIsLoading(true)
    try {
      await AddTypeEtablissement(data);
      toast.success('Ajout effectué avec succès')
      dataTypeEtablissement();
      setIsModalOpen(false);
      setModalType("");
    } catch (error) {
      toast.error('Erreur lors de l\'ajout')
      console.error("Error sending data:", error);
    }
    finally {
      setIsLoading(false)
    }
  }
  const updateDataTypeEtablissement = async (data) => {
    setIsLoading(true)
    try {
      await updateTypeEtablissement(dataEdit.id, data);
      toast.success('Modification effectuée avec succès')
      dataTypeEtablissement();
      setIsModalOpen(false);
      setModalType("");
    } catch (error) {
      toast.error('Erreur lors de la modification')
      console.error("Error sending data:", error);

    }
    finally {
      setIsLoading(false)
    }
  }
  const deleteDataTypeEtablissement = async (id) => {
    setIsLoading(true)
    try {
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
    finally {
      setIsLoading(false)
    }
  }
  const dataCategorie = async () => {
    setIsLoading(true)
    try {
      const response = await GetAllCategories();
      setCategories(response);
      console.log(response)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    finally {
      setIsLoading(false)
    }
  }
  const addDataCategorie = async (data) => {
    setIsLoading(true)
    try {
      await AddCategorie(data);
      toast.success('Ajout effectué avec succès')
      dataCategorie();
      setIsModalOpen(false);
      setModalType("");
    } catch (error) {
      toast.error('Erreur lors de l\'ajout')
      console.error("Error sending data:", error);
    }
    finally {
      setIsLoading(false)
    }

  }
  const updateDataCategorie = async (data) => {
    try {
      await updateCategorie(dataEdit.id, data);
      setUpdate(false)
      clean();
      dataCategorie();
      setIsModalOpen(false);
      setModalType("");
      toast.success('Modification effectuée avec succès')

    } catch (error) {
      toast.error('Erreur lors de la modification')
      console.error("Error sending data:", error);
    }
  }
  const deleteDataCategorie = async (id) => {
    setIsLoading(true)
    try {
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
    finally {
      setIsLoading(false)
    }
  }
  const dataStatut = async () => {
    setIsLoading(true)
    try {
      const response = await GetAllStatutOrders();
      setStatutOrders(response);
      console.log(response)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    finally {
      setIsLoading(false)
    }
  }
  const addDataStatut = async (data) => {
    setIsLoading(true)
    try {
      await AddStatutOrder(data);
      toast.success('Ajout effectué avec succès')
      dataStatut();
      setIsModalOpen(false);
      setModalType("");
    } catch (error) {
      toast.error('Erreur lors de l\'ajout')
      console.error("Error sending data:", error);
    }
    finally {
      setIsLoading(false)
    }

  }
  const updateDataStatut = async (data) => {
    try {
      await updateStatutOrder(dataEdit.id, data);
      setUpdate(false)
      clean();
      dataStatut();
      setIsModalOpen(false);
      setModalType("");
      toast.success('Modification effectuée avec succès')

    } catch (error) {
      toast.error('Erreur lors de la modification')
      console.error("Error sending data:", error);
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
  const deleteDataStatut = async (id) => {
    setIsLoading(true)
    try {
      await DeleteStatutOrder(id);
      toast.success('Suppression effectuée avec succès')
      dataStatut();
      setIsDelete(false);
      setModalType("");
    }
    catch (error) {
      toast.error('Erreur lors de la suppression')
      console.error("Error sending data:", error);
    }
    finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    dataCategorie();
    dataTypeEtablissement();
    dataStatut();

  }, []);

  const filteredCategories = categories.filter(
    (cat) =>
      cat.category_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTypesEtablissements = typesEtablissements.filter(
    (type) =>
      type.establishment_types_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      type.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredStatutOrders = statutOrders.filter(
    (stat) =>
      stat.statut_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {isLoading && (<Loader />)}
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
              <TabsTrigger
                value="StatutCommandes"
                className="relative px-6 py-3 text-sm font-medium tracking-wide transition-all data-[state=active]:text-black data-[state=active]:font-semibold data-[state=inactive]:text-gray-500 bg-transparent rounded-none border-0"
              >
                Statut de commande
                {activeTab === "StatutCommandes" && (
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
                  : activeTab === "StatutCommandes"
                    ? "Liste des statuts de commande"
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
                  placeholder={`Rechercher ${activeTab === "categories"
                    ? "une catégorie"
                    : activeTab === "typesEtablissements"
                      ? "un type d'établissement"
                      : activeTab === "StatutCommandes"
                        ? "un statut de commande"
                        : "une option de livraison"
                    }...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button
                onClick={() => (openModal(activeTab), clean())}
                className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700"
              >
                <PlusIcon size={16} className="mr-2" />
                Ajouter{" "}
                {activeTab === "categories"
                  ? "une catégorie"
                  : activeTab === "typesEtablissements"
                    ? "un type d'établissement"
                    : activeTab === "StatutCommandes"
                      ? "un statut de commande"
                      : "une option de livraison"}
              </button>
            </div>
          </div>

          <TabsContent value="categories" className="p-0">
            <Categorie filteredCategories={filteredCategories} updateState={updateState} handleDelete={handleDelete} setIsDelete={setIsDelete} setId={setId} activeTab={activeTab} />
          </TabsContent>
          <TabsContent value="typesEtablissements" className="p-0">
            <TypeEtablissement filteredTypesEtablissements={filteredTypesEtablissements} handleDelete={handleDelete} updateState={updateState} setIsDelete={setIsDelete} setId={setId} activeTab={activeTab} />
          </TabsContent>
          <TabsContent value="StatutCommandes" className="p-0">
            <StatutOrder filteredStatutOrders={filteredStatutOrders} handleDelete={handleDelete} updateState={updateState} setIsDelete={setIsDelete} setId={setId} activeTab={activeTab} />
          </TabsContent>
        </Tabs>
      </div>
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
                      : modalType === "StatutCommandes"
                        ? "Ajouter un statut de commande"
                        : "Ajouter une option de livraison"}
                </h3>
              </div>
              <button onClick={handleFormClose} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              {modalType === "categories" && (
                <CategorieForm
                  onClose={handleFormClose}
                  onSubmit={update ? updateDataCategorie :
                    addDataCategorie}
                  dataEdit={dataEdit}
                />
              )}
              {modalType === "typesEtablissements" && (
                <TypeEtablissementForm
                  onClose={handleFormClose}
                  onSubmit={update ? updateDataTypeEtablissement :
                    addDataTypeEtablissement}
                  dataEdit={dataEdit}
                />
              )}
              {modalType === "StatutCommandes" && (
                <StatutOrderForm
                  onClose={handleFormClose}
                  onSubmit={update ? updateDataStatut :
                    addDataStatut}
                  dataEdit={dataEdit}
                />
              )}
            </div>
          </div>
        </div>
      )}
      {isDelete && (
        <ConfirAlert
          message=
          {activeTab === "categories"
            ? "Supprimer une catégorie"
            : activeTab === "typesEtablissements"
              ? "Supprimer un type d'établissement"
              : activeTab === "StatutCommandes"
                ? "Supprimer un statut de commande"
                :
                ""
          }
          onConfirm={
            activeTab === 'categories' ? deleteDataCategorie :
              activeTab === 'typesEtablissements' ? deleteDataTypeEtablissement
                : deleteDataStatut
          }
          onCancel={handleDeleteCancel}
          id={id}
        />)}
    </div>
  )
}
export default Parametrage

