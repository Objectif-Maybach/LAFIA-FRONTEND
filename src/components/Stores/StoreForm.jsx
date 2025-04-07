import  React from "react"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"

const StoreForm = ({
  onClose,
  onSubmit,
  nomEtablissement = "",
  image: imageProp = "",
  cover_image: coverImageProp = "",
  type = "",
  address = "",
  // contact = "",
  distance = "",
  opening_hours = "",
  featured = false,
  description = "",
})=> {
  const [nom, setNom] = useState("")
  const [descript, setDescript] = useState("")
  const [img, setImg] = useState("")
  const [coverImg, setCoverImg] = useState("")
  const [typ, setTyp] = useState("")
  const [addres, setAddres] = useState("")
  const [phone, setPhone] = useState("")
  const [distances, setDistances] = useState("")
  const [openingHours, setOpeningHours] = useState("")
  const [feature, setFeature] = useState(false)

  useEffect(() => {
    if (nomEtablissement) {
      setNom(nomEtablissement)
    }
    if (imageProp) setImg(imageProp)
    if (coverImageProp) setCoverImg(coverImageProp)
    if (type) setTyp(type)
    if (address) setAddres(address)
      if (description) setDescript(description)
    if (phone) setPhone(phone)
    if (distance) setDistances(distance)
    if (opening_hours) setOpeningHours(opening_hours)
    if (featured !== undefined) setFeature(featured)
  }, [nomEtablissement, imageProp, coverImageProp, type, address, phone, distance, opening_hours, featured])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="nom">Nom</Label>
          <Input
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Nom de la catégorie"
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={descript}
            onChange={(e) => setDescript(e.target.value)}
            placeholder="Description de la catégorie"
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            placeholder="URL de l'image"
          />
        </div>
        <div>
          <Label htmlFor="coverImage">Image de couverture</Label>
          <Input
            id="coverImage"
            value={coverImg}
            onChange={(e) => setCoverImg(e.target.value)}
            placeholder="URL de l'image de couverture"
          />
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <Input
            id="type"
            value={typ}
            onChange={(e) => setTyp(e.target.value)}
            placeholder="Type d'établissement"
          />
        </div>
        <div>
          <Label htmlFor="address">Adresse</Label>
          <Input
            id="address"
            value={addres}
            onChange={(e) => setAddres(e.target.value)}
            placeholder="Adresse"
          />
        </div>
        <div>
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Numéro de téléphone"
          />
        </div>
        <div>
          <Label htmlFor="distance">Distance</Label>
          <Input
            id="distance"
            value={distances}
            onChange={(e) => setDistances(e.target.value)}
            placeholder="Distance"
          />
        </div>
        <div>
          <Label htmlFor="openingHours">Horaires d'ouverture</Label>
          <Input
            id="openingHours"
            value={openingHours}
            onChange={(e) => setOpeningHours(e.target.value)}
            placeholder="Ex : 08h - 20h"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            id="featured"
            type="checkbox"
            checked={feature}
            onChange={(e) => setFeature(e.target.checked)}
          />
          <Label htmlFor="featured">Mis en avant</Label>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <Button type="button" variant="outline" onClick={onClose}>
          Annuler
        </Button>
        <Button type="submit">Enregistrer</Button>
      </div>
    </form>
  )
}

export default StoreForm
