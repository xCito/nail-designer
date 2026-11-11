import { NailLengthId, NailShapeId } from "@/constants/design-constants";
import { CUSTOM_ORDER_START, getCatalogItem } from "./catalog";
import { Receipt, ReceiptLine, Visit } from "./types";

export interface ReceiptsState {
  receipts: Receipt[];
  activeReceiptId: string;
  activeVisitId: string;
}

export type ReceiptAction =
  | { type: 'setTitle', title: string }
  | { type: 'setFootnotes', footnotes: string }
  | { type: 'setGrandTotalNote', note: string }
  | { type: 'addVisit' }
  | { type: 'removeVisit', visitId: string }
  | { type: 'selectVisit', visitId: string }
  | { type: 'setVisitLabel', visitId: string, label: string }
  /** Sets how many of a price list item are on the active visit. 0 removes it. */
  | { type: 'setQty', itemId: string, qty: number }
  /** Puts one option of a choice group on the active visit and removes the others. null clears the group. */
  | { type: 'choose', groupIds: readonly string[], itemId: string | null }
  | { type: 'updateLine', itemId: string, patch: Partial<Pick<ReceiptLine, 'qty' | 'priceOverride' | 'comp' | 'compNote' | 'note' | 'name'>> }
  | { type: 'removeLine', itemId: string }
  | { type: 'addCustomLine', name: string, price: number }
  | { type: 'setNail', shape?: NailShapeId, length?: NailLengthId }
  | { type: 'newReceipt' }
  | { type: 'openReceipt', receiptId: string }
  | { type: 'deleteReceipt', receiptId: string };

export function makeId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function newVisit(now = Date.now()): Visit {
  return { id: makeId(), label: '', createdAt: now, lines: [], shape: 'round', length: 'none' };
}

export function newReceipt(now = Date.now()): Receipt {
  return {
    id: makeId(),
    title: '',
    visits: [newVisit(now)],
    footnotes: '',
    grandTotalNote: '',
    createdAt: now,
    updatedAt: now,
  };
}

export function initialState(): ReceiptsState {
  const receipt = newReceipt();
  return { receipts: [receipt], activeReceiptId: receipt.id, activeVisitId: receipt.visits[0].id };
}

export function isBlankReceipt(receipt: Receipt): boolean {
  return !receipt.title.trim()
    && !receipt.footnotes.trim()
    && receipt.visits.every(v => v.lines.length === 0);
}

export function getActiveReceipt(state: ReceiptsState): Receipt {
  return state.receipts.find(r => r.id === state.activeReceiptId) ?? state.receipts[0];
}

export function getActiveVisit(state: ReceiptsState): Visit {
  const receipt = getActiveReceipt(state);
  return receipt.visits.find(v => v.id === state.activeVisitId) ?? receipt.visits[receipt.visits.length - 1];
}

function lineFromCatalog(itemId: string, qty: number): ReceiptLine {
  const item = getCatalogItem(itemId);
  return {
    itemId,
    name: item.name,
    unit: item.unit,
    qtyDisplay: item.qtyDisplay ?? 'always',
    unitPrice: item.price,
    qty: item.unit === 'flat' ? 1 : qty,
    priceOverride: null,
    comp: false,
    compNote: '',
    note: '',
    order: item.order,
  };
}

function updateReceipt(state: ReceiptsState, fn: (r: Receipt) => Receipt): ReceiptsState {
  const active = getActiveReceipt(state);
  return {
    ...state,
    receipts: state.receipts.map(r => r.id === active.id ? { ...fn(r), updatedAt: Date.now() } : r),
  };
}

function updateVisit(state: ReceiptsState, fn: (v: Visit) => Visit, visitId = getActiveVisit(state).id): ReceiptsState {
  return updateReceipt(state, r => ({
    ...r,
    visits: r.visits.map(v => v.id === visitId ? fn(v) : v),
  }));
}

function setLineQty(visit: Visit, itemId: string, qty: number): Visit {
  if (qty <= 0) {
    return { ...visit, lines: visit.lines.filter(l => l.itemId !== itemId) };
  }
  const existing = visit.lines.find(l => l.itemId === itemId);
  if (existing) {
    return { ...visit, lines: visit.lines.map(l => l.itemId === itemId ? { ...l, qty } : l) };
  }
  return { ...visit, lines: [...visit.lines, lineFromCatalog(itemId, qty)] };
}

export function receiptsReducer(state: ReceiptsState, action: ReceiptAction): ReceiptsState {
  switch (action.type) {
    case 'setTitle':
      return updateReceipt(state, r => ({ ...r, title: action.title }));

    case 'setFootnotes':
      return updateReceipt(state, r => ({ ...r, footnotes: action.footnotes }));

    case 'setGrandTotalNote':
      return updateReceipt(state, r => ({ ...r, grandTotalNote: action.note }));

    case 'addVisit': {
      const visit = newVisit();
      const next = updateReceipt(state, r => ({ ...r, visits: [...r.visits, visit] }));
      return { ...next, activeVisitId: visit.id };
    }

    case 'removeVisit': {
      const receipt = getActiveReceipt(state);
      if (receipt.visits.length === 1) {
        // Removing the only visit just empties it.
        return updateVisit(state, v => ({ ...v, label: '', lines: [] }), action.visitId);
      }
      const next = updateReceipt(state, r => ({ ...r, visits: r.visits.filter(v => v.id !== action.visitId) }));
      const remaining = getActiveReceipt(next).visits;
      return {
        ...next,
        activeVisitId: state.activeVisitId === action.visitId ? remaining[remaining.length - 1].id : state.activeVisitId,
      };
    }

    case 'selectVisit':
      return { ...state, activeVisitId: action.visitId };

    case 'setVisitLabel':
      return updateVisit(state, v => ({ ...v, label: action.label }), action.visitId);

    case 'setQty':
      return updateVisit(state, v => setLineQty(v, action.itemId, action.qty));

    case 'choose':
      return updateVisit(state, v => {
        const others = v.lines.filter(l => !action.groupIds.includes(l.itemId) || l.itemId === action.itemId);
        const cleared = { ...v, lines: others };
        if (action.itemId === null || cleared.lines.some(l => l.itemId === action.itemId)) {
          return cleared;
        }
        return setLineQty(cleared, action.itemId, 1);
      });

    case 'updateLine':
      return updateVisit(state, v => ({
        ...v,
        lines: v.lines.map(l => l.itemId === action.itemId ? { ...l, ...action.patch } : l),
      }));

    case 'removeLine':
      return updateVisit(state, v => ({ ...v, lines: v.lines.filter(l => l.itemId !== action.itemId) }));

    case 'addCustomLine':
      return updateVisit(state, v => {
        const customCount = v.lines.filter(l => l.order >= CUSTOM_ORDER_START).length;
        const line: ReceiptLine = {
          itemId: `custom:${makeId()}`,
          name: action.name.trim(),
          unit: 'flat',
          qtyDisplay: 'always',
          unitPrice: action.price,
          qty: 1,
          priceOverride: null,
          comp: false,
          compNote: '',
          note: '',
          order: CUSTOM_ORDER_START + customCount,
        };
        return { ...v, lines: [...v.lines, line] };
      });

    case 'setNail':
      return updateVisit(state, v => ({
        ...v,
        shape: action.shape ?? v.shape,
        length: action.length ?? v.length,
      }));

    case 'newReceipt': {
      const current = getActiveReceipt(state);
      if (isBlankReceipt(current)) return state;
      const receipt = newReceipt();
      return {
        receipts: [...state.receipts, receipt],
        activeReceiptId: receipt.id,
        activeVisitId: receipt.visits[0].id,
      };
    }

    case 'openReceipt': {
      const receipt = state.receipts.find(r => r.id === action.receiptId);
      if (!receipt) return state;
      const current = getActiveReceipt(state);
      const receipts = isBlankReceipt(current) && current.id !== receipt.id
        ? state.receipts.filter(r => r.id !== current.id)
        : state.receipts;
      return {
        receipts,
        activeReceiptId: receipt.id,
        activeVisitId: receipt.visits[receipt.visits.length - 1].id,
      };
    }

    case 'deleteReceipt': {
      const receipts = state.receipts.filter(r => r.id !== action.receiptId);
      if (action.receiptId !== state.activeReceiptId) {
        return { ...state, receipts };
      }
      const fresh = newReceipt();
      return {
        receipts: [...receipts, fresh],
        activeReceiptId: fresh.id,
        activeVisitId: fresh.visits[0].id,
      };
    }

    default:
      return state;
  }
}
