import {CheckCircle, X, Lock } from "lucide-react";
import { useForm } from "react-hook-form";

const ResetForm = ({ onClose, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm(
    { mode: "onTouched" }
  );
  const AddUser = user => {
    onSubmit(user);
  };
  return (
    <div className="p-1">
      <form onSubmit={handleSubmit(AddUser)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe  <span className="text-red-600">*</span> </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="password"
                {...register("password", {
                  required: "Le mot de passe est obligatoire"
                })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="JeanD123"
              />

            </div>
            {errors?.password && <span className='text-sm text-red-600'>{errors.password.message}</span>}
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

export default ResetForm;
