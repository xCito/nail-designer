import { FingerIndices } from "../constants/other-constants";
import { Design, NailBaseOption, NailLengthOption, NailShapeOption } from "../types/design-types";

export function getAppliedBases(nailDesign: Design) {
    const selectedBase: NailBaseOption[] = [];

    if (nailDesign.left?.base) {
        selectedBase.push( nailDesign.left.base );
    }
    if (nailDesign.right?.base) {
        selectedBase.push( nailDesign.right.base );
    }

    return selectedBase;
}

export function getAppliedLength(nailDesign: Design) {
    const selectedBase: NailLengthOption[] = [];

    if (nailDesign.left?.length) {
        selectedBase.push( nailDesign.left.length );
    }
    if (nailDesign.right?.length) {
        selectedBase.push( nailDesign.right.length );
    }

    return selectedBase;
}

export function getAppliedShape(nailDesign: Design) {
    const selectedBase: NailShapeOption[] = [];

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
    for (const fingerIndex of FingerIndices) {
        nailDesign.left[fingerIndex].designElems.forEach(dElem => {
            selectedDesignIds.add(dElem.id);
        });

        nailDesign.right[fingerIndex].designElems.forEach(dElem => {
            selectedDesignIds.add(dElem.id);
        });
    }

    return new Array(...selectedDesignIds);
}
