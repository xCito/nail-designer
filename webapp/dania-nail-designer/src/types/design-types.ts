import { NailBase, NailShape } from "../constants/design-constants";


export interface Design {
  left?: HandDesign;
  right?: HandDesign;
} 

export interface HandDesign {
  shape: keyof typeof NailShape;
  base: keyof typeof NailBase;
  f1: Finger;
  f2: Finger;
  f3: Finger;
  f4: Finger;
  f5: Finger;
}

export interface Finger {
  name: 'Thumb' | 'Index' | 'Middle' | 'Ring' | 'Pinky';
  ornaments: Set<'Gem' | 'Cluster' | 'Charm' | 'Foil' | 'Chain'>;
  designElems: Array<DesignProperties>;
  bgColor: string | null;
}

export interface DesignProperties {
  name: string;
  complexity: number;
  id: string;
  timeEst?: number; // mins?
}