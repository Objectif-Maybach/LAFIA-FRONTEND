import { useEffect, useState } from "react";
import { UserIcon, CheckCircle, X } from "lucide-react";
import { useForm } from "react-hook-form";

const StatutOrderForm = ({ onClose, onSubmit, dataEdit}) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm(
    {mode: "onTouched"}
  );

  const AddStatut = data => {
    onSubmit(data);
  };
  if (dataEdit.length != 0) {
  setValue('statut_name', dataEdit?.statut_name);
  setValue('description', dataEdit?.description);
  setValue('id', dataEdit?.id);
  }
  return (
    <div className="p-1">
      <form onSubmit={handleSubmit(AddStatut)}>
        <div className="gap-6 mb-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom  <span className="text-red-600">*</span>  </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="statut_name"
                {...register('statut_name',
                  { required: 'Le nom est obligatoire' })
                }
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nom de la catégorie"
              />
            </div>
            {errors?.statut_name && <span className='text-sm text-red-600'>{errors.statut_name.message}</span>}
          </div>
         
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <div className="relative w-full">
              <textarea
             
                name="description"
                {...register('description')
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Décrivez la catégorie..."
                rows={4}
              />
            </div>
            {errors?.description && <span className='text-sm text-red-600'>{errors.description.message}</span>}
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

export default StatutOrderForm;
