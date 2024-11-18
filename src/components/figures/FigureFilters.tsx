import React from 'react';
import { Allegiance, CollectionStatus } from '../../types';

interface FigureFiltersProps {
  yearFilter: number | null;
  allegianceFilter: Allegiance | null;
  collectionStatusFilter: CollectionStatus | null;
  onYearChange: (year: number | null) => void;
  onAllegianceChange: (allegiance: Allegiance | null) => void;
  onCollectionStatusChange: (status: CollectionStatus | null) => void;
}

export function FigureFilters({
  yearFilter,
  allegianceFilter,
  collectionStatusFilter,
  onYearChange,
  onAllegianceChange,
  onCollectionStatusChange,
}: FigureFiltersProps) {
  const years = Array.from(new Set([1982, 1983, 1984, 1985, 1986]));
  const allegiances: Allegiance[] = [
    'G.I. Joe',
    'Cobra',
    'Iron Grenadiers',
    'Oktober Guard',
  ];
  const collectionStatuses: CollectionStatus[] = [
    'Not Owned',
    'Owned',
    'Wanted'
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Filter by Year
          </label>
          <select
            id="year"
            value={yearFilter || ''}
            onChange={(e) => onYearChange(e.target.value ? Number(e.target.value) : null)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="allegiance" className="block text-sm font-medium text-gray-700">
            Filter by Allegiance
          </label>
          <select
            id="allegiance"
            value={allegianceFilter || ''}
            onChange={(e) => onAllegianceChange(e.target.value as Allegiance || null)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Allegiances</option>
            {allegiances.map((allegiance) => (
              <option key={allegiance} value={allegiance}>
                {allegiance}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="collectionStatus" className="block text-sm font-medium text-gray-700">
            Filter by Collection Status
          </label>
          <select
            id="collectionStatus"
            value={collectionStatusFilter || ''}
            onChange={(e) => onCollectionStatusChange(e.target.value as CollectionStatus || null)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Statuses</option>
            {collectionStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}