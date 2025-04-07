import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Label } from "../../components/ui/label"

interface StoreFormProps {
  onClose: () => void
  onSubmit: () => void
  nomEtablissement?: string
  image?: string
  cover_image?: string
  type?: string
  address?: string
  phone?: string
  distance?: string
  opening_hours?: string
  description?: string
  featured?: boolean
}

const StoreForm: React.FC<StoreFormProps> = ({
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
  const [nom, setNom] = useState<string>("")
  const [descript, setDescript] = useState<string>("")
  const [img, setImg] = useState<string>("")
  const [coverImg, setCoverImg] = useState<string>("")
  const [typ, setTyp] = useState<string>("")
  const [addres, setAddres] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [distances, setDistances] = useState<string>("")
  const [openingHours, setOpeningHours] = useState<string>("")
  const [feature, setFeature] = useState<boolean>(false)

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

  const handleSubmit = (e: React.FormEvent) => {
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
