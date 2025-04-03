import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard.tsx';
import Users from './pages/Users';
import Stores from './pages/Stores';
import Layout from './components/Layout';
// import { ReactNode } from 'react';
import Parametrages from './pages/Parametrages/index.js';

// const RequireAuth = ({ children }: { children: ReactNode }) => {
//   const isLogged = localStorage.getItem('isLogged');
//   return isLogged ? children : <Navigate to="/" replace />;
// };

export function App() {
  return <Router>
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
    </Router>;
}