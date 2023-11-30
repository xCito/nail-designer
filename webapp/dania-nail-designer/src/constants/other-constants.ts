import { DesignFingerIndex, ShapeAndLengths } from "../types/other-types";

export const FingerIndices: DesignFingerIndex[] = ['f1', 'f2', 'f3', 'f4', 'f5'];

export const DefaultNailAndLength = 'C 15 38 7 42 3 42 C 0 42.2 0 42.2 -3 42 C -7 42 -15 38 -15 36';
export const nailShapeAndLength: ShapeAndLengths = {
  square: {
    x_short: 'C 14.9 47 15 36 14.9 47 C 12 47 -10 47 -14.9 47 C -14.9 47 -15 36 -15 36',
    short: 'C 14.85 55 15 36 14.85 55 C 10 55 -10 55 -14.85 55 C -14.85 55 -15 36 -15 36',
    medium: 'C 14.7 68 14.7 68 14.7 68 C 8 68 -8 68 -14.7 68 C -14.7 68 -14.7 68 -15 36',
    long: 'C 14.5 81 14.5 81 14.5 81 C 7 81 -7 81 -14.5 81 C -14.5 81 -14.5 81 -15 36',
    x_long: 'C 14.5 80 14.5 94 14.5 94 C 4 94 -4 94 -14.5 94 C -14.5 94 -14.5 80 -15 36',
    xx_long: 'C 14.5 107 14.5 36 14.5 107 C 1 107 -1 107 -14.5 107 C -14.5 107 -14.5 36 -15 36',
  },
  coffin: {
    x_short: '',
    short: '',
    medium: '',
    long: 'C 12 57 10 70 8 81 C 2 81 -3 81 -8 81 C -10 70 -12 57 -15 36',
    x_long: 'C 11 70 10 80 8 94 C 3 94 -3 94 -8 94 C -10 80 -11 70 -15 36',
    xx_long: 'C 13 64 11 107 11 107 C 1 107 -1 107 -11 107 C -11 107 -13 64 -15 36',
  },
  oval: {
    x_short: '',
    short: '',
    medium: '',
    long: '',
    x_long: '',
    xx_long: '',
  },
  stiletto: {
    // x_short: 'C 15 37 10 42 6 45 C 0 49 0 49 -6 45 C -10 42 -15 37 -15 36',
    // short: 'C 15 39 12 46 3 54 C 0 56 0 56 -3 54 C -12 46 -15 39 -15 36',
    medium: 'C 14 46 12 51 6 62 C 0 71 0 71 -6 62 C -12 51 -14 46 -15 36',
    long: 'C 12 54 9 62 4 75 C 0 83 0 83 -4 75 C -9 62 -12 54 -15 36',
    x_long: 'C 13 54 8 73 3 88 C 0 96 0 96 -3 88 C -8 73 -13 54 -15 36',
    xx_long: 'C 14 54 7 84 3 100 C 0 110 0 110 -3 100 C -7 84 -14 54 -15 36',
  },
  ballerina: {
    x_short: '',
    short: 'C 13 42 8 51 5 55 C 4 55 -4 55 -5 55 C -8 51 -13 42 -15 36',
    medium: 'C 14 46 8 61 5 68 C 3 68 -2 68 -5 68 C -8 61 -14 47 -15 36',
    long: 'C 13 52 11 63 6 81 C 3 81 -3 81 -6 81 C -11 63 -13 52 -15 36',
    x_long: 'C 13 62 10 84 7 94 C 4 94 -4 94 -7 94 C -10 84 -13 62 -15 36',
    xx_long: 'C 12 79 11 83 7 107 C 1 107 -1 107 -7 107 C -11 83 -12 79 -15 36',
  },
  round: {
    x_short: '',
    short: '',
    medium: '',
    long: '',
    x_long: '',
    xx_long: '',
  },
  almondetto: {
    x_short: '',
    short: '',
    medium: '',
    long: '',
    x_long: '',
    xx_long: '',
  },
  almond: {
    x_short: '',
    short: '',
    medium: '',
    long: '',
    x_long: '',
    xx_long: '',
  },
  kitten: {
    x_short: '',
    short: '',
    medium: '',
    long: '',
    x_long: '',
    xx_long: '',
  }
}