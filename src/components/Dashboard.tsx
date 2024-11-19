import React from 'react';
import { useCollectionStore } from '../store';
import { PieChart, BarChart2, Package, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const { figures, accessories, vehicles, playsets } = useCollectionStore();

  const stats = [
    { name: 'Total Figures', value: figures.length, icon: Users, href: '/figures' },
    { name: 'Total Accessories', value: accessories.length, icon: Package, href: '/accessories' },
    { name: 'Total Vehicles', value: vehicles.length, icon: BarChart2, href: '/vehicles' },
    { name: 'Total Playsets', value: playsets.length, icon: PieChart, href: '/playsets' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Collection Overview</h2>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              to={stat.href}
              className="group relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-lg"
            >
              <dt>
                <div className="absolute bg-indigo-500 rounded-md p-3 group-hover:bg-indigo-600 transition-colors">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate group-hover:text-gray-700">
                  {stat.name}
                </p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </dd>
              <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-sm">
                  <span className="font-medium text-indigo-600 hover:text-indigo-500">
                    View all<span className="sr-only"> {stat.name}</span>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Recent Activity
        </h3>
        <p className="text-gray-500">No recent activity to display.</p>
      </div>
    </div>
  );
}