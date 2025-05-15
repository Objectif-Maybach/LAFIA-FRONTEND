import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, UsersIcon, MenuIcon, ShoppingBagIcon, LogOutIcon, SettingsIcon, Building, PackageIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [{
    path: '/accueil',
    icon: <HomeIcon size={20} />,
    label: 'Dashboard'
  }, {
    path: '/accueil/users',
    icon: <UsersIcon size={20} />,
    label: 'Utilisateurs'
  }
    , {
    path: '/accueil/etablissements',
    icon: <Building size={20} />,
    label: 'Etablissements'
  }, {
    path: '/accueil/produits',
    icon: <ShoppingBagIcon size={20} />,
    label: 'Produits'
  },
  {
    path: '/accueil/drivers',
    icon: <UsersIcon size={20} />,
    label: 'Livreurs'
  },
  {
    path: '/accueil/parametrages',
    icon: <SettingsIcon size={20} />,
    label: 'Paramétrages'
  },
  {
    path: '/accueil/commandes',
    icon: <PackageIcon size={20} />,
    label: 'Commandes'
  }
  ];
  const Logout = () => {
    localStorage.removeItem('isLogged');
    localStorage.removeItem('username');
    localStorage.removeItem('full_name');
    navigate('/');
  }
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  return (
    <>
      {/* Bouton menu mobile */}
      <div className="md:hidden p-4 bg-white shadow flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-500">Speeda</h1>
        <button onClick={toggleSidebar}>
          {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full z-40 w-64 bg-white shadow-lg flex flex-col transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
      >
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-orange-500">Speeda</h1>
          <p className="text-sm text-gray-500">Système de livraison</p>
        </div>
        <nav className="flex-1 pt-6">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 ${location.pathname === item.path
                      ? "bg-orange-50 text-orange-500 border-r-4 border-orange-500"
                      : ""
                    }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={() => {
              closeSidebar();
              Logout();
            }}
            className="flex items-center text-gray-700 hover:text-orange-500 w-full"
          >
            <LogOutIcon size={20} className="mr-3" />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Overlay quand le sidebar est ouvert sur mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}
    </>
  );
}
export default Sidebar;