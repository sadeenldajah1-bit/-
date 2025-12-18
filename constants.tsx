
import { Department } from './types';

export const INITIAL_DEPARTMENTS: Department[] = [
  { id: '1', code: 'D1', name: 'Raw Material Receiving & Handling', currentArea: 70, neededArea: 56, aislesArea: 25, workstationsArea: 31, importance: 'A' },
  { id: '2', code: 'D2', name: 'Preparation & Cooking', currentArea: 210, neededArea: 180, aislesArea: 75, workstationsArea: 105, importance: 'A' },
  { id: '3', code: 'D3', name: 'Thermal Processing / Pasteurization', currentArea: 45, neededArea: 56, aislesArea: 31, workstationsArea: 25, importance: 'A' },
  { id: '4', code: 'D4', name: 'Homogenization', currentArea: 30, neededArea: 40, aislesArea: 22, workstationsArea: 18, importance: 'A' },
  { id: '5', code: 'D5', name: 'Filling & Capping', currentArea: 90, neededArea: 115, aislesArea: 66, workstationsArea: 49, importance: 'A' },
  { id: '6', code: 'D6', name: 'Inspection & Drying', currentArea: 60, neededArea: 72, aislesArea: 43, workstationsArea: 28, importance: 'E' },
  { id: '7', code: 'D7', name: 'Labeling & Date Printing', currentArea: 60, neededArea: 58, aislesArea: 36, workstationsArea: 22, importance: 'I' },
  { id: '8', code: 'D8', name: 'Case Packing', currentArea: 95, neededArea: 119, aislesArea: 66, workstationsArea: 53, importance: 'A' },
  { id: '9', code: 'D9', name: 'Cold Storage (Finished Products)', currentArea: 165, neededArea: 100, aislesArea: 54, workstationsArea: 46, importance: 'A' }
];

export const SLP_COLORS = {
  'A': '#ef4444', 
  'E': '#f97316', 
  'I': '#eab308', 
  'O': '#22c55e', 
  'U': '#94a3b8', 
  'X': '#6b7280', 
};

export const SLP_LABELS = {
  'A': 'ضروري جداً',
  'E': 'هام للغاية',
  'I': 'هام',
  'O': 'عادي',
  'U': 'غير هام',
  'X': 'غير مرغوب'
};
