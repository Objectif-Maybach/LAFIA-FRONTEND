import { useEffect, useState } from "react";
import { UserIcon, PhoneIcon, MapPinIcon, CheckCircle, X, FileText } from "lucide-react";
import { useForm } from "react-hook-form";
import { GetAllTypeEtablissements } from "../../functions/TypeEtablissements";

const UserForm = ({ onClose, onSubmit, dataEdit }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm(
    { mode: "onTouched" }
  );
  const [types, setTypes] = useState([]);
  const AllTypes = async () => {
    try {
      const response = await GetAllTypeEtablissements();
      setTypes(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    AllTypes();
  }, []);
  const AddUser = etab => {
    const formData = new FormData();
    formData.append("establishment_name", etab.establishment_name);
    formData.append("description", etab.description);
    formData.append("is_active", true);
    if(etab.image.length > 0) {
    formData.append("image", etab.image[0]);
    }
    if(etab.cover_image.length > 0) {
    formData.append("cover_image", etab.cover_image[0]);
    }
    formData.append("establishment_type", etab.establishment_type);

    // Ajouter les champs imbriqués manuellement avec le bon préfixe
    formData.append("contact.telephone", etab.telephone);
    formData.append("contact.adresse", etab.adresse);
    console.log('object', formData.get('contact'));
    onSubmit(formData);
  };
  console.log(dataEdit?.establishment_type?.id);
  // if (dataEdit?.length != 0) {
  //   setValue('establishment_name', dataEdit?.establishment_name);
  //   setValue('description', dataEdit?.description);
  //   setValue('establishment_type', dataEdit?.establishment_type.id);
  //   setValue('telephone', dataEdit?.contact.telephone);
  //   setValue('adresse', dataEdit?.contact.adresse);
  // }
  return (
    <div className="p-1">
      <form onSubmit={handleSubmit(AddUser)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="establishment_name"
                defaultValue={dataEdit?.establishment_name}
                {...register('establishment_name',
                  { required: 'Le nom est obligatoire' })
                }
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Jean"
              />
            </div>
            {errors?.establishment_name && <span className='text-sm text-red-600'>{errors.establishment_name.message}</span>}
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telephone</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PhoneIcon size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="telephone"
                defaultValue={dataEdit?.contact?.telephone}
                {...register('telephone',
                  { required: 'Le telephone est obligatoire' })
                }
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123 Rue de la Paix, BKO"
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
                defaultValue={dataEdit?.contact?.adresse}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Type  </label>
            <select
              name="establishment_type"
              defaultValue={dataEdit?.establishment_type?.id}
              {...register('establishment_type',
                { required: 'Le type est obligatoire' })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {types.map(type => (
                <option key={type.id} value={type.id}>
                  {type.id}
                </option>
              ))}
            </select>
            {errors?.establishment_type && <span className='text-sm text-red-600'>{errors.establishment_type.message}</span>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <div className="relative" >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText size={16} className="text-gray-400" />
              </div>
              <textarea
                type="text"
                name="description"
                id="description"
                defaultValue={dataEdit?.description}
                rows={1}
                {...register('description',
                  { required: 'La description est obligatoire' })
                }
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
              >
              </textarea>
            </div>
            {errors?.description && <span className='text-sm text-red-600'>{errors.description.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <div className="relative">

              <input
                type="file"
                name="image"
                id="image"
                {...register('image')
                }
                className="w-full pl-2 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="jean.dupont@example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image de couverture</label>
            <div className="relative">

              <input
                type="file"
                name="cover_image"
                id="cover_image"
                {...register('cover_image')
                }
                className="w-full pl-2 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="jean.dupont@example.com"
              />
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

export default UserForm;
