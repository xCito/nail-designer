import { NailBaseId, NailShapeId, NailLengthId, NailDesignElemId, Design } from "@/constants/design-constants"


export type DesignAction = {
  type: 'SET_BASE',
  base: NailBaseId
} | {
  type: 'SET_SHAPE',
  shape: NailShapeId
} | {
  type: 'SET_LENGTH',
  length: NailLengthId
} | {
  type: 'SET_DESIGN_BY_COUNT',
  design: NailDesignElemId,
  count: number,
} | {
  type: 'ADD_DESIGN',
  design: NailDesignElemId
} | {
  type: 'REMOVE_DESIGN',
  design: NailDesignElemId
} | {
  type: 'REMOVE_ALL'
} | {
  type: 'string'
}

export type DesignProviderValue = {
  nailDesign: Design,
  dispatch: (a: DesignAction) => void,
  startingLength: NailLengthId | null,
  setStartingLength: (id: NailLengthId) => void,
  startingShape: NailShapeId | null,
  setStartingShape: (id: NailShapeId) => void,
}

export type DesignFingerIndex = keyof Pick<Design['left' | 'right'], 'f1' | 'f2' | 'f3' | 'f4' | 'f5'>;

export type ShapeAndLengths = {
  [shape in NailShapeId]: {
    [length in NailLengthId]?: string | undefined;
  }
}
export type LengthAndPixelHeight = {
  [len in BaseNailLength]: number;
}

export type BaseNailLength = Exclude<NailLengthId, 'x_short_S' | 'short_S' | 'medium_S' | 'long_S' | 'x_long_S' | 'xx_long_S'>