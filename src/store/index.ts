import { create } from 'zustand';
import { ActionFigure, Accessory, Vehicle, Playset } from '../types';

interface CollectionStore {
  figures: ActionFigure[];
  accessories: Accessory[];
  vehicles: Vehicle[];
  playsets: Playset[];
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

// Load initial state from localStorage if available
const loadState = () => {
  try {
    const state = localStorage.getItem('collection-state');
    return state ? JSON.parse(state) : {
      figures: [],
      accessories: [],
      vehicles: [],
      playsets: [],
    };
  } catch {
    return {
      figures: [],
      accessories: [],
      vehicles: [],
      playsets: [],
    };
  }
};

export const useCollectionStore = create<CollectionStore>((set) => ({
  ...loadState(),

  addFigure: (figure) =>
    set((state) => {
      const newState = { figures: [...state.figures, figure] };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),

  addAccessory: (accessory) =>
    set((state) => {
      const newState = { accessories: [...state.accessories, accessory] };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),

  addVehicle: (vehicle) =>
    set((state) => {
      const newState = { vehicles: [...state.vehicles, vehicle] };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),

  addPlayset: (playset) =>
    set((state) => {
      const newState = { playsets: [...state.playsets, playset] };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),

  updateFigure: (id, figure) =>
    set((state) => {
      const newState = {
        figures: state.figures.map((f) =>
          f.id === id ? { ...f, ...figure } : f
        ),
      };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),

  updateAccessory: (id, accessory) =>
    set((state) => {
      const newState = {
        accessories: state.accessories.map((a) =>
          a.id === id ? { ...a, ...accessory } : a
        ),
      };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),

  updateVehicle: (id, vehicle) =>
    set((state) => {
      const newState = {
        vehicles: state.vehicles.map((v) =>
          v.id === id ? { ...v, ...vehicle } : v
        ),
      };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),

  updatePlayset: (id, playset) =>
    set((state) => {
      const newState = {
        playsets: state.playsets.map((p) =>
          p.id === id ? { ...p, ...playset } : p
        ),
      };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),

  deleteFigure: (id) =>
    set((state) => {
      const newState = {
        figures: state.figures.filter((f) => f.id !== id),
      };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),

  deleteAccessory: (id) =>
    set((state) => {
      const newState = {
        accessories: state.accessories.filter((a) => a.id !== id),
      };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),

  deleteVehicle: (id) =>
    set((state) => {
      const newState = {
        vehicles: state.vehicles.filter((v) => v.id !== id),
      };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),

  deletePlayset: (id) =>
    set((state) => {
      const newState = {
        playsets: state.playsets.filter((p) => p.id !== id),
      };
      localStorage.setItem('collection-state', JSON.stringify({ ...state, ...newState }));
      return newState;
    }),
}));