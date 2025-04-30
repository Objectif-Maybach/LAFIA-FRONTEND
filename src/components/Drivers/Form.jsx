import { useEffect, useState } from "react";
import { UserIcon, PhoneIcon, MapPinIcon, CheckCircle, X } from "lucide-react";
import { useForm } from "react-hook-form";

const DriversForm = ({ onClose, onSubmit, dataEdit }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm(
    { mode: "onTouched" }
  );
 
  const AddUser = driver => {
    const formData = new FormData();
    formData.append("driver_name", driver.driver_name);
    formData.append("is_active", true);
    if(driver.piece.length > 0) {
    formData.append("piece", driver.piece[0]);
    }

    // Ajouter les champs imbriqués manuellement avec le bon préfixe
    formData.append("contact.telephone", driver.telephone);
    formData.append("contact.adresse", driver.adresse);
    onSubmit(formData);
  };
  useEffect(() => {
    if (dataEdit.length !== 0) {
      setValue('driver_name', dataEdit?.driver_name);
      setValue('telephone', dataEdit?.contact.telephone);
      setValue('adresse', dataEdit?.contact.adresse);
    }
  }, [dataEdit, setValue]);
   
  return (
    <div className="p-1">
      <form onSubmit={handleSubmit(AddUser)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom et Prénom</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="driver_name"
                {...register('driver_name',
                  { required: 'Le nom et prénom sont obligatoire' })
                }
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Jean"
              />
            </div>
            {errors?.driver_name && <span className='text-sm text-red-600'>{errors.driver_name.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PhoneIcon size={16} className="text-gray-400" />
              </div>
              <input
                type="tel"
                name="telephone"
                {...register('telephone',
                  { required: 'Le telephone est obligatoire' })
                }
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="06 12 34 56 78"
              />
            </div>
            {errors?.telephone && <span className='text-sm text-red-600'>{errors.telephone.message}</span>}

          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPinIcon size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="adresse"

                {...register('adresse',
                  { required: 'L\'adresse est obligatoire' })
                }
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123 Rue de la Paix, BKO"
              />
            </div>
            {errors?.adresse && <span className='text-sm text-red-600'>{errors.adresse.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Piece</label>
            <div className="relative">
             
              <input
                type="file"
                name="piece"
                id="piece"
                {...register('piece')
                }
                className="w-full pl-2 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="jean.dupont@example.com"
              />
            </div>
            {errors?.piece && <span className='text-sm text-red-600'>{errors.piece.message}</span>}
          </div>  
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
            <div className="relative" >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPinIcon size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="longitude"
                {...register('longitude',
                  { required: 'La longitude est obligatoire' })
                }
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="JeanD123"
              />
            </div>
            {errors?.longitude && <span className='text-sm text-red-600'>{errors.longitude.message}</span>}
          </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPinIcon size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="latitude"
                {...register("password", {
                  required: "La latitude est obligatoire"
                })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="JeanD123"
              />

            </div>
            {errors?.latitude && <span className='text-sm text-red-600'>{errors.latitude.message}</span>}
          </div> */}
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
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <CheckCircle size={18} className="mr-2" />
            Valider
          </button>
        </div>
      </form>
    </div>
  );
};

export default DriversForm;
