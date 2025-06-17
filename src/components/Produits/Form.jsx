import { useEffect, useState } from "react";
import { UserIcon, FileText, CheckCircle, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { GetAllEtablissements } from "../../functions/Etablissement/Etablissements";
import { GetAllCategories } from "../../functions/Categorie/Categories";
import Select from "react-select";

const ProductForm = ({ onClose, onSubmit, dataEdit, loading }) => {
  const { register, control, handleSubmit, setValue, getValues, formState: { errors } } = useForm(
    { mode: "onTouched" }
  );

  const [etablissements, setEtablissements] = useState([]);
  const [categories, setCategories] = useState([]);
  const AllCategories = async () => {
    try {
      loading(true);
      const response = await GetAllCategories();
      setCategories(response);
    } catch (error) {
      console.error(error);
    }
    finally {
      loading(false);
    } 
  };
  const AllEtablissements = async () => {
    try {
      loading(true);
      const response = await GetAllEtablissements();
      setEtablissements(response);
    } catch (error) {
      console.error(error);
    }
    finally {
      loading(false);
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
      setValue('establishment', dataEdit?.establishment?.id);
      setValue('category', dataEdit?.category?.id);
    }
  }, [dataEdit, setValue]);
  const AddStore = data => {
    const formData = new FormData();
    formData.append("product_name", data.product_name);
    formData.append("description", data.description);
    formData.append("price", data.price);

    if (data.product_images && data.product_images.length > 0) {
      for (let i = 0; i < data.product_images.length; i++) {
        formData.append("product_images[]", data.product_images[i]);
      }
    }
    formData.append("establishment", data.establishment);
    formData.append("category", data.category);
    console.log(data);

    onSubmit(formData);
  };
  const options = etablissements.map(etab => ({
    value: etab.id,
    label: etab.establishment_name 
  }));

  // console.log(getValues('product_name'), getValues('establishment'));
  return (
    <div className="p-1">
      <form onSubmit={handleSubmit(AddStore)}>
        <div className="gap-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom  <span className="text-red-600">*</span> </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix  <span className="text-red-600">*</span> </label>
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
                  {...register('description')
                  }
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder=" Description"
                >
                </textarea>
              </div>
              {errors?.description && <span className='text-sm text-red-600'>{errors.description.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categorie  <span className="text-red-600">*</span> </label>
              <Controller
                name="category"
                control={control}
                rules={{ required: "La catégorie est obligatoire" }}
                render={({ field }) => {
                  const selectedValue = categories.find(
                    (cat) => cat.id === field.value
                  );

                  return (
                    <Select
                      {...field}
                      value={selectedValue || null} // ceci permet de pré-sélectionner
                      options={categories}
                      getOptionLabel={(option) => option.category_name}
                      getOptionValue={(option) => option.id}
                      onChange={(selectedOption) =>
                        field.onChange(selectedOption ? selectedOption.id : null)
                      }
                      placeholder="-- Choisir --"
                      isClearable
                    />
                  );
                }}
              />
              {errors?.category && <span className='text-sm text-red-600'>{errors.category.message}</span>}
            </div>

          </div>
          {dataEdit.length === 0 &&
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Etablissement  <span className="text-red-600">*</span> </label>
                <Controller
                  name="establishment"
                  control={control}
                  rules={{ required: "L'établissement est obligatoire" }}
                  render={({ field }) => {
                    const selectedValue = etablissements.find(
                      (cat) => cat.id === field.value
                    );

                    return (
                      <Select
                        {...field}
                        value={selectedValue || null} // ceci permet de pré-sélectionner
                        options={etablissements}
                        getOptionLabel={(option) => option.establishment_name}
                        getOptionValue={(option) => option.id}
                        onChange={(selectedOption) =>
                          field.onChange(selectedOption ? selectedOption.id : null)
                        }
                        placeholder="-- Choisir --"
                        isClearable
                      />
                    );
                  }}
                />

                {errors?.establishment && <span className='text-sm text-red-600'>{errors.establishment.message}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <input
                  type="file"
                  name="product_images"
                  id="product_images"
                  {...register('product_images')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="URL de l'image" multiple
                />
                {errors?.product_images && <span className='text-sm text-red-600'>{errors.product_images.message}</span>}
              </div>
            </div>
          }
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
            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-sm"
          >
            <CheckCircle size={18} className="mr-2" />
            Valider
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
