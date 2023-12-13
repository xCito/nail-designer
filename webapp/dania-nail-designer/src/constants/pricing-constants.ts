import { NailBaseId, NailShapeId, NailLengthId, NailServiceId } from "./design-constants";


export const SERVICE_FEE = 20;
export const NO_CHARGE = 0;
export const SHAPE_EXPANSION_SMALL_FEE = 5;
export const SHAPE_EXPANSION_BIG_FEE = 10;
export const BASE_MANICURE_PRICE = 20;
export const GEL_REMOVAL_PRICE = 5;
export const POLISH_REMOVAL_PRICE = 0;
export const TAKE_DOWN_PRICE = 10;

export const OrnamentPrices = {
  "10": 5,
  "20": 8,
  "8": 1,
  "9": 5,
} as const;

// Manicure
export const ServicePrices: NailServicePrice = {
  refill: 15,
  rebalance: 20,
  new_set: 25,
}

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


// export const ManicureServices: NailManicureServices = {
//     basic_manicure: {
//         price: 0,
//         colorPrice: 0,
//         isRemoveReq: false,
//         lengthPrice: null,
//     },
//     polish_manicure: {
//         price: 5,
//         colorPrice: 0,
//         isRemoveReq: true,
//         lengthPrice: null,
//     },
//     basegel_manicure: {
//         price: 5,
//         colorPrice: 5,
//         isRemoveReq: true,
//         lengthPrice: null,
//     },
//     hard_manicure: {
//         price: 15,
//         colorPrice: 5,
//         isRemoveReq: true,
//         lengthPrice: [
//             { length: 'long', amount: 5 },
//             { length: 'x_long', amount: 10 },
//             { length: 'xx_long', amount: 15 },
//         ],
//     },
//     poly_manicure: {
//         price: 20,
//         colorPrice: 5,
//         isRemoveReq: true,
//         lengthPrice: [
//             { length: 'long', amount: 5 },
//             { length: 'x_long', amount: 10 },
//             { length: 'xx_long', amount: 15 },
//         ],
//     },
//     rubber_manicure: {
//         price: 5,
//         colorPrice: 5,
//         isRemoveReq: true,
//         lengthPrice: [
//             { length: 'long', amount: 5 },
//             { length: 'x_long', amount: 10 },
//             { length: 'xx_long', amount: 15 },
//         ],
//     },
// }

// type ItemDesignElements<T> = T extends { [K in keyof T]: (T[K] extends { type: 'item' } ? T[K] : never) } ? T : never;
// export type OrnamentPriceId = ItemDesignElements<typeof DesignElements>

export type NailBasePrice = Record<NailBaseId, number>
export type NailShapePrice = Record<NailShapeId, number>
export type NailLengthPrice = Record<NailLengthId, number>
export type NailServicePrice = Record<Exclude<NailServiceId, "manicure" | "take_down">, number>
export type OrnamentPrice = Record<string, number>