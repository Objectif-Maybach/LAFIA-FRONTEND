"use client"

import { useState, useEffect } from "react"
import { PlusIcon, MinusIcon, ShoppingCart, Trash2, ChevronRight } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Badge } from "../../components/ui/badge"
// import { toast } from "../../components/ui/use-toast"
// import { toast } from "react-toastify"
import {getAllDriver} from "../../functions/driver/getAllDriver"
import {getAllProduit} from "../../functions/Produit/getAllProduit"

const CommandePage = () => {
  // Sample products data


  // State
  const [selectedProduct, setSelectedProduct] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState(0)
  const [type, setType] = useState("")
  const [contact, setContact] = useState("")
  const [clientContact, setClientContact] = useState("")
  const [clientAddress, setClientAddress] = useState("")
  const [driverContact, setDriverContact] = useState("")
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [driverName, setdriverName] = useState('')
  const [selectedDriver, setSelectedDriver] = useState('')
  const [products, setProducts] = useState([])


 const dataDriver = async ()=>{
  const response = await getAllDriver();
 }
 const dataProduct = async ()=>{
  const response = await getAllProduit();
  setProducts(response)


 }
  useEffect(() => {
    dataProduct()
    dataDriver()
    if (selectedProduct) {
      const product = products.find((p) => p.id === selectedProduct)
      if (product) {
        setPrice(product.price)
      }
    }
  }, [selectedProduct])

  // Add to cart
  const addToCart = () => {
    if (!selectedProduct || !quantity || !type || !contact) {
      // toast({
      //   title: "Erreur",
      //   description: "Veuillez remplir tous les champs obligatoires",
      //   variant: "destructive",
      // })
      return
    }

    const product = products.find((p) => p.id === selectedProduct)
    if (!product) return

    const newItem = {
      id: Date.now().toString(),
      productId: product.id,
      name: product.name,
      price: price,
      quantity: quantity,
      type: type,
    }

    setCart([...cart, newItem])

    // Reset form
    setSelectedProduct("")
    setQuantity(1)
    setPrice(0)
    setType("")

    // toast({
    //   title: "Produit ajouté",
    //   description: `${product.name} a été ajouté au panier`,
    // })
  }

  // Remove from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id))
    // toast({
    //   title: "Produit retiré",
    //   description: "Le produit a été retiré du panier",
    // })
  }

  // Calculate total
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-800">Gestion des commandes</h1>
          <p className="text-gray-500 mt-2">Passez une nouvelle commande et gérez votre panier</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl text-blue-700">Passer une commande</CardTitle>
              <CardDescription>Sélectionnez vos produits et ajoutez-les au panier</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 ">
            <div className="space-y-4 relative">
              <div className="space-y-2">
                <Label htmlFor="product">Produit</Label>
                <Select
                  value={selectedProduct}
                  onValueChange={setSelectedProduct}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un produit" />
                  </SelectTrigger>
                  <SelectContent className=" bg-white border shadow-lg">
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.product_name} - {product.price} FCFA
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantité</Label>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="rounded-r-none"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                        className="rounded-none text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                        className="rounded-l-none"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Prix unitaire (FCFA)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number.parseFloat(e.target.value) || 0)}
                      placeholder="Prix en FCFA"
                    />
                  </div>
                </div>

               

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact</Label>
                  <Input
                    id="contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Téléphone ou Email"
                  />
                </div>

                <div className="pt-4">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={addToCart}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Ajouter au panier
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Client and Driver Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-blue-700">Informations sur le client</CardTitle>
                <CardDescription>Détails du client pour la livraison</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientContact">Contact</Label>
                    <Input
                      id="clientContact"
                      value={clientContact}
                      onChange={(e) => setClientContact(e.target.value)}
                      placeholder="Téléphone du client"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientAddress">Adresse</Label>
                    <Input
                      id="clientAddress"
                      value={clientAddress}
                      onChange={(e) => setClientAddress(e.target.value)}
                      placeholder="Adresse de livraison"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-xl text-blue-700">Informations sur le chauffeur</CardTitle>
                <CardDescription>Détails du chauffeur pour la livraison</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
              <div className="space-y-2">
                <Label htmlFor="product">Chauffeur</Label>
                <Select
                  value={selectedDriver}
                  onValueChange={setSelectedDriver}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un chauffeur" />
                  </SelectTrigger>
                  <SelectContent className=" bg-white border shadow-lg">
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} - {product.price} FCFA
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Shopping Cart */}
        <div className="mt-12">
          <Card className="border-t-4 border-blue-500">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-blue-700 flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Panier
                  </CardTitle>
                  <CardDescription>
                    {cart.length === 0
                      ? "Votre panier est vide"
                      : `${cart.length} article${cart.length > 1 ? "s" : ""} dans votre panier`}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  Total: {calculateTotal().toLocaleString()} FCFA
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-4 text-gray-500">Votre panier est vide</p>
                  <p className="text-sm text-gray-400">Ajoutez des produits pour commencer</p>
                </div>
              ) : (
               
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="bg-white p-2 rounded-md">
                            <ShoppingCart className="h-6 w-6 text-blue-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <div className="text-sm text-gray-500">
                              <span>
                                {item.quantity} x {item.price} FCFA
                              </span>
                              <span className="mx-2">•</span>
                              <span className="capitalize">{item.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium">{(item.price * item.quantity).toLocaleString()} FCFA</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
             
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <div>
                <p className="text-sm text-gray-500">Sous-total: {calculateTotal().toLocaleString()} FCFA</p>
                <p className="text-sm text-gray-500">Livraison: À déterminer</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700" disabled={cart.length === 0}>
                Finaliser la commande
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CommandePage
