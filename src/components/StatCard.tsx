import React from 'react';
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}
const StatCard = ({
  title,
  value,
  icon,
  color
}: StatCardProps) => {
  return <div className="bg-white rounded-lg shadow p-6 flex items-center">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div className="ml-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>;
};
export default StatCard;