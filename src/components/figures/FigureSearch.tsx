import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { FigureData } from '../../types';

interface FigureSearchProps {
  figures: FigureData[];
  onSelect: (figure: FigureData) => void;
}

export function FigureSearch({ figures, onSelect }: FigureSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFigures = useMemo(() => {
    const searchLower = searchTerm.toLowerCase().trim();
    if (!searchLower) return [];

    return figures
      .filter(figure => {
        const codeName = String(figure["Code Name"]).toLowerCase();
        const realName = String(figure["Real Name"]).toLowerCase();
        return codeName.includes(searchLower) || realName.includes(searchLower);
      })
      .sort((a, b) => {
        const yearDiff = a["USA Year"] - b["USA Year"];
        if (yearDiff !== 0) return yearDiff;
        
        // Sort by version number (non-swivel arm before swivel arm)
        const aVersion = String(a["Version"]);
        const bVersion = String(b["Version"]);
        return aVersion.localeCompare(bVersion);
      })
      .slice(0, 10);
  }, [figures, searchTerm]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Search by code name or real name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {searchTerm.length > 0 && (
        <div className="bg-white shadow overflow-hidden rounded-md max-h-60 overflow-y-auto">
          <ul className="divide-y divide-gray-200">
            {filteredFigures.length > 0 ? (
              filteredFigures.map((figure, idx) => (
                <li
                  key={`${figure["Code Name"]}-${figure["Version"]}-${idx}`}
                  className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    onSelect(figure);
                    setSearchTerm('');
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-indigo-600">
                        {figure["Code Name"]}
                      </p>
                      <p className="text-sm text-gray-500">
                        {figure["Real Name"]} - {figure["Series"]}
                      </p>
                      <p className="text-sm text-gray-500">
                        {figure["Allegiance"]}
                        {figure["Sub Team"] && ` - ${figure["Sub Team"]}`}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {`v${figure["Version"]}`} ({figure["USA Year"]})
                      {figure["Has Swivel Arm"] && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          Swivel Arm
                        </span>
                      )}
                    </div>
                  </div>
                  {figure["Filecard Character Information"] && (
                    <p className="mt-1 text-sm text-gray-500 truncate">
                      Accessories: {figure["Filecard Character Information"]}
                    </p>
                  )}
                </li>
              ))
            ) : (
              <li className="px-6 py-4 text-sm text-gray-500 text-center">
                No figures found matching "{searchTerm}"
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}