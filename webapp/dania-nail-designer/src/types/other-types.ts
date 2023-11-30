import { Design, NailBaseOption, NailDesignOption, NailLengthOption, NailShapeOption } from "./design-types"

export type DesignAction = {
  type: 'SET_BASE',
  base: NailBaseOption
} | {
  type: 'SET_SHAPE',
  shape: NailShapeOption
} | {
  type: 'SET_LENGTH',
  length: NailLengthOption
} | {
  type: 'ADD_DESIGN',
  design: NailDesignOption
} | {
  type: 'REMOVE_DESIGN',
  design: NailDesignOption
} | {
  type: 'string'
}

export type DesignProviderValue = {
  nailDesign: Design,
  dispatch: (a: DesignAction) => void
}

export type DesignFingerIndex = keyof Pick<Design['left' | 'right'], 'f1' | 'f2' | 'f3' | 'f4' | 'f5'>;

export type ShapeAndLengths = {
  [shape in NailShapeOption]: {
    [length in NailLengthOption]?: string | undefined;
  }
}