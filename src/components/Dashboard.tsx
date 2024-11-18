import React from 'react';
import { useCollectionStore } from '../store';
import { PieChart, BarChart2, Package, Users } from 'lucide-react';

export function Dashboard() {
  const { figures, accessories, vehicles, playsets } = useCollectionStore();

  const stats = [
    { name: 'Total Figures', value: figures.length, icon: Users },
    { name: 'Total Accessories', value: accessories.length, icon: Package },
    { name: 'Total Vehicles', value: vehicles.length, icon: BarChart2 },
    { name: 'Total Playsets', value: playsets.length, icon: PieChart },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Collection Overview</h2>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
            >
              <dt>
                <div className="absolute bg-indigo-500 rounded-md p-3">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                  {stat.name}
                </p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </dd>
            </div>
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