
export interface Department {
  id: string;
  code: string;
  name: string;
  currentArea: number; // Before
  neededArea: number;  // After
  aislesArea: number;
  workstationsArea: number;
  importance: 'A' | 'E' | 'I' | 'O' | 'U' | 'X';
}

export interface AdjacencyScore {
  fromId: string;
  toId: string;
  rating: 'A' | 'E' | 'I' | 'O' | 'U' | 'X';
}
