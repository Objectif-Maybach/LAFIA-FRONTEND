import { useEffect, useState } from "react";
import { UserIcon, MailIcon, PhoneIcon, MapPinIcon, CheckCircle, X, Lock, User2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { GetRoles } from "../../functions/Users";

const CategoryForm = ({ onClose, onSubmit, dataEdit}) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm(
    {mode: "onTouched"}
  );

  const AddStore = data => {
    onSubmit(data);
  };
  if (dataEdit.length != 0) {
  setValue('nomEtablissement', dataEdit?.nom);
  setValue('image', dataEdit?.image);
  setValue('id', dataEdit?.id);
  setValue('cover_image', dataEdit?.cover_image);
  setValue('address', dataEdit?.address);
  setValue('distance', dataEdit?.distance);
  setValue('opening_hours', dataEdit?.opening_hours);
  setValue('description', dataEdit?.description);
  setValue('featured', dataEdit?.featured);
  setValue('contact', dataEdit?.id_contact);
  setValue('type', dataEdit?.id_type_etablissements);
  }
  return (
    <div className="p-1">
      <form onSubmit={handleSubmit(AddStore)}>
        <div className="gap-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="nom"
                  {...register('nom',
                    { required: 'Le nom est obligatoire' })
                  }
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nom de la catégorie"
                />
              </div>
              {errors?.nom && <span className='text-sm text-red-600'>{errors.nom.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <input
                type="text"
                name="address"
                {...register('address', { required: "L'adresse est obligatoire" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Adresse de l'établissement"
              />
              {errors?.address && <span className='text-sm text-red-600'>{errors.address.message}</span>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heures d'ouverture</label>
              <input
                type="text"
                name="opening_hours"
                {...register('opening_hours')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: 8h00 - 18h00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                {...register('description')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Décrivez l'établissement..."
                rows={2}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <input
                type="file"
                name="image"
                {...register('image')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="URL de l'image"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image de couverture</label>
              <input
                type="file"
                name="cover_image"
                {...register('cover_image')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="URL de l'image de couverture"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Distance</label>
              <input
                type="text"
                name="distance"
                {...register('distance')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Distance de l'établissement"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
              <input
                type="text"
                name="contact"
                {...register('contact')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contact de l'établissement"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type d'établissement</label>
              <input
                type="text"
                name="type"
                {...register('type')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type d'établissement"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">En vedette ?</label>
              <select
                name="featured"
                {...register('featured')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionnez</option>
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
          >
            <X size={18} className="mr-2" />
            Annuler
          </button>
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
          >
            <CheckCircle size={18} className="mr-2" />
            Valider
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
