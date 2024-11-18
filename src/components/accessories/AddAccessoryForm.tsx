import React, { useState } from 'react';
import { useCollectionStore } from '../../store';
import { AccessoryType } from '../../types';

interface AddAccessoryFormProps {
  onClose: () => void;
}

export function AddAccessoryForm({ onClose }: AddAccessoryFormProps) {
  const addAccessory = useCollectionStore((state) => state.addAccessory);
  const [formData, setFormData] = useState({
    type: 'Small Gun' as AccessoryType,
    color: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAccessory({
      id: crypto.randomUUID(),
      ...formData,
      associatedFigureIds: [],
      reusedMoldIds: [],
      photos: [],
    });
    onClose();
  };

  const accessoryTypes: AccessoryType[] = [
    'Large Gun',
    'Small Gun',
    'Backpack',
    'Helmet/Mask/Visor',
    'Knife/Dagger/Sword',
    'Bow/Crossbow',
    'Axe/Other sharp weapon',
    'Club and Other Blunt Weapons',
    'Missile Launcher',
    'Missile',
    'Stand',
    'Other',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Type
        </label>
        <select
          id="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as AccessoryType })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          {accessoryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="color" className="block text-sm font-medium text-gray-700">
          Color
        </label>
        <input
          type="text"
          id="color"
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Add Accessory
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