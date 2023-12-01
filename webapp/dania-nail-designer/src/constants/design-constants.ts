import { Design } from "../types/design-types";


export const NailShape = {
  coffin: { label: 'Coffin', type: 'Tapered'},
  ballerina: { label: 'Ballerina', type: 'Tapered'},
  oval: { label: 'Oval', type: 'Rounded'},
  round: { label: 'Round', type: 'Rounded'},
  stiletto: { label: 'Stiletto', type: 'Pointy'},
  almondetto: { label: 'Almondetto', type: 'Pointy'},
  almond: { label: 'Almond', type: 'Pointy'},
  kitten: { label: 'Kitten', type: 'Pointy'},
  square: { label: 'Square', type: 'Square'},
} as const;


export const NailBase = {
  BaseGel: 'Base Gel',
  HardGel: 'Hard Gel',
  PolyGel: 'PolyGel',
  AcryGel: 'AcryGel',
} as const;


export const NailLength = {
  natural: {label: 'Natural', type: 'Natural'},
  x_short_S: {label: 'X Short', type: 'Same Length'},
  short_S: {label: 'Short', type: 'Same Length'},
  medium_S: {label: 'Medium', type: 'Same Length'},
  long_S: {label: 'Long', type: 'Same Length'},
  x_long_S: {label: 'X Long', type: 'Same Length'},
  xx_long_S: {label: '2X Long', type: 'Same Length'},
  x_short: {label: 'X Short', type: 'Extension'},
  short: {label: 'Short', type: 'Extension'},
  medium: {label: 'Medium', type: 'Extension'},
  long: {label: 'Long', type: 'Extension'},
  x_long: {label: 'X Long', type: 'Extension'},
  xx_long: {label: '2X Long', type: 'Extension'},
} as const;


export const DesignElements = [
  { 
    id: "French", 
    complexity: 3, 
    name: "French",
  }, { 
    id: "Marble", 
    complexity: 3, 
    name: "Marble" 
  }, { 
    id: "Gradient", 
    complexity: 2, 
    name: "Gradient" 
  }, { 
    id: "GlitterTopper", 
    complexity: 1, 
    name: "Glitter Topper" 
  }, { 
    id: "Dots", 
    complexity: 1, 
    name: "Dots" 
  }, { 
    id: "Jelly", 
    complexity: 2, 
    name: "Jelly" 
  }, { 
    id: "Sticker", 
    complexity: 2, 
    name: "Sticker" 
  }, { 
    id: "Gem", 
    complexity: 1, 
    name: "Gem" 
  }, { 
    id: "GemCluster", 
    complexity: 2, 
    name: "Gem Cluster" 
  }, { 
    id: "Charm", 
    complexity: 2, 
    name: "Charm" 
  }, { 
    id: "Sugaring", 
    complexity: 3, 
    name: "Sugaring" 
  }, { 
    id: "Foil", 
    complexity: 2, 
    name: "Foil" 
  }, { 
    id: "Chrome", 
    complexity: 2, 
    name: "Chrome" 
  }, { 
    id: "Magnetic", 
    complexity: 2, 
    name: "Magnetic" 
  }, { 
    id: "StripingTape", 
    complexity: 2, 
    name: "Striping Tape" 
  }, { 
    id: "HandDrawnLevel_1", 
    complexity: 2, 
    name: "Small Drawn Element" 
  }, { 
    id: "HandDrawnLevel_2", 
    complexity: 3, 
    name: "Multiple Drawn Elements" 
  }, { 
    id: "Inlay", 
    complexity: 3, 
    name: "Inlay" 
  }
] as const;


export function getDefaultDesign(): Design {
  return {
    left: {
      base: 'BaseGel',
      shape: 'round',
      length: 'natural',
      f1: {
        name: 'Thumb',
        ornaments: new Set(),
        designElems: [],
        bgColor: null,
      },
      f2: {
        name: 'Index',
        ornaments: new Set(),
        designElems: [],
        bgColor: null,
      },
      f3: {
        name: 'Middle',
        ornaments: new Set(),
        designElems: [],
        bgColor: null,
      },
      f4: {
        name: 'Ring',
        ornaments: new Set(),
        designElems: [],
        bgColor: null,
      },
      f5: {
        name: 'Pinky',
        ornaments: new Set(),
        designElems: [],
        bgColor: null,
      },
    },
    right: {
      base: 'BaseGel',
      shape: 'stiletto',
      length: 'medium',
      f1: {
        name: 'Thumb',
        ornaments: new Set(),
        designElems: [],
        bgColor: null,
      },
      f2: {
        name: 'Index',
        ornaments: new Set(),
        designElems: [],
        bgColor: null,
      },
      f3: {
        name: 'Middle',
        ornaments: new Set(),
        designElems: [],
        bgColor: null,
      },
      f4: {
        name: 'Ring',
        ornaments: new Set(),
        designElems: [],
        bgColor: null,
      },
      f5: {
        name: 'Pinky',
        ornaments: new Set(),
        designElems: [],
        bgColor: null,
      }
    },
  }
}