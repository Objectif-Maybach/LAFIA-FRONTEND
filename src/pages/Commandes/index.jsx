import { useState, useEffect } from "react"
import Loader from '../../components/loading/loader'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { PlusIcon, SearchIcon } from "lucide-react"
import { motion } from "framer-motion";
import AddOrders from "../../components/orders/addOrders"
import ListOrders from "../../components/orders/listOrders"



const CommandePage = () => {
  // Sample products data
  const [activeTab, setActiveTab] = useState("addOrders");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');



  return (

    <div className="">
    {isLoading && (<Loader />)}

      {/* Header */}
     
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Gestion des commandes</h1>
        <p className="text-gray-600">Passez une nouvelle commande et gérez votre panier</p>
      


        
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full bg-white rounded-lg shadow">
          <div className="relative border-b border-gray-200 mb-6">
            <TabsList className="relative flex w-full justify-start bg-transparent p-0 h-auto">
              <TabsTrigger
                value="addOrders"
                className="relative px-6 py-3 text-sm font-medium tracking-wide transition-all data-[state=active]:text-black data-[state=active]:font-semibold data-[state=inactive]:text-gray-500 bg-transparent rounded-none border-0"
              >
                Ajout d'une commande
                {activeTab === "addOrders" && (
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
                value="listOrders"
                className="relative px-6 py-3 text-sm font-medium tracking-wide transition-all data-[state=active]:text-black data-[state=active]:font-semibold data-[state=inactive]:text-gray-500 bg-transparent rounded-none border-0"
              >
                Liste des commandes
                {activeTab === "listOrders" && (
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
              {activeTab === "addOrders"
                ? "Ajout d'une nouvelle commande"
                : "Liste des commandes"
               }
            </h2>
            {activeTab === "listOrders" &&
            <div className="relative">
            
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Rechercher une commande..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          }

           
          </div>

          <TabsContent value="addOrders" className="p-0">
            <AddOrders />
          </TabsContent>
          <TabsContent value="listOrders" className="p-0">
            <ListOrders search={searchQuery} />
          </TabsContent>
        </Tabs>

      {/* Main Content */}
    
    </div>
  )
}

export default CommandePage
