import { Design } from "../types/design-types";
import { DesignAction } from "../types/other-types";

export function designReducer(prevState: Design, action: DesignAction) {
  switch(action.type) {
    default: return prevState;
  }
}