import React, { useState } from 'react';
import { useCollectionStore } from '../../store';

interface AddPlaysetFormProps {
  onClose: () => void;
}

export function AddPlaysetForm({ onClose }: AddPlaysetFormProps) {
  const addPlayset = useCollectionStore((state) => state.addPlayset);
  const [formData, setFormData] = useState({
    name: '',
    series: '',
    allegiance: 'G.I. Joe',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPlayset({
      id: crypto.randomUUID(),
      ...formData,
      usaYear: new Date().getFullYear(),
      ukYear: new Date().getFullYear(),
      version: 1,
      packaging: 'Packaged with Playset',
      associatedFigureIds: [],
      photos: [],
      collectionStatus: 'Not Owned',
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="series" className="block text-sm font-medium text-gray-700">
          Series
        </label>
        <input
          type="text"
          id="series"
          value={formData.series}
          onChange={(e) => setFormData({ ...formData, series: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="allegiance" className="block text-sm font-medium text-gray-700">
          Allegiance
        </label>
        <select
          id="allegiance"
          value={formData.allegiance}
          onChange={(e) => setFormData({ ...formData, allegiance: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="G.I. Joe">G.I. Joe</option>
          <option value="Cobra">Cobra</option>
        </select>
      </div>

      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Add Playset
        </button>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}