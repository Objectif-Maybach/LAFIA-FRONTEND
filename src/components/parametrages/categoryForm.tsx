"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Label } from "../../components/ui/label"

interface CategorieFormProps {
  onClose: () => void
  onSubmit: () => void
  nomCategorie?: string
}

const CategorieForm: React.FC<CategorieFormProps> = ({ onClose, onSubmit, nomCategorie = "" }) => {
  const [nom, setNom] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  useEffect(() => {
    if (nomCategorie) {
      setNom(nomCategorie)
    }
  }, [nomCategorie])

  const handleSubmit = (e: React.FormEvent) => {
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
            placeholder="Nom de la catégorie"
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description de la catégorie"
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

export default CategorieForm

