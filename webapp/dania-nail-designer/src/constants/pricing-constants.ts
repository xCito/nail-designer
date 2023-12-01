import { NailBasePrice, NailLengthPrice, NailShapePrice } from "../types/price-types";


export const SERVICE_FEE = 20;

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

