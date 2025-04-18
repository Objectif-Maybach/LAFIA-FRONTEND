import { useEffect, useState } from "react";
import { UserIcon, FileText, CheckCircle, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { GetAllEtablissements } from "../../functions/Etablissement/Etablissements";
import { GetAllCategories } from "../../functions/Categorie/Categories";

const CategoryForm = ({ onClose, onSubmit, dataEdit }) => {
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm(
    { mode: "onTouched" }
  );
  
  const [etablissements, setEtablissements] = useState([]);
  const [categories, setCategories] = useState([]);
  const AllCategories = async () => {
    try {
      const response = await GetAllCategories();
      setCategories(response);
    } catch (error) {
      console.error(error);
      
    }
  };
  const AllEtablissements = async () => {
    try {
      const response = await GetAllEtablissements();
      setEtablissements(response);
    } catch (error) {
      console.error(error);

    }
  };
  useEffect(() => {
    AllCategories();
    AllEtablissements();
  }, []);
  useEffect(() => {
    if (dataEdit.length !== 0) {
      setValue('product_name', dataEdit?.product_name);
      setValue('description', dataEdit?.description);
      setValue('price', dataEdit?.price);
      setValue('establishment', dataEdit?.establishment);
      setValue('category', dataEdit?.category);
    }
  }, [dataEdit, setValue]);
  const AddStore = data => {
    onSubmit(data);
  };
  
  // console.log(getValues('product_name'), getValues('establishment'));
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
                  name="product_name"
                  {...register('product_name',
                    { required: 'Le nom du produit est obligatoire' })
                  }
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nom du produit"
                />
              </div>
              {errors?.product_name && <span className='text-sm text-red-600'>{errors.product_name.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix</label>
              <input
                type="number"
                name="price"
                {...register('price', { required: "Le prix est obligatoire" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Prix du produit"
              />
              {errors?.price && <span className='text-sm text-red-600'>{errors.price.message}</span>}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <div className="relative" >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText size={16} className="text-gray-400" />
              </div>
              <textarea
                type="text"
                name="description"
                id="description"
                rows={1}
                {...register('description',
                  { required: 'La description est obligatoire' })
                }
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=" Description"
              >
              </textarea>
            </div>
            {errors?.description && <span className='text-sm text-red-600'>{errors.description.message}</span>}
          </div>
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
            {errors?.image && <span className='text-sm text-red-600'>{errors.image.message}</span>}
          </div>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Etablissement</label>
              <select
                name="establishment"
                {...register('establishment',
                  { required: 'L\' etablissement est obligatoire' })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Choisir --</option>
                {etablissements.map(etab => (
                  <option selected={dataEdit?.establishment === etab.id} key={etab.id} value={etab.id}>
                    {etab.establishment_name}
                  </option>
                ))}
              </select>
              {errors?.establishment && <span className='text-sm text-red-600'>{errors.establishment.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categorie</label>
              <select
                name="category"
                {...register('category',
                  { required: 'La categorie est obligatoire' })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              > 
                <option value="">-- Choisir --</option>
                {categories.map(cat => (
                  <option selected={dataEdit?.category === cat.id} key={cat.id} value={cat.id}>
                    {cat.category_name}
                  </option>
                ))}
              </select>
              {errors?.category && <span className='text-sm text-red-600'>{errors.category.message}</span>}
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

export default CategoryForm;
