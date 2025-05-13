import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';  // Changer l'extension pour .jsx
import Users from './pages/Users/index.jsx';  // Changer l'extension pour .jsx
import Produits from './pages/Produits/index.jsx';  // Changer l'extension pour .jsx
import Parametrages from './pages/Parametrages/index.jsx';  // Changer l'extension pour .jsx
import Driver from './pages/Drivers/index.jsx';  // Changer l'extension pour .jsx
import Layout from './components/Layout.jsx';  // Changer l'extension pour .jsx
import { ToastContainer, toast } from 'react-toastify';
import Etablissements from './pages/Etablissements/index.jsx';
import Commandes from './pages/Commandes/index.jsx'

// Fonction RequireAuth pour protéger les routes
const RequireAuth = ({ children }) => {
  const isLogged = localStorage.getItem('isLogged');
  if (isLogged && children === '/') {
    // Si l'utilisateur est déjà connecté et essaie d'accéder à la page de connexion, redirigez-le vers la page d'accueil 

    <Navigate to="/accueil" replace />;
  }
  return isLogged ? children : <Navigate to="/" replace />;
};

// Composant principal App avec routing
export function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/accueil" element={
          <RequireAuth>
            <Layout />
          </RequireAuth>

        }>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="etablissements" element={<Etablissements />} />
          <Route path="produits" element={<Produits />} />
          <Route path="parametrages" element={<Parametrages />} />
          <Route path="Commandes" element={<Commandes />} />
          <Route path="drivers" element={<Driver />} />

        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
