import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import { ShoppingBagIcon, UserIcon, TruckIcon, CreditCardIcon } from 'lucide-react';
import { GetAllUsers } from '../functions/User/Users';
import { GetAllCommandes } from '../functions/Commandes/Commandes';
const Dashboard = () => {
  const [nbrUsers, setNbrUsers] = useState(0);
  const [nbrOrders, setNbrOrders] = useState(0);
  const getCountUsers = async () => {
    try {
      const response = await GetAllUsers();
      setNbrUsers(response.length);
    } catch (error) {
      console.error(error);
    }
  };
  const getCountOrders = async () => {
    try {
      const response = await GetAllCommandes();
      setNbrOrders(response.length);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCountUsers();
    getCountOrders();
  },[]);

  return <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Tableau de bord
        </h1>
        <p className="text-gray-600">Aperçu des performances de livraison</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Commandes totales" value="1,284" icon={<ShoppingBagIcon className="text-white" size={24} />} color="bg-blue-600" />
        <StatCard title="Utilisateurs" value={nbrUsers} icon={<UserIcon className="text-white" size={24} />} color="bg-green-600" />
        <StatCard title="Livraisons en cours" value="42" icon={<TruckIcon className="text-white" size={24} />} color="bg-orange-500" />
        <StatCard title="Revenus" value="9,254 €" icon={<CreditCardIcon className="text-white" size={24} />} color="bg-purple-600" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Activité récente</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(item => <div key={item} className="flex items-center p-3 border-b last:border-0">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <TruckIcon size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Commande #{1000 + item}</p>
                  <p className="text-sm text-gray-500">
                    Livrée à Paris, il y a {item} heure{item > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Complétée
                  </span>
                </div>
              </div>)}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Performance par boutique</h2>
          <div className="space-y-4">
            {['Boulangerie Petit Pain', 'Épicerie Bio', 'Restaurant Le Gourmet', 'Pharmacie Centrale', 'Librairie Page'].map((shop, index) => <div key={index} className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{shop}</span>
                    <span className="text-sm text-gray-500">
                      {85 - index * 7}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{
                  width: `${85 - index * 7}%`
                }}></div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};
export default Dashboard;