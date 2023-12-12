import { DesignElements } from "@/constants/design-constants";
import { DesignElement, NailBaseOption, NailDesignOption, NailLengthOption, NailShapeOption } from "./design-types";

type ItemDesignElements<T> = T extends { type: 'item' } ? T : never;
export type OrnamentPriceId = ItemDesignElements<typeof DesignElements[number]>['id']

export type NailBasePrice = Record<NailBaseOption, number>
export type NailShapePrice = Record<NailShapeOption, number>
export type NailLengthPrice = Record<NailLengthOption, number>
export type OrnamentPrice = Record<OrnamentPriceId, number>