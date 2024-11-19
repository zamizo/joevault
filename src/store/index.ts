import { create } from 'zustand';
import { ActionFigure, Accessory, Vehicle, Playset, Activity } from '../types';

interface CollectionStore {
  figures: ActionFigure[];
  accessories: Accessory[];
  vehicles: Vehicle[];
  playsets: Playset[];
  recentActivity: Activity[];
  addFigure: (figure: ActionFigure) => void;
  addAccessory: (accessory: Accessory) => void;
  addVehicle: (vehicle: Vehicle) => void;
  addPlayset: (playset: Playset) => void;
  updateFigure: (id: string, figure: Partial<ActionFigure>) => void;
  updateAccessory: (id: string, accessory: Partial<Accessory>) => void;
  updateVehicle: (id: string, vehicle: Partial<Vehicle>) => void;
  updatePlayset: (id: string, playset: Partial<Playset>) => void;
  deleteFigure: (id: string) => void;
  deleteAccessory: (id: string) => void;
  deleteVehicle: (id: string) => void;
  deletePlayset: (id: string) => void;
}

const MAX_ACTIVITY_ITEMS = 10;

// Load initial state from localStorage if available
const loadState = () => {
  try {
    const state = localStorage.getItem('collection-state');
    if (state) {
      const parsedState = JSON.parse(state);
      return {
        figures: parsedState.figures || [],
        accessories: parsedState.accessories || [],
        vehicles: parsedState.vehicles || [],
        playsets: parsedState.playsets || [],
        recentActivity: parsedState.recentActivity || [],
      };
    }
    return {
      figures: [],
      accessories: [],
      vehicles: [],
      playsets: [],
      recentActivity: [],
    };
  } catch {
    return {
      figures: [],
      accessories: [],
      vehicles: [],
      playsets: [],
      recentActivity: [],
    };
  }
};

const addActivity = (state: CollectionStore, type: ActivityType, itemType: 'figure' | 'accessory' | 'vehicle' | 'playset', itemName: string) => {
  const newActivity: Activity = {
    id: crypto.randomUUID(),
    type,
    itemType,
    itemName,
    timestamp: Date.now(),
  };

  return [newActivity, ...state.recentActivity].slice(0, MAX_ACTIVITY_ITEMS);
};

export const useCollectionStore = create<CollectionStore>((set) => ({
  ...loadState(),

  addFigure: (figure) =>
    set((state) => {
      const newState = {
        figures: [...state.figures, figure],
        recentActivity: addActivity(state, 'add', 'figure', figure.codeName),
      };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),

  addAccessory: (accessory) =>
    set((state) => {
      const newState = {
        accessories: [...state.accessories, accessory],
        recentActivity: addActivity(state, 'add', 'accessory', accessory.type),
      };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),

  addVehicle: (vehicle) =>
    set((state) => {
      const newState = {
        vehicles: [...state.vehicles, vehicle],
        recentActivity: addActivity(state, 'add', 'vehicle', vehicle.name),
      };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),

  addPlayset: (playset) =>
    set((state) => {
      const newState = {
        playsets: [...state.playsets, playset],
        recentActivity: addActivity(state, 'add', 'playset', playset.name),
      };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),

  updateFigure: (id, figure) =>
    set((state) => {
      const updatedFigure = state.figures.find(f => f.id === id);
      const newState = {
        figures: state.figures.map((f) =>
          f.id === id ? { ...f, ...figure } : f
        ),
        recentActivity: addActivity(state, 'update', 'figure', updatedFigure?.codeName || 'Unknown Figure'),
      };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),

  updateAccessory: (id, accessory) =>
    set((state) => {
      const updatedAccessory = state.accessories.find(a => a.id === id);
      const newState = {
        accessories: state.accessories.map((a) =>
          a.id === id ? { ...a, ...accessory } : a
        ),
        recentActivity: addActivity(state, 'update', 'accessory', updatedAccessory?.type || 'Unknown Accessory'),
      };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),

  updateVehicle: (id, vehicle) =>
    set((state) => {
      const updatedVehicle = state.vehicles.find(v => v.id === id);
      const newState = {
        vehicles: state.vehicles.map((v) =>
          v.id === id ? { ...v, ...vehicle } : v
        ),
        recentActivity: addActivity(state, 'update', 'vehicle', updatedVehicle?.name || 'Unknown Vehicle'),
      };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),

  updatePlayset: (id, playset) =>
    set((state) => {
      const updatedPlayset = state.playsets.find(p => p.id === id);
      const newState = {
        playsets: state.playsets.map((p) =>
          p.id === id ? { ...p, ...playset } : p
        ),
        recentActivity: addActivity(state, 'update', 'playset', updatedPlayset?.name || 'Unknown Playset'),
      };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),

  deleteFigure: (id) =>
    set((state) => {
      const deletedFigure = state.figures.find(f => f.id === id);
      const newState = {
        figures: state.figures.filter((f) => f.id !== id),
        recentActivity: addActivity(state, 'remove', 'figure', deletedFigure?.codeName || 'Unknown Figure'),
      };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),

  deleteAccessory: (id) =>
    set((state) => {
      const deletedAccessory = state.accessories.find(a => a.id === id);
      const newState = {
        accessories: state.accessories.filter((a) => a.id !== id),
        recentActivity: addActivity(state, 'remove', 'accessory', deletedAccessory?.type || 'Unknown Accessory'),
      };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),

  deleteVehicle: (id) =>
    set((state) => {
      const deletedVehicle = state.vehicles.find(v => v.id === id);
      const newState = {
        vehicles: state.vehicles.filter((v) => v.id !== id),
        recentActivity: addActivity(state, 'remove', 'vehicle', deletedVehicle?.name || 'Unknown Vehicle'),
      };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),

  deletePlayset: (id) =>
    set((state) => {
      const deletedPlayset = state.playsets.find(p => p.id === id);
      const newState = {
        playsets: state.playsets.filter((p) => p.id !== id),
        recentActivity: addActivity(state, 'remove', 'playset', deletedPlayset?.name || 'Unknown Playset'),
      };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),
}));