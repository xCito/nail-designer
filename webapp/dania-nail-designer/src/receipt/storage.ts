import { ReceiptsState, initialState, isBlankReceipt } from "./receipt-reducer";

export const RECEIPTS_STORAGE_KEY = 'dania-receipts-v1';

/** Receipts are kept in this browser only (Dania's phone). */
export function loadReceipts(): ReceiptsState {
  try {
    const raw = window.localStorage.getItem(RECEIPTS_STORAGE_KEY);
    if (!raw) return initialState();

    const parsed = JSON.parse(raw) as ReceiptsState;
    const receipts = Array.isArray(parsed.receipts)
      ? parsed.receipts.filter(r => r && typeof r.id === 'string' && Array.isArray(r.visits) && r.visits.length > 0)
      : [];
    const active = receipts.find(r => r.id === parsed.activeReceiptId);
    if (!active) return initialState();

    const visit = active.visits.find(v => v.id === parsed.activeVisitId) ?? active.visits[active.visits.length - 1];
    return { receipts, activeReceiptId: active.id, activeVisitId: visit.id };
  } catch {
    return initialState();
  }
}

export function saveReceipts(state: ReceiptsState) {
  try {
    // Don't keep empty receipts around, except the one being worked on.
    const receipts = state.receipts.filter(r => r.id === state.activeReceiptId || !isBlankReceipt(r));
    window.localStorage.setItem(RECEIPTS_STORAGE_KEY, JSON.stringify({ ...state, receipts }));
  } catch {
    // Storage can be full or blocked (private browsing). The app still works for this sitting.
  }
}
