import { useState, useEffect } from "react"
import { PlusIcon, MinusIcon, ShoppingCart, Trash2, ChevronRight } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { getAllDriver } from "../../functions/driver/getAllDriver"
import { getAllProduit } from "../../functions/Produit/getAllProduit"
import Panier from "../../components/orders/panier"
import { AddCommande } from "../../functions/Commandes/Commandes"
import { toast } from "react-toastify"
import Loader from "../loading/loader"

export default function AddOrders() {

  const [selectedProduct, setSelectedProduct] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState(0)
  const [type, setType] = useState("")
  // const [contact, setContact] = useState("")
  const [clientContact, setClientContact] = useState("")
  const [clientAddress, setClientAddress] = useState("")
  const [cart, setCart] = useState([])
  const [selectedDriver, setSelectedDriver] = useState('')
  const [products, setProducts] = useState([])
  const [drivers, setDrivers] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  const dataDriver = async () => {
    setIsLoading(true)
    const response = await getAllDriver();
    setDrivers(response)
    setIsLoading(false)
  }
  const dataProduct = async () => {
    setIsLoading(true)
    const response = await getAllProduit();
    setProducts(response)
    setIsLoading(false)
  }
  const clean = () => {
    setSelectedProduct("")
    setQuantity(1)
    setPrice(0)
    setType("")
    setClientContact("")
    setClientAddress("")
    setCart([])
    setSelectedDriver('')
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setIsLoading(true)
    
       if (!clientContact || !clientAddress) {
    toast.error("Veuillez remplir tous les champs obligatoires.");
    return;
  }
      const commandeData = {
        "contact": {
          "telephone": clientContact,
          "adresse": clientAddress
        },
        "driver": selectedDriver,
        "products": cart.map((item) => ({
          "id": item.product_id,
          "quantity": item.quantity,
          "price": item.price,
        })),
        "order_date": '2025-05-05 12:49:48',
        "order_statut": 1,
      }
      await AddCommande(commandeData)
      setIsLoading(false)
      clean()
      toast.success("Commande ajoutée avec succès")
       setError('');

    } catch (error) {
      console.error("Error adding commande:", error)
      toast.error("Erreur lors de l'ajout de la commande")
    }
    finally {
      setIsLoading(false)
    }

  }

  useEffect(() => {
    dataProduct()
    dataDriver()
  }, [])
  useEffect(() => {
    if (selectedProduct) {
      const product = products.find((p) => p.id === selectedProduct)
      if (product) {
        setPrice(product.price)
      }
    }
  }, [selectedProduct])

  // Add to cart
  const addToCart = () => {
    if (!selectedProduct || !quantity) {

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
      product_id: product.id,
      name: product.product_name,
      price: price,
      quantity: quantity,
      type: type,
    }
    if (cart.map(item => item.product_id).includes(product.id)) {
      const updatedCart = cart.map(item => {
        if (item.product_id === product.id) {
          return { ...item, quantity: item.quantity + quantity }
        }
        return item
      })
      setCart(updatedCart)
      return
    }
    setCart([...cart, newItem])

    setSelectedProduct("")
    setQuantity(1)
    setPrice(0)
    setType("")
  }

  // Remove from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div>
      {isLoading && (<Loader />)}
      <div className="container mx-auto py-8 px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-orange-50 to-indigo-50">
              <CardTitle className="text-xl text-orange-700">Passer une commande</CardTitle>
              <CardDescription>Sélectionnez vos produits et ajoutez-les au panier</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 ">
              <div className="space-y-4 relative">
                <div className="space-y-2">
                  <label htmlFor="product">Produit  <span className="text-red-600">*</span> </label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un produit" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg">
                      {/* Champ de recherche */}
                      <div className="p-2">
                        <input
                          type="text"
                          placeholder="Rechercher..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </div>

                      {/* Résultats filtrés */}
                      {filteredProducts.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.product_name} - {product.price} FCFA
                        </SelectItem>
                      ))}

                      {filteredProducts.length === 0 && (
                        <div className="p-2 text-sm text-gray-500">Aucun résultat</div>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantité  <span className="text-red-600">*</span> </Label>
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
                      readOnly
                      onChange={(e) => setPrice(Number.parseFloat(e.target.value) || 0)}
                      placeholder="Prix en FCFA"
                      disabled
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="w-full bg-orange-500 hover:bg-orange-700" onClick={addToCart}>
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
              <CardHeader className="bg-gradient-to-r from-orange-50 to-indigo-50">
                <CardTitle className="text-xl text-orange-700">Informations sur le client</CardTitle>
                <CardDescription>Détails du client pour la livraison</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientContact">Contact  <span className="text-red-600">*</span> </Label>
                    <Input
                      id="clientContact"
                      value={clientContact}
                      onChange={(e) => setClientContact(e.target.value)}
                      placeholder="Téléphone du client"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientAddress">Adresse  <span className="text-red-600">*</span> </Label>
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
              <CardHeader className="bg-gradient-to-r from-orange-50 to-indigo-50">
                <CardTitle className="text-xl text-orange-700">Informations sur le chauffeur</CardTitle>
                <CardDescription>Détails du chauffeur pour la livraison</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Label htmlFor="product" >Chauffeur</Label>
                  <Select
                    value={selectedDriver}
                    onValueChange={setSelectedDriver}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un chauffeur" />
                    </SelectTrigger>
                    <SelectContent className=" bg-white border shadow-lg">
                      {drivers.map((driver) => (
                        <SelectItem key={driver.id} value={driver.id}>
                          {driver.driver_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        <Panier
          calculateTotal={calculateTotal}
          cart={cart}
          removeFromCart={removeFromCart}
          onSubmit={handleSubmit}
        />


      </div>
    </div>
  )
}