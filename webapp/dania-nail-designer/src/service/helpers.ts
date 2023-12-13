import { Design, DesignElements, NailBases, NailDesignElemId, NailLengths, NailShapes, NailServices } from "@/constants/design-constants";
import { FingerIndices } from "../constants/other-constants";



function getObjAsList<T extends { [k in keyof T]: string | object}>(obj: T): Array<{id: keyof T, value: T[keyof T]}> {
  return (Object.entries<string | object>(obj) as Array<[id: keyof T, value: T[keyof T]]>)
    .map(([k,v]) => ({id: k, value: typeof v ==='object' ? {...v} : v}));
}

export function getNailServicesAsList() {  return getObjAsList(NailServices); }
export function getNailBasesAsList() {  return getObjAsList(NailBases); }
export function getNailLengthsAsList() {  return getObjAsList(NailLengths); }
export function getNailShapesAsList() {  return getObjAsList(NailShapes); }
export function getNailDesignElementsAsList() {  return getObjAsList(DesignElements); }

export function getAppliedBases(nailDesign: Design) {
  return nailDesign.left.base;
}

export function getAppliedLength(nailDesign: Design) {
  return nailDesign.left.length;
}

export function getAppliedShape(nailDesign: Design) {
  return nailDesign.left.shape;
}

export function getAppliedDesignElementIds(nailDesign: Design): NailDesignElemId[] {
  const fingers = [];
  for (const fingerIndex of FingerIndices) {
    fingers.push(nailDesign.left[fingerIndex]);
    fingers.push(nailDesign.right[fingerIndex]);
  }

  const designElemSet = fingers.map(finger => finger.designElems)
    .flat()
    .reduce((set, d) => set.add(d), new Set<NailDesignElemId>());

  return Array.from(designElemSet);
}

export function getAppliedDesignElementCounts(nailDesign: Design): Map<NailDesignElemId, number> {
  const countMap = new Map<NailDesignElemId, number>();

  const fingers = [];
  for (const fingerIndex of FingerIndices) {
    fingers.push(nailDesign.left[fingerIndex]);
    fingers.push(nailDesign.right[fingerIndex]);
  }

  fingers.map(finger => finger.designElems).flat().forEach(dElemId => {
    if (countMap.has(dElemId))
      countMap.set(dElemId, countMap.get(dElemId)! + 1);
    else
      countMap.set(dElemId, 1);
  });

  return countMap;
}


export function getByType<T extends { type: string }>(list: T[], type: string): T[] {
  return list.filter(elem => elem.type === type);
}
