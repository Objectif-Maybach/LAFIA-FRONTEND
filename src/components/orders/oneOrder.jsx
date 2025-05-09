import { useState, useEffect } from "react"
import { ArrowLeft, Trash2, ChevronRight,  Calendar, Truck, User, ShoppingBag, MapPin } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import {getAllProduit} from "../../functions/Produit/getAllProduit"
import { motion } from "framer-motion"
import { Separator } from "../ui/separator"



export default function OneOrder({ order, clean }) {
    // const dataProduct = async (id)=>{
    //     const response = await getAllProduit();
    //     return response.filter(item => item.id === id)[0].price
    //    }
    useEffect(() => {
        
            
    }, [])
    
  const fileUrl = import.meta.env.VITE_FILE_URL ;
  const calculateTotal = () => {
    let total = 0;
    order.order_products.forEach(item => {
      total += item.product.price * item.quantity;
    });
    return total;
  }

  const [isHovering, setIsHovering] = useState(false)


   return(
    <Card className="border-t-4 border-blue-500">
    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="flex items-center justify-between">
        <div>
           < div className="flex justify-between items-center">

        <motion.div whileHover={{ x: -5 }} className="flex items-center">
                <div
                  className="mr-4 cursor-pointer hover:text-blue-700 transition-colors duration-200 bg-white p-2 rounded-full shadow-sm"
                  onClick={() => {clean()}}
                
                >
                  <ArrowLeft size={20} className={isHovering ? "text-blue-600" : ""} />
                </div>
              </motion.div>
              <CardTitle className="text-2xl text-blue-800 font-bold">Détail de la commande </CardTitle>

        
        </div>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
              <Badge variant="outline" className="text-lg px-4 py-1.5 bg-blue-600 text-white border-blue-600 shadow-sm">
                {/* Total: {orderData.total.toLocaleString()} FCFA
                 */}
                 Total : {calculateTotal()} FCFA
              </Badge>
            </motion.div>
      </div>
    </CardHeader>
    
    <CardContent className="pt-6 space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3 bg-blue-50 p-3 rounded-lg">
              <Calendar className="text-blue-600" size={18} />
              <div>
                <p className="text-xs text-gray-500 font-medium">Date</p>
                <p className="text-sm text-gray-800">{new Date(order.order_date).toLocaleDateString("fr-FR")}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-indigo-50 p-3 rounded-lg">
              <Truck className="text-indigo-600" size={18} />
              <div>
                <p className="text-xs text-gray-500 font-medium">Livreur</p>
                <p className="text-sm text-gray-800">{order.driver.driver_name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-purple-50 p-3 rounded-lg">
              <User className="text-purple-600" size={18} />
              <div>
                <p className="text-xs text-gray-500 font-medium">Client</p>
                <p className="text-sm text-gray-800">{order.contact.telephone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-teal-50 p-3 rounded-lg">
              <MapPin className="text-indigo-600" size={18} />
              <div>
                <p className="text-xs text-gray-500 font-medium">Livraison</p>
                <p className="text-sm text-gray-800">{order.contact.adresse}</p>
              </div>
            </div>
          </div>
          

          <Separator className="my-4" />

          <div className="space-y-3">
            <h3 className="font-medium flex items-center text-gray-700">
              <ShoppingBag size={16} className="mr-2 text-blue-600" />
              Articles commandés
            </h3>

            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))` }}>
              {order.order_products.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={fileUrl+item.product.images[0].file_name}
                      alt={item.product.product_name}
                      className="w-12 h-12 object-cover rounded-md"
                    /> 
                    <div>
                      <p className="font-medium text-gray-800">{item.product.product_name}</p>
                      <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-blue-700">{item.product.price} FCFA</p>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
    <CardFooter className="flex justify-between border-t pt-6">
      <div>
        <p className="text-sm text-gray-500">Total: {calculateTotal()} FCFA</p>
      </div>
     
    </CardFooter>
  </Card>
   )
}