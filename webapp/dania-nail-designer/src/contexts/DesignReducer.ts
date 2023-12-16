import { Design, Finger } from "@/constants/design-constants";
import { FingerIndices } from "../constants/other-constants";
import { DesignAction } from "../types/other-types";

export function designReducer(prevState: Design, action: DesignAction) {
  // console.log(prevState);

  switch(action.type) {
    case 'SET_BASE': {
      const newState = structuredClone(prevState);
      newState.left.base = action.baseId;
      newState.right.base = action.baseId;
      return newState;
    }
    case 'SET_SHAPE': {
      const newState = structuredClone(prevState);
      newState.left.shape = action.shapeId;
      newState.right.shape = action.shapeId;
      return newState;
    }
    case 'SET_LENGTH': {
      const newState = structuredClone(prevState);
      newState.left.length = action.lengthId;
      newState.right.length = action.lengthId;
      return newState;
    }
    case 'SET_DESIGN_BY_COUNT': {
      const newState: Design = structuredClone(prevState);
      const { designId: design, count } = action;

      const fIndices = [...FingerIndices, ...FingerIndices.reverse()];
      for (let i = 0; i < fIndices.length; i++) {
        const fingerIndex = fIndices[i];
        const hand = (i < 5) ? newState.left : newState.right;
        
        const handDesigns = hand[fingerIndex].designElems;
        const designIdx = handDesigns.findIndex((d) => d === design);
        if (i < count && designIdx === -1) {
          handDesigns.push(design);
        } else if (i < count && designIdx !== -1) {
          continue;
        } else if (i >= count && designIdx !== -1) {
          handDesigns.splice(designIdx, 1);
        } else {
          continue;
        }
      }
      return newState;
    }
    // case 'SET_DESIGN_BY_COUNT': {
    //   const newState: Design = structuredClone(prevState);
    //   const { designId: design, count } = action;

    //   for (const fingerIndex of FingerIndices) {
    //     const leftHand: Finger = newState.left[fingerIndex];
    //     const rightHand: Finger = newState.right[fingerIndex];
    //     leftHand.designElems = leftHand.designElems.filter(d => d != design);
    //     rightHand.designElems = rightHand.designElems.filter(d => d != design);
    //   }

    //   const fIndices = [...FingerIndices, ...FingerIndices.reverse()];
    //   for (let i = 0; i < count; i++) {
    //     const fingerIndex = fIndices[i];
    //     const hand = (i < 5) ? newState.left : newState.right;
        
    //     hand[fingerIndex].designElems.push(design);
    //   }
    //   return newState;
    // }
    case 'ADD_DESIGN': {
      const newState: Design = structuredClone(prevState);
      const { designId: design } = action;

  
      for (const fingerIndex of FingerIndices) {
        const leftHand: Finger = newState.left[fingerIndex];
        const rightHand: Finger = newState.right[fingerIndex];

        if (!leftHand.designElems.some(d => d === design)) {
          leftHand.designElems.push(design);
        }
        if (!rightHand.designElems.some(d => d === design)) {
          rightHand.designElems.push(design);
        }
      }
      return newState;
    }
    case 'REMOVE_DESIGN': {
      const newState: Design = structuredClone(prevState);
      const { designId: design } = action;

      for (const fingerIndex of FingerIndices) {
        const leftHand: Finger = newState.left[fingerIndex];
        const rightHand: Finger = newState.right[fingerIndex];

        const rmIndexL = leftHand.designElems.findIndex(d => d === design);
        const rmIndexR = rightHand.designElems.findIndex(d => d === design);
        leftHand.designElems.splice(rmIndexL, 1);
        rightHand.designElems.splice(rmIndexR, 1);
      }
      return newState;
    }
    case 'REMOVE_ALL': {
      const newState: Design = structuredClone(prevState);

      for (const fingerIndex of FingerIndices) {
        const leftHand: Finger = newState.left[fingerIndex];
        const rightHand: Finger = newState.right[fingerIndex];
        leftHand.designElems = [];
        rightHand.designElems = [];
      }
      return newState;
    }
    default: return prevState;
  }
}