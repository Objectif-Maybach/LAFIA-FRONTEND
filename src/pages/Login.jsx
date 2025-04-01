import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, LockIcon, TruckIcon } from 'lucide-react';
import axios from 'axios';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const Api_Url = import.meta.env.VITE_API_URL;
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      username: email,
      password: password
    }
    let response ;
    try {
       response = axios.post(`${Api_Url}login/`, data
      );
      if(response){ 
        console.log(response);
        localStorage.setItem('isLogged', response.data);
        navigate('/accueil');
      }else {
        console.log(response);
      }
    } catch (error) {
     console.log(error);
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 py-6 px-8 text-center">
          <div className="flex justify-center mb-2">
            <div className="bg-white p-3 rounded-full">
              <TruckIcon size={32} className="text-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Speeda </h1>
          <p className="text-blue-100">Système de gestion de livraison</p>
        </div>
        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-700 text-center mb-6">
            Connexion
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Login
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon size={16} className="text-gray-400" />
                </div>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="votre@email.com" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon size={16} className="text-gray-400" />
                </div>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" />
              </div>
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200">
              Se connecter
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Mot de passe oublié?
            </a>
          </div>
        </div>
      </div>
    </div>;
};
export default Login;