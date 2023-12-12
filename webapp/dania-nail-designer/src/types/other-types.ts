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
  type: 'SET_DESIGN_BY_COUNT',
  design: NailDesignOption,
  count: number,
} | {
  type: 'ADD_DESIGN',
  design: NailDesignOption
} | {
  type: 'REMOVE_DESIGN',
  design: NailDesignOption
} | {
  type: 'REMOVE_ALL'
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
export type LengthAndPixelHeight = {
  [len in BaseNailLength]: number;
}

export type BaseNailLength = Exclude<NailLengthOption, 'x_short_S' | 'short_S' | 'medium_S' | 'long_S' | 'x_long_S' | 'xx_long_S'>