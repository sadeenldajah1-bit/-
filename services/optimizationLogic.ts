
import { Department, AdjacencyScore } from '../types';

/**
 * Calculates the Total Closeness Rating (TCR) for a department
 * based on its relationships with other departments.
 */
export const calculateTCR = (deptId: string, adjacencies: AdjacencyScore[]): number => {
  const ratingValues: Record<string, number> = {
    'A': 10000,
    'E': 1000,
    'I': 100,
    'O': 10,
    'U': 0,
    'X': -10000
  };

  return adjacencies
    .filter(adj => adj.fromId === deptId || adj.toId === deptId)
    .reduce((sum, adj) => sum + ratingValues[adj.rating], 0);
};

/**
 * Suggests an order of department placement using the CORELAP-like logic
 */
export const suggestPlacementOrder = (departments: Department[], adjacencies: AdjacencyScore[]): Department[] => {
  return [...departments].sort((a, b) => {
    const tcrA = calculateTCR(a.id, adjacencies);
    const tcrB = calculateTCR(b.id, adjacencies);
    return tcrB - tcrA;
  });
};
