import { NailBaseId, NailLengthId, NailShapeId } from "@/constants/design-constants";

// type ItemDesignElements<T> = T extends { [K in keyof T]: (T[K] extends { type: 'item' } ? T[K] : never) } ? T : never;
// export type OrnamentPriceId = ItemDesignElements<typeof DesignElements>

export type NailBasePrice = Record<NailBaseId, number>
export type NailShapePrice = Record<NailShapeId, number>
export type NailLengthPrice = Record<NailLengthId, number>
export type OrnamentPrice = Record<string, number>