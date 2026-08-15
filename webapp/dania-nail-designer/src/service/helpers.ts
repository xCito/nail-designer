import { Design, DesignElements, NailBases, NailDesignElemId, NailLengths, NailShapes, NailServices, AddOnServices } from "@/constants/design-constants";
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
export function getAddOnServicesAsList() {  return getObjAsList(AddOnServices); }

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
  }
  for (const fingerIndex of FingerIndices) {
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


export function getByType<T extends { "type": string }>(list: T[], t: string): T[] {
  return list.filter(elem => elem.type === t);
}

function tokenizePathData(path: string): Array<{ command: string; values: number[] }> {
  const tokens = path.trim().match(/[A-Za-z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) ?? [];
  const segments: Array<{ command: string; values: number[] }> = [];
  let currentCommand: string | null = null;
  let currentValues: number[] = [];

  for (const token of tokens) {
    if (/[A-Za-z]/.test(token)) {
      if (currentCommand) {
        segments.push({ command: currentCommand, values: currentValues });
      }
      currentCommand = token;
      currentValues = [];
      continue;
    }

    if (currentCommand) {
      currentValues.push(Number(token));
    }
  }

  if (currentCommand) {
    segments.push({ command: currentCommand, values: currentValues });
  }

  return segments;
}

function formatPathNumber(value: number): string {
  const rounded = Number(value.toFixed(4));
  return Number.isInteger(rounded) ? String(rounded) : String(rounded).replace(/(\.\d*?[1-9])0+$|\.0+$/, '$1');
}

export function interpolateSvgPath(from: string, to: string, amount: number): string {
  const progress = Math.min(1, Math.max(0, amount));

  if (!from) return to;
  if (!to) return from;

  const startSegments = tokenizePathData(from);
  const endSegments = tokenizePathData(to);

  if (!startSegments.length || !endSegments.length) {
    return progress >= 0.5 ? to : from;
  }

  const segmentCount = Math.max(startSegments.length, endSegments.length);
  const rendered: string[] = [];

  for (let index = 0; index < segmentCount; index += 1) {
    const currentSegment = startSegments[index];
    const targetSegment = endSegments[index];

    if (!currentSegment || !targetSegment) {
      rendered.push(targetSegment ? `${targetSegment.command} ${targetSegment.values.map(formatPathNumber).join(' ')}` : `${currentSegment.command} ${currentSegment.values.map(formatPathNumber).join(' ')}`);
      continue;
    }

    if (currentSegment.command !== targetSegment.command || currentSegment.values.length !== targetSegment.values.length) {
      rendered.push(`${targetSegment.command} ${targetSegment.values.map(formatPathNumber).join(' ')}`);
      continue;
    }

    const interpolatedValues = currentSegment.values.map((value, idx) => {
      const targetValue = targetSegment.values[idx];
      return value + (targetValue - value) * progress;
    });

    rendered.push(`${currentSegment.command} ${interpolatedValues.map(formatPathNumber).join(' ')}`);
  }

  return rendered.join(' ');
}
