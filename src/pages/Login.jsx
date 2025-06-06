import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserIcon, LockIcon, TruckIcon } from 'lucide-react';
import axios from 'axios';
import speeda from '../assets/images/speeda.png';
export const LoginPage = () => {
  const [error, setError] = useState('');
  const [loading, setLoding] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onTouched'
  })
  const navigate = useNavigate();
  const Api_Url = import.meta.env.VITE_API_URL;
  const login = async (data) => {
    setLoding(true);
    try {
      const response = await axios.post(`${Api_Url}login`, data);
      const role = response.data.role?.nom_role;
      if (role === 'admin') {
        localStorage.setItem('isLogged', response.data.id);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('full_name', response.data.full_name);
        navigate('/accueil');
      } else {
        setError('Vous n\'avez pas les droits d\'accès');
      }
    } catch (error) {
      setError('Vos identifiants sont incorrects');
      console.error('Login error:', error);
    } finally {
      setLoding(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="py-3 text-center">
          <div className="flex justify-center">
            <img src={speeda} width={120} height={80} alt="" />
          </div>
        </div>
        <div className="py-2 px-8">
          {/* <h2 className="text-xl font-semibold text-gray-700 text-center mb-6">
            Connexion
          </h2> */}
          <form onSubmit={handleSubmit(login)}>
            {error && (
              <div className="bg-red-50 border text-center border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Login
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name='username'
                  {...register('username',
                    { required: 'Le login est requis' })
                  }
                  placeholder="Speed mali"
                />

              </div>
              {errors?.username && <span className='text-sm text-red-600'>{errors.username.message}</span>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon size={16} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name='password'
                  {...register('password',
                    {
                      required: 'Le mot de passe est requis',
                      minLength: { value: 8, message: 'Le mot de passe doit contenir au moins 8 caratères' },
                      maxLength: { value: 25, message: 'Le mot de passe ne doit pas depassé 25 caratères' }
                    })}
                  placeholder="••••••••"
                />

              </div>
              {errors?.password && <span className='text-sm text-red-600'>{errors.password.message}</span>}
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-700 text-white font-medium rounded-lg transition duration-200">
              {loading ? 'Connexion ... ' : 'Se connecter'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-orange-500 hover:underline">
              Mot de passe oublié?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;