import React, { useState, useMemo } from 'react';
import { useCollectionStore } from '../../store';
import { Plus, LayoutGrid, List } from 'lucide-react';
import { Modal } from '../shared/Modal';
import { AddFigureForm } from './AddFigureForm';
import { EditFigureForm } from './EditFigureForm';
import { FigureFilters } from './FigureFilters';
import { Allegiance, CollectionStatus } from '../../types';
import { historicalFigures } from '../../data/figures';
import placeholderImage from '@/assets/images/placeholder-figure.svg';

type ViewMode = 'grid' | 'list';

export function FiguresList() {
  const { figures, addFigure } = useCollectionStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingFigure, setEditingFigure] = useState<any>(null);
  const [yearFilter, setYearFilter] = useState<number | null>(null);
  const [allegianceFilter, setAllegianceFilter] = useState<Allegiance | null>(null);
  const [collectionStatusFilter, setCollectionStatusFilter] = useState<CollectionStatus | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const displayFigures = useMemo(() => {
    // Combine user figures and historical figures
    const allFigures = [
      ...figures.map(f => ({ ...f, isHistorical: false })),
      ...historicalFigures
        .filter(hf => !figures.some(f => 
          f.codeName === hf["Code Name"] && 
          f.version === hf["Version"] &&
          f.usaYear === hf["USA Year"]
        ))
        .map(hf => ({
          id: undefined,
          codeName: hf["Code Name"],
          realName: hf["Real Name"],
          series: hf["Series"],
          allegiance: hf["Allegiance"],
          subTeam: hf["Sub Team"] || '',
          version: hf["Version"],
          usaYear: hf["USA Year"],
          ukYear: hf["USA Year"],
          hasSwivel: hf["Has Swivel Arm"] || false,
          collectionStatus: 'Not Owned' as CollectionStatus,
          isHistorical: true
        }))
    ];

    return allFigures.filter(figure => {
      const matchesYear = !yearFilter || figure.usaYear === yearFilter;
      const matchesAllegiance = !allegianceFilter || figure.allegiance === allegianceFilter;
      const matchesStatus = !collectionStatusFilter || figure.collectionStatus === collectionStatusFilter;
      return matchesYear && matchesAllegiance && matchesStatus;
    });
  }, [figures, yearFilter, allegianceFilter, collectionStatusFilter]);

  const handleAddToCollection = (historicalFigure: any) => {
    addFigure({
      id: crypto.randomUUID(),
      codeName: historicalFigure.codeName,
      realName: historicalFigure.realName,
      series: historicalFigure.series,
      allegiance: historicalFigure.allegiance,
      subTeam: historicalFigure.subTeam,
      version: historicalFigure.version,
      usaYear: historicalFigure.usaYear,
      ukYear: historicalFigure.ukYear,
      hasSwivel: historicalFigure.hasSwivel,
      collectionStatus: 'Owned',
      hasFilecard: false,
      hasCardback: false,
      isMintOnCard: false,
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
  };

  const handleEdit = (figure: any) => {
    setEditingFigure(figure);
  };

  const getFigureImage = (figure: any) => {
    if (!figure.isHistorical && figure.photos && figure.photos.length > 0) {
      return figure.photos[0];
    }
    return placeholderImage;
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-2xl font-bold text-gray-900">Action Figures</h2>
          <p className="mt-2 text-sm text-gray-700">
            Manage your GI Joe action figure collection
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none flex items-center gap-4">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid'
                  ? 'bg-white shadow text-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${
                viewMode === 'list'
                  ? 'bg-white shadow text-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              title="List View"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Figure
          </button>
        </div>
      </div>

      <div className="mt-8">
        <FigureFilters
          yearFilter={yearFilter}
          allegianceFilter={allegianceFilter}
          collectionStatusFilter={collectionStatusFilter}
          onYearChange={setYearFilter}
          onAllegianceChange={setAllegianceFilter}
          onCollectionStatusChange={setCollectionStatusFilter}
        />
      </div>

      {viewMode === 'list' ? (
        <div className="mt-8 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Photo
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Code Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Real Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Series
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Version
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Allegiance
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Year
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {displayFigures.map((figure, idx) => (
                      <tr key={figure.id || `${figure.codeName}-${figure.version}-${idx}`}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <img
                            src={getFigureImage(figure)}
                            alt={figure.codeName}
                            className="h-12 w-12 object-cover rounded"
                          />
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {figure.codeName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {figure.realName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {figure.series}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          v{figure.version}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {figure.allegiance}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {figure.usaYear}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {figure.collectionStatus}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          {figure.isHistorical ? (
                            <button
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={() => handleAddToCollection(figure)}
                            >
                              Add to Collection
                            </button>
                          ) : (
                            <button
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={() => handleEdit(figure)}
                            >
                              Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayFigures.map((figure, idx) => (
            <div
              key={figure.id || `${figure.codeName}-${figure.version}-${idx}`}
              className="relative bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="aspect-w-3 aspect-h-4">
                <img
                  src={getFigureImage(figure)}
                  alt={figure.codeName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{figure.codeName}</h3>
                <p className="text-sm text-gray-500">{figure.realName}</p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-500">Series: {figure.series}</p>
                  <p className="text-sm text-gray-500">Version: v{figure.version}</p>
                  <p className="text-sm text-gray-500">Allegiance: {figure.allegiance}</p>
                  <p className="text-sm text-gray-500">Year: {figure.usaYear}</p>
                  <p className="text-sm text-gray-500">Status: {figure.collectionStatus}</p>
                </div>
                <div className="mt-4">
                  {figure.isHistorical ? (
                    <button
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => handleAddToCollection(figure)}
                    >
                      Add to Collection
                    </button>
                  ) : (
                    <button
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => handleEdit(figure)}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Figure"
      >
        <AddFigureForm onClose={() => setIsAddModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={editingFigure !== null}
        onClose={() => setEditingFigure(null)}
        title="Edit Figure"
      >
        {editingFigure && (
          <EditFigureForm
            figure={editingFigure}
            onClose={() => setEditingFigure(null)}
          />
        )}
      </Modal>
    </div>
  );
}