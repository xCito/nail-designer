import { DesignElements, NailBaseId, NailLengthId, NailPlatformId, NailServiceId, NailShapeId } from "./design-constants";


export const SERVICE_FEE = 20;
export const NO_CHARGE = 0;
export const LENGTH_EXTENSION_FEE = 5;
export const SHAPE_EXPANSION_SMALL_FEE = 5;
export const SHAPE_EXPANSION_BIG_FEE = 10;
export const BASE_MANICURE_PRICE = 20;
export const GEL_REMOVAL_PRICE = 5;
export const DESIGN_REMOVAL_PRICE = 5;
export const NAIL_REMOVAL_PRICE = 8;
export const POLISH_REMOVAL_PRICE = 0;
export const BASE_COLOR_PRICE = 5;
export const TAKE_DOWN_PRICE = 10;

export const OrnamentPrices: OrnamentPrice = {
  charm_sm: 5,
  charm_lg: 8,
  gem: 1,
  gem_cluster: 5,
} as const;

// Manicure
export const ServicePrices: NailServicePrice = {
  take_down: 8,
  refill: 10,
  rebalance: 20,
  new_set: 25,
}

// Manicure
export const NailServiceRates: TNailServiceRates = {
  manicure: {
    rate: 20,
    maniRate: null, // not possible
    base: {
      BaseGel: 5,
      AcryGel: null, // not possible
      HardGel: null, // not possible
      PolyGel: null, // not possible
    },
    length: null,
    platform: null
  },
  take_down: {
    rate: 10,
    maniRate: 20, 
    base: {
      BaseGel: 5,
      AcryGel: null, // not possible
      HardGel: null, // not possible
      PolyGel: null, // not possible
    },
    length: null,
    platform: null
  },
  refill: {
    rate: 25,
    maniRate: 20,
    base: {
      AcryGel: 5,
      BaseGel: null,
      HardGel: -13,
      PolyGel: 0,
    },
    length: {
      natural: 0,
      x_short: 0,
      short: 0,
      medium: 0,
      long: 5,
      x_long: 10,
      xx_long: 15,
    }, 
    platform: null,
  },
  rebalance: {
    rate: 30,
    maniRate: 20,
    base: {
      AcryGel: 0,
      BaseGel: null,
      HardGel: -18,
      PolyGel: -5,
    }, 
    length: {
      natural: 0,
      x_short: 0,
      short: 0,
      medium: 0,
      long: 5,
      x_long: 10,
      xx_long: 15,
    },
    platform: null,
  },
  new_set: {
    rate: 35,
    maniRate: 18,
    base: {
      AcryGel: 0,
      BaseGel: null,
      HardGel: -20,
      PolyGel: -5,
    },
    length: {
      natural: 0,
      x_short: 0,
      short: 0,
      medium: 0,
      long: 5,
      x_long: 10,
      xx_long: 15,
    },
    platform: {
      non_sculpted: 5,
      sculpted: 0,
    }
  },
} as const;

export const BasePrice: NailBasePrice = {
  AcryGel: 30,
  BaseGel: 5,
  HardGel: 15,
  PolyGel: 20,
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
  natural: 0,
  x_short: 0,
  short: 0,
  medium: 0,
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
export type NailServicePrice = Record<Exclude<NailServiceId, "manicure">, number>