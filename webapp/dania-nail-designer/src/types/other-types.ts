import { Design } from "./design-types"

export type DesignAction = {
  type: string
}

export type DesignProviderValue = {
  nailDesign: Design,
  dispatch: (a: DesignAction) => void
}