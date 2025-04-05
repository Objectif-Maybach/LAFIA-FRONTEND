import React, { useState } from 'react';
import { ShoppingBagIcon, MapPinIcon, PhoneIcon, ClockIcon } from 'lucide-react';
const StoreForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'restaurant',
    address: '',
    phone: '',
    openingTime: '',
    closingTime: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({ 
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Just for demonstration, no actual backend
    alert('Boutique ajoutée avec succès!');
    setFormData({
      name: '',
      type: 'restaurant',
      address: '',
      phone: '',
      openingTime: '',
      closingTime: ''
    });
  };
  return <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-6">Ajouter une boutique</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom de la boutique
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ShoppingBagIcon size={16} className="text-gray-400" />
              </div>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Le Petit Café" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type de boutique
            </label>
            <select name="type" value={formData.type} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="restaurant">Restaurant</option>
              <option value="epicerie">Épicerie</option>
              <option value="boulangerie">Boulangerie</option>
              <option value="pharmacie">Pharmacie</option>
              <option value="autre">Autre</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adresse
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPinIcon size={16} className="text-gray-400" />
              </div>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="45 Rue du Commerce, Paris" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PhoneIcon size={16} className="text-gray-400" />
              </div>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="01 23 45 67 89" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heure d'ouverture
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ClockIcon size={16} className="text-gray-400" />
                </div>
                <input type="time" name="openingTime" value={formData.openingTime} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heure de fermeture
              </label>
              <input type="time" name="closingTime" value={formData.closingTime} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 mr-2 hover:bg-gray-50">
            Annuler
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Ajouter la boutique
          </button>
        </div>
      </form>
    </div>;
};
export default StoreForm;