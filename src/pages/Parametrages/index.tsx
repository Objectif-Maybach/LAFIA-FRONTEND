"use client"

import type React from "react"

import { useState } from "react"
import { PencilIcon, TrashIcon, SearchIcon, PlusIcon, X } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs"
import { ToastContainer, toast } from 'react-toastify';
import CategorieForm from "../../components/parametrages/categoryForm"
import TypeEtablissementForm from "../../components/parametrages/TypeEtablissementForm"
import LivraisonForm from "../../components/parametrages/LivraisonForm"
import { motion } from "framer-motion"


// Définition des types
interface Categorie {
  id: number
  nom: string
  description: string
}

interface TypeEtablissement {
  id: number
  nom: string
  description: string
}

interface Livraison {
  id: number
  nom: string
  tarif: number
  delai: number
}


const notify = () => toast.success("Connexion réussie !", {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
});

const Parametrage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("categories")
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalType, setModalType] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Données d'exemple pour les catégories
  const categories: Categorie[] = [
    { id: 1, nom: "Électronique", description: "Produits électroniques et accessoires" },
    { id: 2, nom: "Vêtements", description: "Vêtements et accessoires de mode" },
    { id: 3, nom: "Alimentation", description: "Produits alimentaires et boissons" },
    { id: 4, nom: "Maison", description: "Meubles et décoration d'intérieur" },
    { id: 5, nom: "Beauté", description: "Produits de beauté et soins personnels" },
  ]

  // Données d'exemple pour les types d'établissements
  const typesEtablissements: TypeEtablissement[] = [
    { id: 1, nom: "Restaurant", description: "Établissement de restauration" },
    { id: 2, nom: "Boutique", description: "Commerce de détail" },
    { id: 3, nom: "Supermarché", description: "Grande surface alimentaire" },
    { id: 4, nom: "Pharmacie", description: "Établissement pharmaceutique" },
    { id: 5, nom: "Hôtel", description: "Établissement d'hébergement" },
  ]

  // Données d'exemple pour les livraisons
  const livraisons: Livraison[] = [
    { id: 1, nom: "Standard", tarif: 4.99, delai: 3 },
    { id: 2, nom: "Express", tarif: 9.99, delai: 1 },
    { id: 3, nom: "Économique", tarif: 2.99, delai: 5 },
    { id: 4, nom: "Point relais", tarif: 3.99, delai: 4 },
    { id: 5, nom: "Gratuite", tarif: 0, delai: 7 },
  ]

  const handleFormClose = (): void => {
    setIsModalOpen(false)
    setModalType("")
  }

  const handleFormSubmit = (): void => {
    // Gérer la soumission du formulaire
    setIsModalOpen(false)
    setModalType("")
  }

  const openModal = (type: string): void => {
    setModalType(type)
    setIsModalOpen(true)
  }

  const filteredCategories = categories.filter(
    (cat) =>
      cat.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredTypesEtablissements = typesEtablissements.filter(
    (type) =>
      type.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      type.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredLivraisons = livraisons.filter(
    (livraison) =>
      livraison.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      livraison.tarif.toString().includes(searchQuery) ||
      livraison.delai.toString().includes(searchQuery),
  )

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
            <TabsTrigger
              value="livraisons"
              className="relative px-6 py-3 text-sm font-medium tracking-wide transition-all data-[state=active]:text-black data-[state=active]:font-semibold data-[state=inactive]:text-gray-500 bg-transparent rounded-none border-0"
            >
              Livraisons
              {activeTab === "livraisons" && (
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
                        <div className="font-medium text-gray-900">{categorie.nom}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-500">{categorie.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={notify} className="text-blue-600 hover:text-blue-900 mr-3">
                        <ToastContainer />
                          <PencilIcon size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <TrashIcon size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                        <div className="font-medium text-gray-900">{type.nom}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-500">{type.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <PencilIcon size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <TrashIcon size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="livraisons" className="p-0">
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
                      Tarif
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Délai (jours)
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
                  {filteredLivraisons.map((livraison) => (
                    <tr key={livraison.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{livraison.nom}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">
                          {livraison.tarif === 0 ? "Gratuit" : `${livraison.tarif.toFixed(2)} €`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{livraison.delai}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <PencilIcon size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <TrashIcon size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>

        <div className="px-4 py-3 border-t flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Affichage de <span className="font-medium">1</span> à{" "}
            <span className="font-medium">
              {activeTab === "categories"
                ? filteredCategories.length
                : activeTab === "typesEtablissements"
                  ? filteredTypesEtablissements.length
                  : filteredLivraisons.length}
            </span>{" "}
            sur{" "}
            <span className="font-medium">
              {activeTab === "categories"
                ? filteredCategories.length
                : activeTab === "typesEtablissements"
                  ? filteredTypesEtablissements.length
                  : filteredLivraisons.length}
            </span>{" "}
            résultats
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
                <h3 className="text-lg font-medium">
                  {modalType === "categories"
                    ? "Ajouter une catégorie"
                    : modalType === "typesEtablissements"
                      ? "Ajouter un type d'établissement"
                      : "Ajouter une option de livraison"}
                </h3>
                <p className="text-sm text-gray-500">
                  Remplissez le formulaire pour ajouter{" "}
                  {modalType === "categories"
                    ? "une nouvelle catégorie"
                    : modalType === "typesEtablissements"
                      ? "un nouveau type d'établissement"
                      : "une nouvelle option de livraison"}
                </p>
              </div>
              <button onClick={handleFormClose} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              {modalType === "categories" && <CategorieForm onClose={handleFormClose} onSubmit={handleFormSubmit} />}
              {modalType === "typesEtablissements" && (
                <TypeEtablissementForm onClose={handleFormClose} onSubmit={handleFormSubmit} />
              )}
              {modalType === "livraisons" && <LivraisonForm onClose={handleFormClose} onSubmit={handleFormSubmit} />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Parametrage

