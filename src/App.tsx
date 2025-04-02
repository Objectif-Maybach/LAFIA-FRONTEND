import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard.tsx';
import Users from './pages/Users';
import Stores from './pages/Stores';
import Layout from './components/Layout';
import { ReactNode } from 'react';

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const isLogged = localStorage.getItem('isLogged');
  return isLogged ? children : <Navigate to="/" replace />;
};

export function App() {
  return <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/accueil" element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="stores" element={<Stores />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>;
}