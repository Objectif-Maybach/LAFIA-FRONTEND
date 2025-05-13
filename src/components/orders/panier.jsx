import { useState, useEffect } from "react"
import { ShoppingCart, Trash2, ChevronRight } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"

export default function Panier({ calculateTotal, cart, removeFromCart, onSubmit }) {
  return (
    <div className="mt-12">
          <Card className="border-t-4 border-orange-500">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-orange-700 flex items-center">
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
                      <div key={item.product_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="bg-white p-2 rounded-md">
                            <ShoppingCart className="h-6 w-6 text-orange-500" />
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
              <Button className="bg-orange-500 hover:bg-orange-700" disabled={cart.length === 0} onClick={onSubmit}>
                Finaliser la commande
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
  )
}