import { DesignElements, NailBase, NailLength, NailShape } from "../constants/design-constants";


export interface Design {
  left: HandDesign;
  right: HandDesign;
} 

export interface HandDesign {
  shape: NailShapeOption;
  base: NailBaseOption;
  length: NailLengthOption;
  f1: Finger;
  f2: Finger;
  f3: Finger;
  f4: Finger;
  f5: Finger;
}

export interface Finger {
  name: 'Thumb' | 'Index' | 'Middle' | 'Ring' | 'Pinky';
  ornaments: Set<'Gem' | 'Cluster' | 'Charm' | 'Foil' | 'Chain'>;
  designElems: Array<NailDesignOption>;
  bgColor: string | null;
}

export interface DesignProperties {
  name: string;
  complexity: number;
  id: string;
  timeEst?: number; // mins?
}

export type NailLengthTypeOption = typeof NailLength[keyof typeof NailLength]['type'];
export type NailLengthOptionVal = typeof NailLength[keyof typeof NailLength];
export type NailLengthOption = keyof typeof NailLength;

export type NailShapeTypeOption = typeof NailShape[keyof typeof NailShape]['type'];
export type NailShapeOptionVal = typeof NailShape[keyof typeof NailShape];
export type NailShapeOption = keyof typeof NailShape;

export type NailBaseOption = keyof typeof NailBase;

export type NailDesignOption = typeof DesignElements[number];