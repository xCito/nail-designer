import { NailLengthId, NailShapeId } from "@/constants/design-constants";

/**
 * How an item is charged.
 * - flat:  once per visit (Manicure, NS Polygel, Hydration)
 * - nail / toe / hand / piece / time / wash: charged per unit, so the line has a quantity
 */
export type ChargeUnit = 'flat' | 'nail' | 'toe' | 'hand' | 'piece' | 'time' | 'wash';

/**
 * When the quantity is printed on the receipt.
 * - always:   "Late (1)", "French (6)"
 * - multiple: "Wash" for one, "Wash (3)" for three
 */
export type QtyDisplay = 'always' | 'multiple';

export interface CatalogItem {
  id: string;
  /** Text printed on the receipt. */
  name: string;
  /** Button text in the app, when it should differ from the receipt name. */
  label?: string;
  /** Default price per unit (or for the whole line when unit is 'flat'). */
  price: number;
  unit: ChargeUnit;
  /** Highest quantity the stepper allows. */
  max?: number;
  qtyDisplay?: QtyDisplay;
}

export interface ReceiptLine {
  /** Catalog item id, or `custom:<id>` for a typed-in line. */
  itemId: string;
  name: string;
  unit: ChargeUnit;
  qtyDisplay: QtyDisplay;
  /** Price per unit when the line was added. Saved receipts keep their prices if the price list changes. */
  unitPrice: number;
  qty: number;
  /** Dania's own price for the whole line, replacing unitPrice × qty. */
  priceOverride: number | null;
  comp: boolean;
  compNote: string;
  note: string;
  /** Sort position on the receipt. */
  order: number;
}

export interface Visit {
  id: string;
  label: string;
  createdAt: number;
  lines: ReceiptLine[];
  /** Only used for the nail preview; shape has no price. */
  shape: NailShapeId;
  length: NailLengthId;
}

export interface Receipt {
  id: string;
  title: string;
  visits: Visit[];
  footnotes: string;
  grandTotalNote: string;
  createdAt: number;
  updatedAt: number;
}
