import { NailManicureServices } from "../types/design-types";
import { NailBasePrice, NailLengthPrice, NailShapePrice, OrnamentPrice } from "../types/price-types";


export const SERVICE_FEE = 20;
export const BASE_MANICURE_PRICE = 20;
export const GEL_REMOVAL_PRICE = 5;
export const POLISH_REMOVAL_PRICE = 0;
export const TAKE_DOWN_PRICE = 5;

export const OrnamentPrices = {
  "10": 5,
  "20": 8,
  "8": 1,
  "9": 5,
};

// Manicure
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
    almondetto: 5,
    almond: 0,
    kitten: 5,
    square: 0,
}

export const LengthPrice: NailLengthPrice = {
    x_short: 15,
    short: 15,
    medium: 20,
    long: 25,
    x_long: 30,
    xx_long: 35,
    natural: 0,
    x_short_S: 0,
    short_S: 0,
    medium_S: 0,
    long_S: 0,
    x_long_S: 0,
    xx_long_S: 0,
}


export const ManicureServices: NailManicureServices = {
    basic_manicure: {
        price: 0,
        colorPrice: 0,
        isRemoveReq: false,
        lengthPrice: null,
    },
    polish_manicure: {
        price: 5,
        colorPrice: 0,
        isRemoveReq: true,
        lengthPrice: null,
    },
    basegel_manicure: {
        price: 5,
        colorPrice: 5,
        isRemoveReq: true,
        lengthPrice: null,
    },
    hard_manicure: {
        price: 15,
        colorPrice: 5,
        isRemoveReq: true,
        lengthPrice: [
            { length: 'long', amount: 5 },
            { length: 'x_long', amount: 10 },
            { length: 'xx_long', amount: 15 },
        ],
    },
    poly_manicure: {
        price: 20,
        colorPrice: 5,
        isRemoveReq: true,
        lengthPrice: [
            { length: 'long', amount: 5 },
            { length: 'x_long', amount: 10 },
            { length: 'xx_long', amount: 15 },
        ],
    },
    rubber_manicure: {
        price: 5,
        colorPrice: 5,
        isRemoveReq: true,
        lengthPrice: [
            { length: 'long', amount: 5 },
            { length: 'x_long', amount: 10 },
            { length: 'xx_long', amount: 15 },
        ],
    },
}