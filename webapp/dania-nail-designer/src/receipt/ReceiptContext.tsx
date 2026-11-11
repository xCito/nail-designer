import { ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import { ReceiptAction, ReceiptsState, getActiveReceipt, getActiveVisit, receiptsReducer } from "./receipt-reducer";
import { loadReceipts, saveReceipts } from "./storage";
import { Receipt, Visit } from "./types";

interface ReceiptContextValue {
  state: ReceiptsState;
  receipt: Receipt;
  visit: Visit;
  dispatch: (action: ReceiptAction) => void;
}

const ReceiptContext = createContext<ReceiptContextValue | null>(null);

export function ReceiptProvider({ children }: { children?: ReactNode }) {
  const [state, dispatch] = useReducer(receiptsReducer, undefined, loadReceipts);

  useEffect(() => {
    saveReceipts(state);
  }, [state]);

  const value: ReceiptContextValue = {
    state,
    receipt: getActiveReceipt(state),
    visit: getActiveVisit(state),
    dispatch,
  };
  return <ReceiptContext.Provider value={value}>{children}</ReceiptContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useReceipt(): ReceiptContextValue {
  const value = useContext(ReceiptContext);
  if (!value) throw new Error('useReceipt must be used inside <ReceiptProvider>');
  return value;
}

/** Quantity of a price list item on the visit being edited (0 if it isn't there). */
// eslint-disable-next-line react-refresh/only-export-components
export function useItemQty(itemId: string): number {
  const { visit } = useReceipt();
  return visit.lines.find(l => l.itemId === itemId)?.qty ?? 0;
}
