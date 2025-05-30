import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import { ShoppingBagIcon, UserIcon, TruckIcon, CreditCardIcon } from 'lucide-react';
import { GetDashboardData, GetFiveOrders, Percentage } from '../functions/dashboard/dashboard';
import Loader from '../components/loading/loader';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
const Dashboard = () => {
  const [nbrUsers, setNbrUsers] = useState(0);
  const [nbrOrders, setNbrOrders] = useState(0);
  const [nbrEts, setNbrEts] = useState(0);
  const [nbrLivreurs, setNbrLivreurs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [recentOrders, setRecentOrders] = useState([]);
  const [chartData, setChartData] = useState({
    series: [],
    labels: []
  });
  const getStatistique = async () => {
    try {
      setLoading(true);
      const response = await GetDashboardData();
      setNbrUsers(response.nbrUser);
      setNbrOrders(response.nbrCommandes);
      setNbrEts(response.nbrEtablissement);
      setNbrLivreurs(response.nbrChauffeur);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };
  const getFiveOrders = async () => {
    try {
      setLoading(true);
      const response = await GetFiveOrders();
      console.log('response', response);
      setRecentOrders(response);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };
  
  const getDureOrder = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} jour${days > 1 ? 's' : ''} ${hours % 24} heure${(hours % 24) > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} heure${hours > 1 ? 's' : ''} ${minutes % 60} minute${(minutes % 60) > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ${seconds % 60} seconde${(seconds % 60) > 1 ? 's' : ''}`;
    } else {
      return `${seconds} seconde${seconds > 1 ? 's' : ''}`;
    }
  };

  useEffect(() => {
    getStatistique();
    getFiveOrders();
    percentage();
  }, []);
  const percentage = async () => {
    try {
      setLoading(true);
      const response = await Percentage();
      setChartData({
        series: [
          parseFloat(response.delivered),
          parseFloat(response.pending),
          parseFloat(response.cancelled)
        ],
        labels: ['Livrées', 'En attente', 'Annulées']
      });
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };
  const chartOptions = {
    chart: {
      type: 'pie',
      backgroundColor: 'white',
    },
    title: {
      text: 'Ratio de commande en fonction des statuts',
      style: {
        fontSize: '18px',
        fontWeight: '600',
        color: 'black',
      },
    },
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
      pie: {
        innerSize: '65%',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            fontSize: '13px',
          },
        },
      },
    },
    colors: ['#10B981', '#F59E0B', '#EF4444'], // vert, orange, rouge
    series: [
      {
        name: 'Commandes',
        colorByPoint: true,
        data: chartData.labels.map((label, index) => ({
          name: label,
          y: chartData.series[index],
        })),
      },
    ],
    credits: {
      enabled: false,
    },
  };
  return (
    <div>
      {loading && (<Loader />)}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Tableau de bord
        </h1>
        <p className="text-gray-600">Aperçu des performances de livraison</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Commandes du jour" value={nbrOrders} icon={<ShoppingBagIcon className="text-white" size={24} />} color="bg-purple-500" />
        <StatCard title="Utilisateurs" value={nbrUsers} icon={<UserIcon className="text-white" size={24} />} color="bg-green-600" />
        <StatCard title="Livreurs" value={nbrLivreurs} icon={<TruckIcon className="text-white" size={24} />} color="bg-orange-500" />
        <StatCard title="Etablissements" value={nbrEts} icon={<ShoppingBagIcon className="text-white" size={24} />} color="bg-blue-500" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Commande récente</h2>
          <div className="space-y-4">
            {recentOrders.map(item => <div key={item} className="flex items-center p-3 border-b last:border-0">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <TruckIcon size={20} className="text-orange-500" />
              </div>
              <div>
                <p className="font-medium">Livreur:  {item?.driver?.driver_name}</p>
                <p className="text-sm text-gray-500">Il y a {getDureOrder(item?.created_at)}
                </p>
              </div>
              <div className="ml-auto">
                {item?.order_statut?.id === 1 ?
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    En attente
                  </span> : item?.order_statut?.id === 2 ? <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Complètée
                  </span> : item?.order_statut?.id === 3 ? <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                    Annulée
                  </span> : <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Non reconnue
                  </span>
                }
              </div>
            </div>)}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          {/*  <h2 className="text-lg font-medium mb-4">Performance par boutique</h2>
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
                  <div className="bg-green-500 h-2 rounded-full" style={{
                    width: `${85 - index * 7}%`
                  }}></div>
                </div>
              </div>
            </div>)}
          </div>*/}
            {chartData.series.length === 0 ? (
              <div className="flex items-center justify-center h-48">
                <p className="text-gray-500">Aucune donnée disponible</p>
              </div>
            ) : (
              <div className="h-72">
                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;