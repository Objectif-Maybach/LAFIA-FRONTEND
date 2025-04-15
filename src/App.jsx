import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';  // Changer l'extension pour .jsx
import Users from './pages/Users/index.jsx';  // Changer l'extension pour .jsx
import Produits from './pages/Produits/index.jsx';  // Changer l'extension pour .jsx
import Parametrages from './pages/Parametrages';  // Changer l'extension pour .jsx
import Driver from './pages/Driver/index.jsx';  // Changer l'extension pour .jsx
import Layout from './components/Layout.jsx';  // Changer l'extension pour .jsx
import { ToastContainer, toast } from 'react-toastify';
import Etablissements from './pages/Etablissements/index.jsx';

// Fonction RequireAuth pour protéger les routes
// const RequireAuth = ({ children }) => {
//   const isLogged = localStorage.getItem('isLogged');
//   return isLogged ? children : <Navigate to="/" replace />;
// }; 

// Composant principal App avec routing
export function App() {
  return (
    <Router>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/accueil" element={
        
            <Layout />
        
        }>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="etablissements" element={<Etablissements />} />
          <Route path="produits" element={<Produits />} />
          <Route path="parametrages" element={<Parametrages />} />
          <Route path="drivers" element={<Driver />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
