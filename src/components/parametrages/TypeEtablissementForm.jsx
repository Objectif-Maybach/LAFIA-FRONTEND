import  React from "react"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"

const TypeEtablissementForm = ({
  onClose,
  onSubmit,
  nomTypeEtablissement = "",
}) => {
  const [nom, setNom] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (nomTypeEtablissement) {
      setNom(nomTypeEtablissement)
    }
  }, [nomTypeEtablissement])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Ici, vous pouvez ajouter la logique pour envoyer les données au serveur
    console.log({ nom, description })
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
            placeholder="Nom du type d'établissement"
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description du type d'établissement"
            rows={3}
          />
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

export default TypeEtablissementForm

