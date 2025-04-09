import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, UsersIcon, ShoppingBagIcon, LogOutIcon, SettingsIcon, Building } from 'lucide-react';
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = [{
    path: '/accueil',
    icon: <HomeIcon size={20} />,
    label: 'Dashboard'
  }, {
    path: 'users',
    icon: <UsersIcon size={20} />,
    label: 'Utilisateurs'
  }
  , {
    path: 'etablissements',
    icon: <Building size={20} />,
    label: 'Etablissements'
  }, {
    path: 'produits',
    icon: <ShoppingBagIcon size={20} />,
    label: 'Produits'
  },
  {
    path: 'parametrages',
    icon: <SettingsIcon size={20} />,
    label: 'Paramétrages'
  }];
  const Logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }
  return <div className="w-64 bg-white shadow-lg h-full flex flex-col">
    <div className="p-4 border-b">
      <h1 className="text-2xl font-bold text-blue-600">Speeda</h1>
      <p className="text-sm text-gray-500">Système de livraison</p>
    </div>
    <nav className="flex-1 pt-6">
      <ul>
        {navItems.map(item => <li key={item.path}>
          <Link to={item.path} className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${location.pathname === item.path ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''}`}>
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        </li>)}
      </ul>
    </nav>
    <div className="p-4 border-t">
      <button
        onClick={() => Logout()}
        className="flex items-center text-gray-700 hover:text-blue-600 w-full"
      >
        <LogOutIcon size={20} className="mr-3" />
        Déconnexion
      </button>
    </div>
  </div>;
};
export default Sidebar;