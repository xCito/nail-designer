import { NailBaseOption, NailLengthOption, NailShapeOption } from "./design-types";

export type NailBasePrice = Record<NailBaseOption, number>
export type NailShapePrice = Record<NailShapeOption, number>
export type NailLengthPrice = Record<NailLengthOption, number>