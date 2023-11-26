import { FingerIndices } from "../constants/other-constants";
import { Design, NailBaseOption, NailShapeOption } from "../types/design-types";
import { DesignFingerIndex } from "../types/other-types";

export function getAppliedBases(nailDesign: Design) {
    let selectedBase: NailBaseOption[] = [];

    if (nailDesign.left?.base) {
        selectedBase.push( nailDesign.left.base );
    }
    if (nailDesign.right?.base) {
        selectedBase.push( nailDesign.right.base );
    }

    return selectedBase;
}

export function getAppliedShape(nailDesign: Design) {
    let selectedBase: NailShapeOption[] = [];

    if (nailDesign.left.shape) {
        selectedBase.push( nailDesign.left.shape );
    }
    if (nailDesign.right.shape) {
        selectedBase.push( nailDesign.right.shape );
    }

    return selectedBase;
}

export function getAppliedDesignElementIds(nailDesign: Design): string[] {
    const selectedDesignIds = new Set<string>();
    for (let fingerIndex of FingerIndices) {
        nailDesign.left[fingerIndex].designElems.forEach(dElem => {
            selectedDesignIds.add(dElem.id);
        });

        nailDesign.right[fingerIndex].designElems.forEach(dElem => {
            selectedDesignIds.add(dElem.id);
        });
    }

    return new Array(...selectedDesignIds);
}
