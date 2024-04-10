import { DesignElements, NailBaseId, NailLengthId, NailPlatformId, NailServiceId, NailShapeId } from "./design-constants";


export const SERVICE_FEE = 20;
export const NO_CHARGE = 0;
export const LENGTH_EXTENSION_FEE = 5;
export const SHAPE_EXPANSION_SMALL_FEE = 5;
export const SHAPE_EXPANSION_BIG_FEE = 10;
export const BASE_MANICURE_PRICE = 20;
export const GEL_REMOVAL_PRICE = 5;
export const EXT_NAIL_REMOVAL_PRICE = 8;
export const HAND_MASSAGE_PRICE = 1;
export const POLISH_REMOVAL_PRICE = 0;
export const BASE_COLOR_PRICE = 5;
export const TAKE_DOWN_PRICE = 10;

// export const OrnamentPrices: OrnamentPrice = {
//   charm_sm: 5,
//   charm_lg: 8,
//   gem: 1,
//   gem_cluster: 5,
// } as const;

// Manicure
export const ServicePrices: NailServicePrice = {
  take_down: TAKE_DOWN_PRICE,
  g_manicure: 25,
  manicure: 20,
  // refill: 10,
  // rebalance: 20,
  enhan_ext: 25,
}

// Manicure
// export const NailServiceRates: TNailServiceRates = {
//   manicure: {
//     rate: 20,
//     maniRate: null, // not possible
//     base: {
//       base_gel: 5,
//       acrylic_base: null, // not possible
//       hard_gel: null, // not possible
//       poly_gel: null, // not possible
//     },
//     length: null,
//     platform: null
//   },
//   g_manicure: {
//     rate: 20,
//     maniRate: null, // not possible
//     base: {
//       base_gel: 5,
//       acrylic_base: null, // not possible
//       hard_gel: null, // not possible
//       poly_gel: null, // not possible
//     },
//     length: null,
//     platform: null
//   },
//   take_down: {
//     rate: 10,
//     maniRate: 20, 
//     base: {
//       base_gel: 5,
//       acrylic_base: null, // not possible
//       hard_gel: null, // not possible
//       poly_gel: null, // not possible
//     },
//     length: null,
//     platform: null
//   },
//   // refill: {
//   //   rate: 25,
//   //   maniRate: 15,
//   //   base: {
//   //     acrylic_base: 5,
//   //     base_gel: null,
//   //     hard_gel: -13,
//   //     poly_gel: 0,
//   //   },
//   //   length: {
//   //     natural: 0,
//   //     x_short: 0,
//   //     short: 0,
//   //     medium: 0,
//   //     long: 5,
//   //     x_long: 10,
//   //     xx_long: 15,
//   //   }, 
//   //   platform: null,
//   // },
//   // rebalance: {
//   //   rate: 30,
//   //   maniRate: 15,
//   //   base: {
//   //     AcryGel: 0,
//   //     BaseGel: null,
//   //     HardGel: -18,
//   //     PolyGel: -5,
//   //   }, 
//   //   length: {
//   //     natural: 0,
//   //     x_short: 0,
//   //     short: 0,
//   //     medium: 0,
//   //     long: 5,
//   //     x_long: 10,
//   //     xx_long: 15,
//   //   },
//   //   platform: null,
//   // },
//   enhan_ext: {
//     rate: 35,
//     maniRate: 15,
//     base: {
//       acrylic_base: 0,
//       base_gel: null,
//       hard_gel: -20,
//       poly_gel: -5,
//     },
//     length: {
//       // natural: 0,
//       // x_short: 0,
//       short: 0,
//       med_long: 5,
//       // medium: 0,
//       // long: 5,
//       x_long: 10,
//       xx_long: 15,
//     },
//     platform: {
//       non_sculpted: 5,
//       sculpted: 0,
//     }
//   },
// } as const;

export const BasePrice: NailBasePrice = {
  builder_base: -2,
  base_gel: 5,
  hard_gel: 15,
  gel_x_base: -2,
  poly_gel: 20,
  acrylic_base: -2,
}

export const ShapePrice: NailShapePrice = {
  coffin: 0,
  ballerina: 0,
  oval: 0,
  round: 0,
  stiletto: 0,
  almondetto: 0,
  almond: 0,
  // kitten: 0,
  square: 0,
}

export const LengthPrice: NailLengthPrice = {
  // natural: 0,
  // x_short: 0,
  short: 0,
  med: 0,
  // medium: 0,
  long: 5,
  x_long: 10,
  xx_long: 15,
}


export type TNailServiceRates = {
  [k in NailServiceId]: {
    rate: number,
    maniRate: number | null,
    base:  Record<NailBaseId, number | null> | null,
    length: NailLengthPrice | null,
    platform: Record<NailPlatformId, number | null> | null,
  }
}

export type OrnamentPrice = DesignElemItems<typeof DesignElements>;
export type DesignElemItems<T> = { 
  -readonly [K in keyof T]?: T[K] extends {type: 'item'} ? number : never;
}
// type MakeNeverOptional<T> = {
//   [K in keyof T]: T[K] extends never ? undefined : T[K];
// };           
// export const o: MakeNeverOptional<Orn<typeof DesignElements>> = {
//   charm_lg: 2,
//   charm_sm: 3,
//   gem: 1,
//   gem_cluster: 1,
// }

export type NailPlatformPrice = Record<NailPlatformId, number>
export type NailBasePrice = Record<NailBaseId, number>
export type NailShapePrice = Record<NailShapeId, number>
export type NailLengthPrice = Record<NailLengthId, number>
export type NailServicePrice = Record<NailServiceId, number>