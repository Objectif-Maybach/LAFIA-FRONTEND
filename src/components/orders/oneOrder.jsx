import { useState, useEffect } from "react"
import { ArrowLeft, Trash2, ChevronRight, Calendar, Truck, User, ShoppingBag, MapPin } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import no_image from '../../assets/images/no_image.png';
import { motion } from "framer-motion"
import { Separator } from "../ui/separator"
import { GetCommandeById } from "../../functions/Commandes/Commandes"



export default function OneOrder({ order, clean }) {
  const [orderData, setOrder] = useState([])
  const getCommande = async () => {
    try {
      const response = await GetCommandeById(order.id);
      console.log(response)
      setOrder(response);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  }
  useEffect(() => {
    getCommande();
  }, [])

  const fileUrl = import.meta.env.VITE_FILE_URL;
  const calculateTotal = () => {
    let total = 0;
    if (!orderData.order_products) {
      return total;
    }
    orderData.order_products.forEach(item => {
      total += item.product.price * item.quantity;
    });
    return total;
  }

  const [isHovering, setIsHovering] = useState(false)


  return (
    <Card className="border-t-4 border-orange-500">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-50">
        <div className="flex items-center justify-between">
          <div>
            < div className="flex justify-between items-center">

              <motion.div whileHover={{ x: -5 }} className="flex items-center">
                <div
                  className="mr-4 cursor-pointer hover:text-orange-700 transition-colors duration-200 bg-white p-2 rounded-full shadow-sm"
                  onClick={() => { clean() }}

                >
                  <ArrowLeft size={20} className={isHovering ? "text-orange-500" : ""} />
                </div>
              </motion.div>
              <CardTitle className="text-2xl text-orange-800 font-bold">Détail de la commande </CardTitle>


            </div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
            <Badge variant="outline" className="text-lg px-4 py-1.5 bg-orange-500 text-white border-orange-500 shadow-sm">
              {/* Total: {orderData.total.toLocaleString()} FCFA
                 */}
              Total : {calculateTotal()} FCFA
            </Badge>
          </motion.div>
        </div>
      </CardHeader>
      {orderData.order_products   ? (
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3 bg-orange-50 p-3 rounded-lg">
              <Calendar className="text-orange-500" size={18} />
              <div>
                <p className="text-xs text-gray-500 font-medium">Date</p>
                <p className="text-sm text-gray-800">{new Date(orderData.order_date).toLocaleDateString("fr-FR")}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-orange-50 p-3 rounded-lg">
              <Truck className="text-orange-600" size={18} />
              <div>
                <p className="text-xs text-gray-500 font-medium">Livreur</p>
                <p className="text-sm text-gray-800">{orderData.driver?.driver_name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-orange-50 p-3 rounded-lg">
              <User className="text-orange-600" size={18} />
              <div>
                <p className="text-xs text-gray-500 font-medium">Client</p>
                <p className="text-sm text-gray-800">{orderData.contact?.telephone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-teal-50 p-3 rounded-lg">
              <MapPin className="text-orange-600" size={18} />
              <div>
                <p className="text-xs text-gray-500 font-medium">Livraison</p>
                <p className="text-sm text-gray-800">{orderData.contact.adresse}</p>
              </div>
            </div>
          </div>


          <Separator className="my-4" />

          <div className="space-y-3">
            <h3 className="font-medium flex items-center text-gray-700">
              <ShoppingBag size={16} className="mr-2 text-orange-500" />
              Articles commandés
            </h3>

            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))` }}>
              {orderData.order_products.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.images.length > 0 ? fileUrl + item.product.images[0].file_name : no_image}
                      alt={item.product.product_name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{item.product.product_name}</p>
                      <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-orange-700">{item.product.price} FCFA</p>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>)
        : (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Chargement des détails de la commande...</p>
          </div>
        )}
      <CardFooter className="flex justify-between border-t pt-6">
        <div>
          <p className="text-sm text-gray-500">Total: {calculateTotal()} FCFA</p>
        </div>

      </CardFooter>
    </Card>
  )
}