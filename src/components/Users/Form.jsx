import { useEffect, useState } from "react";
import { UserIcon, MailIcon, PhoneIcon, MapPinIcon, CheckCircle, X, Lock, User2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { GetRoles } from "../../functions/User/Users";

const UserForm = ({ onClose, onSubmit, dataEdit, loading }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm(
    { mode: "onTouched" }
  );
  const [roles, setRoles] = useState([]);
  const AllRoles = async () => {
    try {
      loading(true);
      const response = await GetRoles();
      setRoles(response);
    } catch (error) {
      console.error(error);
    }
    finally {
      loading(false);
    }
  };
  useEffect(() => {
    AllRoles();
  }, []);
  const AddUser = user => {
    let data =
    {
      username: user.username,
      full_name: user.full_name,
      email: user.email,
      password: user.password,
      role: user.role,
      contact: {
        is_active: true,
        telephone: user.telephone,
        adresse: user.adresse
      }
    }
    onSubmit(data);
  };
  if (dataEdit.length != 0) {
    useEffect(() =>{
      setValue('full_name', dataEdit?.full_name);
      setValue('username', dataEdit?.username);
      setValue('email', dataEdit?.email);
      setValue('telephone', dataEdit?.contact.telephone);
      setValue('adresse', dataEdit?.contact.adresse);
      setValue('role', dataEdit?.role?.id);
      setValue('password', dataEdit?.password);
    }, [dataEdit, setValue])
  }
  return (
    <div className="p-1">
      <form onSubmit={handleSubmit(AddUser)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom et Prénom</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="full_name"
                {...register('full_name',
                  { required: 'Le prénom est obligatoire' })
                }
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Jean"
              />
            </div>
            {errors?.full_name && <span className='text-sm text-red-600'>{errors.full_name.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom d'utilisateur</label>
            <div className="relative" >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User2 size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                name="username"
                {...register('username',
                  { required: 'Le nom d\'utilisateur est obligatoire' })
                }
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="JeanD123"
              />
            </div>
            {errors?.username && <span className='text-sm text-red-600'>{errors.username.message}</span>}
          </div>
          { dataEdit.length === 0 &&  (
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
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
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon size={16} className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                {...register('email',
                  { required: 'L\'email est obligatoire' })
                }
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="jean.dupont@example.com"
              />
            </div>
            {errors?.email && <span className='text-sm text-red-600'>{errors.email.message}</span>}
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

                {...register('adresse')
                }
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123 Rue de la Paix, BKO"
              />
            </div>
            {errors?.adresse && <span className='text-sm text-red-600'>{errors.adresse.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
            <select
              name="role"

              {...register('role',
                { required: 'Le rôle est obligatoire' })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            > 
              
              <option value="">-- Choisir --</option>
              {roles.map(role => (
                <option key={role.id} selected={dataEdit?.role?.id === role.id} value={role.id}>
                  {role.nom_role}
                </option>
              ))}
            </select>
             {errors?.role && <span className='text-sm text-red-600'>{errors.role.message}</span>}
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

export default UserForm;
