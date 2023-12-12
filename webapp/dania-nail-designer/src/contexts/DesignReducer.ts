import { FingerIndices } from "../constants/other-constants";
import { Design, Finger } from "../types/design-types";
import { DesignAction } from "../types/other-types";

export function designReducer(prevState: Design, action: DesignAction) {
  // console.log(prevState);

  switch(action.type) {
    case 'SET_BASE': {
      const newState = structuredClone(prevState);
      newState.left.base = action.base;
      newState.right.base = action.base;
      return newState;
    }
    case 'SET_SHAPE': {
      const newState = structuredClone(prevState);
      newState.left.shape = action.shape;
      newState.right.shape = action.shape;
      return newState;
    }
    case 'SET_LENGTH': {
      const newState = structuredClone(prevState);
      newState.left.length = action.length;
      newState.right.length = action.length;
      return newState;
    }
    case 'SET_DESIGN_BY_COUNT': {
      const newState: Design = structuredClone(prevState);
      const { design, count } = action;

      for (const fingerIndex of FingerIndices) {
        const leftHand: Finger = newState.left[fingerIndex];
        const rightHand: Finger = newState.right[fingerIndex];
        leftHand.designElems = leftHand.designElems.filter(d => d.id != design.id);
        rightHand.designElems = rightHand.designElems.filter(d => d.id != design.id);
      }

      const fIndices = [...FingerIndices, ...FingerIndices.reverse()];
      for (let i = 0; i < count; i++) {
        const fingerIndex = fIndices[i];
        const hand = (i < 5) ? newState.left : newState.right;
        
        hand[fingerIndex].designElems.push(design);
      }
      return newState;
    }
    case 'ADD_DESIGN': {
      const newState: Design = structuredClone(prevState);
      const { design } = action;

  
      for (const fingerIndex of FingerIndices) {
        const leftHand: Finger = newState.left[fingerIndex];
        const rightHand: Finger = newState.right[fingerIndex];

        if (!leftHand.designElems.some(d => d.id === design.id)) {
          leftHand.designElems.push(design);
        }
        if (!rightHand.designElems.some(d => d.id === design.id)) {
          rightHand.designElems.push(design);
        }
      }
      return newState;
    }
    case 'REMOVE_DESIGN': {
      const newState: Design = structuredClone(prevState);
      const { design } = action;

      for (const fingerIndex of FingerIndices) {
        const leftHand: Finger = newState.left[fingerIndex];
        const rightHand: Finger = newState.right[fingerIndex];

        const rmIndexL = leftHand.designElems.findIndex(d => d.id === design.id);
        const rmIndexR = rightHand.designElems.findIndex(d => d.id === design.id);
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