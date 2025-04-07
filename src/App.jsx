import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';  // Changer l'extension pour .jsx
import Users from './pages/Users/index.jsx';  // Changer l'extension pour .jsx
import Stores from './pages/Stores';  // Changer l'extension pour .jsx
import Parametrages from './pages/Parametrages';  // Changer l'extension pour .jsx
import Layout from './components/Layout.jsx';  // Changer l'extension pour .jsx
import { ToastContainer, toast } from 'react-toastify';

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
          <Route path="stores" element={<Stores />} />
          <Route path="parametrages" element={<Parametrages />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
