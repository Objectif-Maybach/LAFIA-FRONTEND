import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserIcon, LockIcon, TruckIcon } from 'lucide-react';
import axios from 'axios';
import {getAllProduit} from "../functions/Produit/getAllProduit"

export const LoginPage = () => {
  const [error, setError] = useState('');
  const [loading, setLoding] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onTouched'
  })
  getAllProduit()
  const navigate = useNavigate();
  const Api_Url = import.meta.env.VITE_API_URL;
  const login = async (data) => {
    // localStorage.setItem('isLogged', '145455656');
    // navigate('/accueil');*
    console.log(errors);
    setLoding(true);
    
    try {
      const response = await axios.post(`${Api_Url}login/`, data);
      localStorage.setItem('isLogged', response.data.user.id);
      navigate('/accueil');
    } catch (error) {
      setError(error);
      console.error('Login error:', error);
    } finally {
      setLoding(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 py-3 px-5 text-center">
          <div className="flex justify-center mb-2">
            <div className="bg-white p-3 rounded-full">
              <TruckIcon size={32} className="text-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Speeda </h1>
        </div>
        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-700 text-center mb-6">
            Connexion
          </h2>
          <form onSubmit={handleSubmit(login)}>
            {error && (
              <div className="bg-red-50 border text-center border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                Vos identifiants sont incorrects
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
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200">
              {loading ? 'Connexion ... ' : 'Se connecter'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Mot de passe oublié?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;