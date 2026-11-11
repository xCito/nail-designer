import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { defaultVisitLabel, formatMoney, formatReceipt, lineLabel, lineTotal, receiptTotal, sortLines, visitTotal } from "@/receipt/format";
import { ReceiptAction, isBlankReceipt } from "@/receipt/receipt-reducer";
import { useReceipt } from "@/receipt/ReceiptContext";
import { ReceiptLine } from "@/receipt/types";
import { CloseIcon } from "../CloseIcon";
import { CollapseIcon } from "../CollapseIcon";
import { ExpandIcon } from "../ExpandIcon";

type LinePatch = Extract<ReceiptAction, { type: 'updateLine' }>['patch'];

const SWIPE_DRAG_THRESHOLD = 90;
type DrawerState = "close" | "open" | "full";

function resolveDragState(currentState: DrawerState, deltaY: number): DrawerState {
  if (currentState === 'close') return deltaY < -SWIPE_DRAG_THRESHOLD ? 'open' : 'close';
  if (currentState === 'open') {
    if (deltaY > SWIPE_DRAG_THRESHOLD) return 'close';
    if (deltaY < -SWIPE_DRAG_THRESHOLD) return 'full';
    return 'open';
  }
  return deltaY > SWIPE_DRAG_THRESHOLD ? 'open' : 'full';
}

function getDrawerHeight(state: DrawerState) {
  if (typeof window === 'undefined') return 56;
  const viewportHeight = window.innerHeight;
  const fullHeight = Math.min(viewportHeight - 110, 760);
  switch (state) {
    case 'close': return 56;
    case 'open': return Math.min(Math.max(viewportHeight * 0.42, 220), 360);
    case 'full': return Math.max(Math.min(fullHeight, viewportHeight * 0.85), 360);
  }
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers, or a page not served over https.
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  }
}

/** Text box for money that allows half-typed values like "2." */
function MoneyInput({ value, placeholder, onChange, label }: {
  value: number | null, placeholder: string, onChange: (v: number | null) => void, label: string
}) {
  const [text, setText] = useState(value === null ? '' : String(value));

  // Cleared from outside (the "Use $X" button).
  useEffect(() => {
    if (value === null && text !== '' && Number.isFinite(Number(text))) setText('');
  }, [value, text]);

  return <span className="money-input">
    $<input
      type="text"
      inputMode="decimal"
      aria-label={label}
      placeholder={placeholder}
      value={text}
      onChange={e => {
        const next = e.target.value.replace(/[^0-9.]/g, '');
        setText(next);
        const num = Number(next);
        onChange(next === '' || !Number.isFinite(num) ? null : num);
      }} />
  </span>;
}

function LineEditor({ line }: { line: ReceiptLine }) {
  const { dispatch } = useReceipt();
  const update = (patch: LinePatch) =>
    dispatch({ type: 'updateLine', itemId: line.itemId, patch });
  const defaultTotal = line.unitPrice * line.qty;

  return <div className="line-editor">
    <label className="field">
      <span>Name on receipt</span>
      <input type="text" value={line.name} onChange={e => update({ name: e.target.value })} />
    </label>

    {line.unit !== 'flat' && <div className="field">
      <span>How many</span>
      <div className="stepper">
        <button type="button" aria-label="One less" disabled={line.qty <= 1} onClick={() => update({ qty: line.qty - 1 })}>−</button>
        <span className="stepper-value">{line.qty}</span>
        <button type="button" aria-label="One more" onClick={() => update({ qty: line.qty + 1 })}>+</button>
      </div>
    </div>}

    <div className="field">
      <span>Price for this line</span>
      <div className="d-flex align-items-center gap-2">
        <MoneyInput
          label="Price for this line"
          value={line.priceOverride}
          placeholder={formatMoney(defaultTotal)}
          onChange={v => update({ priceOverride: v })} />
        {line.priceOverride !== null
          ? <button type="button" className="link-btn" onClick={() => update({ priceOverride: null })}>Use ${formatMoney(defaultTotal)}</button>
          : <span className="field-hint">Price list: ${formatMoney(defaultTotal)}</span>}
      </div>
    </div>

    <label className="field">
      <span>Note</span>
      <input type="text" placeholder="e.g. middle, thumb" value={line.note} onChange={e => update({ note: e.target.value })} />
    </label>

    <div className="field">
      <label className="d-flex align-items-center gap-2">
        <input type="checkbox" checked={line.comp} onChange={e => update({ comp: e.target.checked })} />
        <span>Comp (free, not counted in the total)</span>
      </label>
      {line.comp && <input type="text" className="mt-2" placeholder="Reason (optional), e.g. 2 sleepovers"
        value={line.compNote} onChange={e => update({ compNote: e.target.value })} />}
    </div>

    <button type="button" className="danger-btn" onClick={() => dispatch({ type: 'removeLine', itemId: line.itemId })}>
      Remove from receipt
    </button>
  </div>;
}

function SavedReceipts({ onOpen }: { onOpen: () => void }) {
  const { state, dispatch } = useReceipt();
  const saved = state.receipts
    .filter(r => !isBlankReceipt(r))
    .sort((a, b) => b.updatedAt - a.updatedAt);

  if (saved.length === 0) {
    return <p className="empty-note">No saved receipts yet. Receipts are saved on this device as you work.</p>;
  }

  return <ul className="saved-list">
    {saved.map(r => {
      const isOpen = r.id === state.activeReceiptId;
      return <li key={r.id} className={classNames({ current: isOpen })}>
        <div className="saved-info">
          <strong>{r.title.trim() || 'Untitled receipt'}</strong>
          <span>
            {new Date(r.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            {' · '}{r.visits.length} visit{r.visits.length === 1 ? '' : 's'}
            {' · '}${formatMoney(receiptTotal(r))}
          </span>
        </div>
        {isOpen
          ? <span className="saved-current">Open</span>
          : <button type="button" onClick={() => { dispatch({ type: 'openReceipt', receiptId: r.id }); onOpen(); }}>Open</button>}
        <button type="button" className="danger-btn" aria-label={`Delete ${r.title || 'untitled receipt'}`}
          onClick={() => {
            if (window.confirm(`Delete "${r.title.trim() || 'Untitled receipt'}"? This can't be undone.`)) {
              dispatch({ type: 'deleteReceipt', receiptId: r.id });
            }
          }}>Delete</button>
      </li>;
    })}
  </ul>;
}

export function ReceiptDrawer() {
  const { receipt, visit, dispatch } = useReceipt();
  const [drawer, setDrawer] = useState<DrawerState>('close');
  const [dragOffset, setDragOffset] = useState(0);
  const dragState = useRef({ active: false, startY: 0, currentState: 'close' as DrawerState });
  const [editingLine, setEditingLine] = useState<string | null>(null);
  const [showSaved, setShowSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const total = receiptTotal(receipt);
  const isMultiVisit = receipt.visits.length > 1;
  const visitIndex = receipt.visits.findIndex(v => v.id === visit.id);
  const text = formatReceipt(receipt);

  const height = dragState.current.active
    ? getDrawerHeight(dragState.current.currentState) - dragOffset
    : getDrawerHeight(drawer);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if ((event.target as HTMLElement).closest('button')) return;
    dragState.current = { active: true, startY: event.clientY, currentState: drawer };
    setDragOffset(0);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;
    const deltaY = event.clientY - dragState.current.startY;
    if (Math.abs(deltaY) > 8) setDragOffset(deltaY);
  };

  const onPointerUp = () => {
    if (!dragState.current.active) return;
    const moved = Math.abs(dragOffset) > 8;
    const next = moved
      ? resolveDragState(dragState.current.currentState, dragOffset)
      : (drawer === 'close' ? 'full' : drawer);
    dragState.current.active = false;
    setDragOffset(0);
    setDrawer(next);
  };

  const onCopy = async () => {
    if (await copyText(text)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return <>
    {drawer !== 'close' && <div className="summary-backdrop" onClick={() => setDrawer('close')} />}
    <div
      className={classNames("summary-drawer", { open: drawer !== 'close', full: drawer === 'full' })}
      style={{ height: `${height}px`, transition: dragState.current.active ? 'none' : undefined }}
    >
      <div
        className="header px-3 py-3"
        role="button"
        aria-label={drawer === 'close' ? 'Open receipt' : 'Receipt'}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <h3 className="title m-0">Receipt</h3>
        <h3 className="text-center price m-0">
          Total ${formatMoney(total)}
          {isMultiVisit && <small className="price-visit"> · visit {visitIndex + 1} of {receipt.visits.length}</small>}
        </h3>
        <div className="btn-group">
          <button type="button" aria-label={drawer === 'full' ? 'Make smaller' : 'Make bigger'}
            onClick={() => setDrawer(drawer === 'full' ? 'open' : 'full')}>
            {drawer === 'full' ? <CollapseIcon /> : <ExpandIcon />}
          </button>
          <button type="button" aria-label="Close receipt" onClick={() => setDrawer('close')}>
            <CloseIcon />
          </button>
        </div>
      </div>

      <div className="summary-table receipt-body px-3 pb-4" hidden={drawer === 'close' && !dragState.current.active}>
        <div className="receipt-toolbar">
          <button type="button" disabled={isBlankReceipt(receipt)}
            onClick={() => { dispatch({ type: 'newReceipt' }); setEditingLine(null); }}>
            New receipt
          </button>
          <button type="button" className={classNames({ active: showSaved })} onClick={() => setShowSaved(!showSaved)}>
            Saved receipts
          </button>
        </div>
        {showSaved && <SavedReceipts onOpen={() => { setShowSaved(false); setEditingLine(null); }} />}

        <label className="field">
          <span>Title</span>
          <input type="text" placeholder="🌸🩰 Simply Pink 🩰🌸" value={receipt.title}
            onChange={e => dispatch({ type: 'setTitle', title: e.target.value })} />
        </label>

        <div className="field">
          <span>Visits</span>
          <div className="visit-tabs">
            {receipt.visits.map((v, i) =>
              <button key={v.id} type="button"
                className={classNames({ active: v.id === visit.id })}
                aria-pressed={v.id === visit.id}
                onClick={() => { dispatch({ type: 'selectVisit', visitId: v.id }); setEditingLine(null); }}>
                {v.label.trim() || `Visit ${i + 1}`}
              </button>
            )}
            <button type="button" className="add-visit" onClick={() => { dispatch({ type: 'addVisit' }); setEditingLine(null); }}>
              + Visit
            </button>
          </div>
          <p className="field-hint mt-1 mb-0">Items you pick on the pages go into the highlighted visit.</p>
        </div>

        <div className="visit-card">
          <div className="d-flex gap-2 align-items-center">
            <input type="text" className="flex-grow-1" aria-label="Visit name"
              placeholder={isMultiVisit ? defaultVisitLabel(visit) : 'Visit name (optional)'}
              value={visit.label}
              onChange={e => dispatch({ type: 'setVisitLabel', visitId: visit.id, label: e.target.value })} />
            {(isMultiVisit || visit.lines.length > 0) &&
              <button type="button" className="danger-btn"
                onClick={() => {
                  const what = isMultiVisit ? 'Remove this visit' : 'Clear everything on this visit';
                  if (window.confirm(`${what}?`)) dispatch({ type: 'removeVisit', visitId: visit.id });
                }}>
                {isMultiVisit ? 'Remove' : 'Clear'}
              </button>}
          </div>

          {visit.lines.length === 0
            ? <p className="empty-note">Nothing on this visit yet. Pick services on the Hands, Toes or Hair page.</p>
            : <ul className="line-list">
              {sortLines(visit.lines).map(line =>
                <li key={line.itemId} className={classNames({ comp: line.comp, editing: editingLine === line.itemId })}>
                  <button type="button" className="line-row" aria-expanded={editingLine === line.itemId}
                    onClick={() => setEditingLine(editingLine === line.itemId ? null : line.itemId)}>
                    <span className="line-price">${formatMoney(lineTotal(line))}</span>
                    <span className="line-name">{lineLabel(line)}</span>
                    <span className="line-edit">{editingLine === line.itemId ? 'Done' : 'Edit'}</span>
                  </button>
                  {editingLine === line.itemId && <LineEditor line={line} />}
                </li>
              )}
            </ul>}

          <div className="visit-total">
            <span>{isMultiVisit ? 'Visit total' : 'Total'}</span>
            <strong>${formatMoney(visitTotal(visit))}</strong>
          </div>
        </div>

        {isMultiVisit && <label className="field">
          <span>Grand total note</span>
          <input type="text" placeholder="(for June)" value={receipt.grandTotalNote}
            onChange={e => dispatch({ type: 'setGrandTotalNote', note: e.target.value })} />
        </label>}

        <label className="field">
          <span>Footnotes <span className="field-hint">one per line</span></span>
          <textarea rows={3} placeholder="Magnetic = base gel, magnetic color, top coat" value={receipt.footnotes}
            onChange={e => dispatch({ type: 'setFootnotes', footnotes: e.target.value })} />
        </label>

        <div className="field">
          <span>What the client gets</span>
          <pre className="receipt-preview">{text || 'Add something to see the receipt.'}</pre>
        </div>

        <button type="button" className="copy-btn" disabled={!text} onClick={onCopy}>
          {copied ? 'Copied!' : 'Copy receipt'}
        </button>
      </div>
    </div>
  </>;
}
