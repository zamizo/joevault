import React from 'react';
import { useCollectionStore } from '../store';
import { PieChart, BarChart2, Package, Users, Plus, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ActivityType } from '../types';

export function Dashboard() {
  const { figures, accessories, vehicles, playsets, recentActivity } = useCollectionStore();

  const stats = [
    { name: 'Total Figures', value: figures.length, icon: Users, href: '/figures' },
    { name: 'Total Accessories', value: accessories.length, icon: Package, href: '/accessories' },
    { name: 'Total Vehicles', value: vehicles.length, icon: BarChart2, href: '/vehicles' },
    { name: 'Total Playsets', value: playsets.length, icon: PieChart, href: '/playsets' },
  ];

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'add':
        return <Plus className="h-5 w-5 text-green-500" />;
      case 'update':
        return <Pencil className="h-5 w-5 text-blue-500" />;
      case 'remove':
        return <Trash2 className="h-5 w-5 text-red-500" />;
    }
  };

  const getActivityMessage = (activity: typeof recentActivity[0]) => {
    const action = {
      add: 'Added',
      update: 'Updated',
      remove: 'Removed',
    }[activity.type];

    return `${action} ${activity.itemType} "${activity.itemName}"`;
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

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
        {recentActivity.length === 0 ? (
          <p className="text-gray-500">No recent activity to display.</p>
        ) : (
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivity.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== recentActivity.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                          {getActivityIcon(activity.type)}
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            {getActivityMessage(activity)}
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          {formatTimestamp(activity.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}