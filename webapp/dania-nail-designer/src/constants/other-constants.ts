import { DesignFingerIndex, LengthAndPixelHeight, ShapeAndLengths } from "../types/other-types";

export const FingerIndices: DesignFingerIndex[] = ['f1', 'f2', 'f3', 'f4', 'f5'];

export const DefaultNailAndLength = 'C 15 38 7 42 3 42 C 0 42.2 0 42.2 -3 42 C -7 42 -15 38 -15 36';
export const nailShapeAndLength: ShapeAndLengths = {
  square: {
    //natural: '',
    x_short: 'C 14.9 47 15 36 14.9 47 C 12 47 -10 47 -14.9 47 C -14.9 47 -15 36 -15 36',
    short: 'C 14.85 55 15 36 14.85 55 C 10 55 -10 55 -14.85 55 C -14.85 55 -15 36 -15 36',
    medium: 'C 14.7 68 14.7 68 14.7 68 C 8 68 -8 68 -14.7 68 C -14.7 68 -14.7 68 -15 36',
    long: 'C 14.5 81 14.5 81 14.5 81 C 7 81 -7 81 -14.5 81 C -14.5 81 -14.5 81 -15 36',
    x_long: 'C 14.5 80 14.5 94 14.5 94 C 4 94 -4 94 -14.5 94 C -14.5 94 -14.5 80 -15 36',
    xx_long: 'C 14.5 107 14.5 36 14.5 107 C 1 107 -1 107 -14.5 107 C -14.5 107 -14.5 36 -15 36',
  },
  coffin: {
    x_short: '',
    short: 'C 14 43 11 51 9 55 C 7 55 -8 55 -9 55 C -11 51 -14 43 -15 36',
    medium: 'C 14 46 11 61 9 68 C 7 68 -7 68 -9 68 C -11 61 -14 46 -15 36',
    long: 'C 14 51 11 71 9 81 C 7 81 -7 81 -9 81 C -11 71 -14 51 -15 36',
    x_long: 'C 14 53 11 78 9 94 C 4 94 -4 94 -9 94 C -11 78 -14 53 -15 36',
    xx_long: 'C 14 56 11 91 9 107 C 4 107 -4 107 -9 107 C -11 91 -14 56 -15 36',
  },
  oval: {
    x_short: '',
    short: '',
    medium: '',
    long: '',
   // x_long: '', //Is an almondetto
   // xx_long: '', /Is an almondetto
  },
  stiletto: {
   // x_short: 'C 15 37 10 42 6 45 C 0 49 0 49 -6 45 C -10 42 -15 37 -15 36', //requires bad structure
   // short: 'C 15 39 12 46 3 54 C 0 56 0 56 -3 54 C -12 46 -15 39 -15 36', //requires bad structure
    medium: 'C 14 46 12 51 6 62 C 0 71 0 71 -6 62 C -12 51 -14 46 -15 36', //is a "Kitten" shape, synonymous
    long: 'C 12 54 9 62 4 75 C 0 83 0 83 -4 75 C -9 62 -12 54 -15 36',
    x_long: 'C 13 54 8 73 3 88 C 0 96 0 96 -3 88 C -8 73 -13 54 -15 36',
    xx_long: 'C 14 54 7 84 3 100 C 0 110 0 110 -3 100 C -7 84 -14 54 -15 36',
  },
  ballerina: {
    x_short: '', //requires bad structure
    short:    '', //requires bad structure
   // medium:   'C 12 51 9 61 6.5 68 C 5 68 -5 68 -6.5 68 C -9 61 -12 51 -15 36', //requires bad structure
    long:     'C 12 60 8 76 7 81 C 6 81 -6 81 -7 81 C -8 76 -12 60 -15 36',
    x_long:   'C 12 68 8 88 6.5 94 C 1 94 -1 94 -6.5 94 C -8 88 -12 68 -15 36',
    xx_long:  'C 11 81 7 103 6 107 C 1 107 -1 107 -6 107 C -7 103 -11 81 -15 36',
  },
  round: {
    x_short: '',
    short: '',
    medium: '',
    long: '',
    x_long: '',
    xx_long: '',
  },
  almond: {
    x_short: '', //is an oval?
    short: 'C 15 39 11 46 7 51 C 1 57 -1 57 -7 51 C -11 46 -15 39 -15 36',
    medium: 'C 13 45 11 54 6 63 C 2 70 -2 70 -6 63 C -11 54 -13 45 -15 36',
    long: 'C 13 50 9 67 6 74 C 2 83 -2 83 -6 74 C -9 67 -13 50 -15 36',
   // x_long: 'C 10 71 8 80 6 86 C 2 97 -2 97 -6 86 C -8 80 -10 71 -15 36', //is an almondetto
   // xx_long: 'C 11 84 8 93 6 99 C 2 110 -2 110 -6 99 C -8 93 -11 84 -15 36', //is an almondetto
  },
  almondetto: {
   // x_short: '', //is an almond
   // short: '', //is an almond
   // medium: '', //is an almond
    long: '', //is missing svg
    x_long: 'C 10 71 8 80 6 86 C 2 97 -2 97 -6 86 C -8 80 -10 71 -15 36',
    xx_long: 'C 11 84 8 93 6 99 C 2 110 -2 110 -6 99 C -8 93 -11 84 -15 36',
  },
  // kitten: {
    //x_short: '',
    //short: '',
    // medium: '', //is a stiletto, only at this length
    //long: '',
    //x_long: '',
    //xx_long: '',
  // }
}

export const NailSvgHeight: LengthAndPixelHeight = {
  natural: 50,
  x_short: 60,
  short: 70,
  medium: 80,
  long: 90,
  x_long: 100,
  xx_long: 110
}

