import React, { useEffect, useState } from 'react';
import { BellIcon, UserIcon } from 'lucide-react';
const Header = () => {
  const[username, setUsers] = useState('');
  const[full_name, setFull_name] = useState('');
  useEffect(() => {
    setUsers(localStorage.getItem('username'));
    setFull_name(localStorage.getItem('full_name'));
  })
  return <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
      <h2 className="text-lg font-medium">  Bienvenue, {full_name}</h2>
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-500 hover:text-blue-600 focus:outline-none">
          <BellIcon size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <UserIcon size={16} />
          </div>
          <span className="text-sm font-medium">{username}</span>
        </div>
      </div>
    </header>;
};
export default Header;