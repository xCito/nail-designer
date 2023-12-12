import { count } from "console";
import { FingerIndices } from "../constants/other-constants";
import { Design, NailBaseOption, NailLengthOption, NailShapeOption } from "../types/design-types";
import { BaseNailLength } from "../types/other-types";
import { DesignElements } from "@/constants/design-constants";

export function getAppliedBases(nailDesign: Design) {
  const selectedBase: NailBaseOption[] = [];

  if (nailDesign.left?.base) {
    selectedBase.push(nailDesign.left.base);
  }
  if (nailDesign.right?.base) {
    selectedBase.push(nailDesign.right.base);
  }

  return selectedBase;
}

export function getAppliedLength(nailDesign: Design) {
  const selectedBase: NailLengthOption[] = [];

  if (nailDesign.left?.length) {
    selectedBase.push(nailDesign.left.length);
  }
  if (nailDesign.right?.length) {
    selectedBase.push(nailDesign.right.length);
  }

  return selectedBase;
}

export function getAppliedShape(nailDesign: Design) {
  const selectedBase: NailShapeOption[] = [];

  if (nailDesign.left.shape) {
    selectedBase.push(nailDesign.left.shape);
  }
  if (nailDesign.right.shape) {
    selectedBase.push(nailDesign.right.shape);
  }

  return selectedBase;
}

export function getAppliedDesignElementIds(nailDesign: Design): number[] {
  const selectedDesignIds = new Set<number>();
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

export function getAppliedDesignElementCounts(nailDesign: Design): Map<typeof DesignElements[number]['id'], number> {
  const countMap = new Map<typeof DesignElements[number]['id'], number>();
  for (const fingerIndex of FingerIndices) {
    nailDesign.left[fingerIndex].designElems.forEach(dElem => {
      if (countMap.has(dElem.id))
        countMap.set(dElem.id, countMap.get(dElem.id)! + 1);
      else
        countMap.set(dElem.id, 1);
    });

    nailDesign.right[fingerIndex].designElems.forEach(dElem => {
      if (countMap.has(dElem.id))
        countMap.set(dElem.id, countMap.get(dElem.id)! + 1);
      else
        countMap.set(dElem.id, 1);
    });
  }

  return countMap;
}


export function getByType<T extends { type: string }>(list: T[], type: string): T[] {
  return list.filter(elem => elem.type === type);
}

export function getLengthId(id: NailLengthOption): BaseNailLength {
  return (id.endsWith('_S') ? id.substring(0, id.length - 2) : id) as BaseNailLength;
}