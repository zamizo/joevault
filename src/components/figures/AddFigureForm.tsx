import React, { useState } from 'react';
import { useCollectionStore } from '../../store';
import { CollectionStatus, PackageType } from '../../types';
import { FigureSearch } from './FigureSearch';
import { historicalFigures } from '../../data/figures/index';

interface AddFigureFormProps {
  onClose: () => void;
}

export function AddFigureForm({ onClose }: AddFigureFormProps) {
  const addFigure = useCollectionStore((state) => state.addFigure);
  const [formData, setFormData] = useState({
    codeName: '',
    realName: '',
    series: '',
    allegiance: 'G.I. Joe' as const,
    subTeam: '',
    version: '1',
    usaYear: new Date().getFullYear(),
    ukYear: new Date().getFullYear(),
    packaging: 'Carded' as PackageType,
    collectionStatus: 'Not Owned' as CollectionStatus,
    hasFilecard: false,
    hasCardback: false,
    isMintOnCard: false,
    hasSwivel: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFigure({
      id: crypto.randomUUID(),
      ...formData,
      fileCardInfo: '',
      accessoryIds: [],
      accessoryNotes: '',
      photos: [],
      saleStatus: 'Not for Sale',
      paintCondition: 'Mint',
      joints: {
        leftShoulder: 'Tight',
        rightShoulder: 'Tight',
        leftElbow: 'Tight',
        rightElbow: 'Tight',
        leftKnee: 'Tight',
        rightKnee: 'Tight',
      },
      damage: {
        leftElbowCrack: 'No crack',
        rightElbowCrack: 'No crack',
        leftHandDamage: 'No Damage',
        rightHandDamage: 'No Damage',
        oRingChanged: null,
        backScrew: 'Good',
        leftLegScrew: 'Good',
        rightLegScrew: 'Good',
      },
      conditionNotes: '',
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Add New Figure</h3>
        <p className="mt-1 text-sm text-gray-500">
          Search for a historical figure or enter details manually
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700">Search Historical Figures</h4>
          <p className="text-sm text-gray-500 mb-2">
            Select a figure to auto-fill the form with historical data
          </p>
          <FigureSearch 
            figures={historicalFigures}
            onSelect={(figure) => {
              setFormData(prev => ({
                ...prev,
                codeName: figure["Code Name"],
                realName: figure["Real Name"],
                series: figure["Series"],
                allegiance: figure.Allegiance as any,
                subTeam: String(figure["Sub Team"] || ''),
                version: String(figure.Version || '1'),
                usaYear: figure["USA Year"],
                ukYear: figure["USA Year"],
                hasSwivel: figure["Has Swivel Arm"] || false,
              }));
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 mt-4">
          <div>
            <label htmlFor="codeName" className="block text-sm font-medium text-gray-700">
              Code Name *
            </label>
            <input
              type="text"
              id="codeName"
              value={formData.codeName}
              onChange={(e) => setFormData({ ...formData, codeName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="realName" className="block text-sm font-medium text-gray-700">
              Real Name
            </label>
            <input
              type="text"
              id="realName"
              value={formData.realName}
              onChange={(e) => setFormData({ ...formData, realName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
            />
          </div>

          <div>
            <label htmlFor="allegiance" className="block text-sm font-medium text-gray-700">
              Allegiance *
            </label>
            <select
              id="allegiance"
              value={formData.allegiance}
              onChange={(e) => setFormData({ ...formData, allegiance: e.target.value as any })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="G.I. Joe">G.I. Joe</option>
              <option value="Cobra">Cobra</option>
              <option value="Iron Grenadiers">Iron Grenadiers</option>
              <option value="Oktober Guard">Oktober Guard</option>
            </select>
          </div>

          <div>
            <label htmlFor="subTeam" className="block text-sm font-medium text-gray-700">
              Sub Team
            </label>
            <input
              type="text"
              id="subTeam"
              value={formData.subTeam}
              onChange={(e) => setFormData({ ...formData, subTeam: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="version" className="block text-sm font-medium text-gray-700">
                Version
              </label>
              <input
                type="text"
                id="version"
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="usaYear" className="block text-sm font-medium text-gray-700">
                USA Year
              </label>
              <input
                type="number"
                id="usaYear"
                value={formData.usaYear}
                onChange={(e) => setFormData({ ...formData, usaYear: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="collectionStatus" className="block text-sm font-medium text-gray-700">
              Collection Status
            </label>
            <select
              id="collectionStatus"
              value={formData.collectionStatus}
              onChange={(e) => setFormData({ ...formData, collectionStatus: e.target.value as CollectionStatus })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="Not Owned">Not Owned</option>
              <option value="Owned">Owned</option>
              <option value="Wanted">Wanted</option>
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hasFilecard"
                checked={formData.hasFilecard}
                onChange={(e) => setFormData({ ...formData, hasFilecard: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="hasFilecard" className="ml-2 block text-sm text-gray-700">
                Has Filecard
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hasCardback"
                checked={formData.hasCardback}
                onChange={(e) => setFormData({ ...formData, hasCardback: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="hasCardback" className="ml-2 block text-sm text-gray-700">
                Has Cardback
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isMintOnCard"
                checked={formData.isMintOnCard}
                onChange={(e) => setFormData({ ...formData, isMintOnCard: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="isMintOnCard" className="ml-2 block text-sm text-gray-700">
                Mint On Card
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hasSwivel"
                checked={formData.hasSwivel}
                onChange={(e) => setFormData({ ...formData, hasSwivel: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="hasSwivel" className="ml-2 block text-sm text-gray-700">
                Has Swivel Arm Battle Grip
              </label>
            </div>
          </div>
        </div>

        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Add Figure
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}