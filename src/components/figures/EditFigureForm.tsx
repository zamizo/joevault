import React, { useState } from 'react';
import { useCollectionStore } from '../../store';
import { CollectionStatus, PackageType, Condition, JointCondition, ScrewCondition, SaleStatus } from '../../types';
import { ImageUpload } from '../shared/ImageUpload';

interface EditFigureFormProps {
  onClose: () => void;
  figure: any;
}

export function EditFigureForm({ onClose, figure }: EditFigureFormProps) {
  const { updateFigure, deleteFigure } = useCollectionStore();
  const [formData, setFormData] = useState({
    codeName: figure.codeName,
    realName: figure.realName || '',
    series: figure.series || '',
    allegiance: figure.allegiance,
    subTeam: figure.subTeam || '',
    version: figure.version,
    usaYear: figure.usaYear,
    ukYear: figure.ukYear,
    packaging: figure.packaging || 'Carded' as PackageType,
    collectionStatus: figure.collectionStatus as CollectionStatus,
    hasFilecard: figure.hasFilecard || false,
    hasCardback: figure.hasCardback || false,
    isMintOnCard: figure.isMintOnCard || false,
    hasSwivel: figure.hasSwivel || false,
    photos: figure.photos || [],
    photoUrl: figure.photoUrl,
    fileCardInfo: figure.fileCardInfo || '',
    accessoryNotes: figure.accessoryNotes || '',
    saleStatus: figure.saleStatus || 'Not for Sale' as SaleStatus,
    paintCondition: figure.paintCondition || 'Mint' as Condition,
    joints: figure.joints || {
      leftShoulder: 'Tight' as JointCondition,
      rightShoulder: 'Tight' as JointCondition,
      leftElbow: 'Tight' as JointCondition,
      rightElbow: 'Tight' as JointCondition,
      leftKnee: 'Tight' as JointCondition,
      rightKnee: 'Tight' as JointCondition,
    },
    damage: figure.damage || {
      leftElbowCrack: 'No crack',
      rightElbowCrack: 'No crack',
      leftHandDamage: 'No Damage',
      rightHandDamage: 'No Damage',
      oRingChanged: null,
      backScrew: 'Good' as ScrewCondition,
      leftLegScrew: 'Good' as ScrewCondition,
      rightLegScrew: 'Good' as ScrewCondition,
    },
    conditionNotes: figure.conditionNotes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If status changed to "Not Owned", remove from collection
    if (formData.collectionStatus === 'Not Owned' && figure.collectionStatus !== 'Not Owned') {
      deleteFigure(figure.id);
      onClose();
      return;
    }

    // Update photoUrl to use the first uploaded photo if available
    const updatedData = {
      ...formData,
      photoUrl: formData.photos.length > 0 ? formData.photos[0] : formData.photoUrl
    };
    updateFigure(figure.id, updatedData);
    onClose();
  };

  const handleImagesChange = (photos: string[]) => {
    setFormData(prev => ({
      ...prev,
      photos,
      // Update photoUrl immediately when photos change
      photoUrl: photos.length > 0 ? photos[0] : prev.photoUrl
    }));
  };

  const handleCollectionStatusChange = (status: CollectionStatus) => {
    if (status === 'Not Owned') {
      if (window.confirm('Changing status to "Not Owned" will remove this figure from your collection. Are you sure?')) {
        setFormData({ ...formData, collectionStatus: status });
      }
    } else {
      setFormData({ ...formData, collectionStatus: status });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Edit Figure</h3>
        <p className="mt-1 text-sm text-gray-500">
          Update the figure's information
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Photos
          </label>
          <div className="mt-1">
            <ImageUpload
              images={formData.photos}
              onImagesChange={handleImagesChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
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
              onChange={(e) => setFormData({ ...formData, allegiance: e.target.value })}
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
              onChange={(e) => handleCollectionStatusChange(e.target.value as CollectionStatus)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="Not Owned">Not Owned</option>
              <option value="Owned">Owned</option>
              <option value="Wanted">Wanted</option>
            </select>
          </div>

          <div>
            <label htmlFor="saleStatus" className="block text-sm font-medium text-gray-700">
              Sale Status
            </label>
            <select
              id="saleStatus"
              value={formData.saleStatus}
              onChange={(e) => setFormData({ ...formData, saleStatus: e.target.value as SaleStatus })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="Not for Sale">Not for Sale</option>
              <option value="For Sale">For Sale</option>
            </select>
          </div>

          <div>
            <label htmlFor="paintCondition" className="block text-sm font-medium text-gray-700">
              Paint Condition
            </label>
            <select
              id="paintCondition"
              value={formData.paintCondition}
              onChange={(e) => setFormData({ ...formData, paintCondition: e.target.value as Condition })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="Mint">Mint</option>
              <option value="Good">Good</option>
              <option value="Normal Wear">Normal Wear</option>
              <option value="Below Average">Below Average</option>
              <option value="Beater">Beater</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Joint Conditions</label>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(formData.joints).map(([joint, condition]) => (
                <div key={joint}>
                  <label htmlFor={joint} className="block text-sm text-gray-700">
                    {joint.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </label>
                  <select
                    id={joint}
                    value={condition}
                    onChange={(e) => setFormData({
                      ...formData,
                      joints: { ...formData.joints, [joint]: e.target.value as JointCondition }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="Tight">Tight</option>
                    <option value="Normal">Normal</option>
                    <option value="Slightly Loose">Slightly Loose</option>
                    <option value="Very Loose">Very Loose</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Damage Assessment</label>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(formData.damage).map(([part, condition]) => (
                <div key={part}>
                  <label htmlFor={part} className="block text-sm text-gray-700">
                    {part.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </label>
                  <select
                    id={part}
                    value={condition || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      damage: { ...formData.damage, [part]: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    {part.includes('Screw') ? (
                      <>
                        <option value="Good">Good</option>
                        <option value="Rusty">Rusty</option>
                        <option value="Striped">Striped</option>
                      </>
                    ) : part === 'oRingChanged' ? (
                      <>
                        <option value="">Not Changed</option>
                        <option value="true">Changed</option>
                      </>
                    ) : (
                      <>
                        <option value="No Damage">No Damage</option>
                        <option value="Minor Damage">Minor Damage</option>
                        <option value="Major Damage">Major Damage</option>
                      </>
                    )}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="conditionNotes" className="block text-sm font-medium text-gray-700">
              Condition Notes
            </label>
            <textarea
              id="conditionNotes"
              value={formData.conditionNotes}
              onChange={(e) => setFormData({ ...formData, conditionNotes: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
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
            Save Changes
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