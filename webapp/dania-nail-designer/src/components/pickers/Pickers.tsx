import classNames from "classnames";
import { ReactNode, useState } from "react";
import { priceText } from "@/receipt/format";
import { useItemQty, useReceipt } from "@/receipt/ReceiptContext";
import { CatalogItem } from "@/receipt/types";

export function PickerSection({ title, hint, children }: { title: string, hint?: string, children: ReactNode }) {
  return <section className="picker-section">
    <h4 className="picker-title">
      {title}
      {hint && <span className="picker-hint">{hint}</span>}
    </h4>
    {children}
  </section>;
}

function Chip({ label, price, active, onClick, disabled }: {
  label: string, price?: string, active: boolean, onClick: () => void, disabled?: boolean
}) {
  return <button
    type="button"
    className={classNames('chip', { active })}
    aria-pressed={active}
    disabled={disabled}
    onClick={onClick}>
    <span className="chip-label">{label}</span>
    {price && <span className="chip-price">{price}</span>}
  </button>;
}

/** On/off item, e.g. Manicure, Hydration. */
export function ToggleChip({ item }: { item: CatalogItem }) {
  const { dispatch } = useReceipt();
  const qty = useItemQty(item.id);
  return <Chip
    label={item.label ?? item.name}
    price={priceText(item)}
    active={qty > 0}
    onClick={() => dispatch({ type: 'setQty', itemId: item.id, qty: qty > 0 ? 0 : 1 })} />;
}

/** Pick one (or none) of a group, e.g. Kid / Adult haircut. */
export function ChoiceChips({ items, groupIds, onChoose }: {
  items: CatalogItem[], groupIds: readonly string[], onChoose?: (itemId: string | null) => void
}) {
  const { dispatch, visit } = useReceipt();
  const activeId = visit.lines.find(l => groupIds.includes(l.itemId))?.itemId ?? null;

  return <div className="chip-grid">
    {items.map(item => <Chip
      key={item.id}
      label={item.label ?? item.name}
      price={priceText(item)}
      active={activeId === item.id}
      onClick={() => {
        const next = activeId === item.id ? null : item.id;
        dispatch({ type: 'choose', groupIds, itemId: next });
        onChoose?.(next);
      }} />)}
  </div>;
}

export function ChipGrid({ children }: { children: ReactNode }) {
  return <div className="chip-grid">{children}</div>;
}

/** Counted item, e.g. French on 6 nails, 2 Late arrivals. */
export function CountRow({ item, quickFill }: { item: CatalogItem, quickFill?: number }) {
  const { dispatch } = useReceipt();
  const qty = useItemQty(item.id);
  const max = item.max ?? 10;
  const setQty = (n: number) => dispatch({ type: 'setQty', itemId: item.id, qty: Math.max(0, Math.min(max, n)) });

  return <div className={classNames('count-row', { active: qty > 0 })}>
    <button type="button" className="count-name" onClick={() => setQty(qty === 0 ? 1 : qty)}>
      <span className="chip-label">{item.label ?? item.name}</span>
      <span className="chip-price">{priceText(item)}</span>
    </button>
    <div className="stepper">
      <button type="button" aria-label={`One less ${item.name}`} disabled={qty === 0} onClick={() => setQty(qty - 1)}>−</button>
      <span className="stepper-value" aria-live="polite">{qty}</span>
      <button type="button" aria-label={`One more ${item.name}`} disabled={qty >= max} onClick={() => setQty(qty + 1)}>+</button>
      {quickFill !== undefined &&
        <button type="button" className="stepper-quick" onClick={() => setQty(qty === quickFill ? 0 : quickFill)}>
          {qty === quickFill ? 'None' : `All ${quickFill}`}
        </button>}
    </div>
  </div>;
}

export function CountList({ items, quickFill }: { items: CatalogItem[], quickFill?: number }) {
  return <div className="count-list">
    {items.map(item => <CountRow key={item.id} item={item} quickFill={quickFill} />)}
  </div>;
}

/** Anything not on the price list. */
export function CustomLineForm() {
  const { dispatch } = useReceipt();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const priceNum = Number(price);
  const canAdd = name.trim() !== '' && price.trim() !== '' && Number.isFinite(priceNum) && priceNum >= 0;

  return <form className="custom-line" onSubmit={e => {
    e.preventDefault();
    if (!canAdd) return;
    dispatch({ type: 'addCustomLine', name, price: priceNum });
    setName('');
    setPrice('');
  }}>
    <input type="text" placeholder="Item name" value={name} onChange={e => setName(e.target.value)} aria-label="Custom item name" />
    <span className="money-input">
      $<input type="text" inputMode="decimal" placeholder="0" value={price}
        onChange={e => setPrice(e.target.value.replace(/[^0-9.]/g, ''))} aria-label="Custom item price" />
    </span>
    <button type="submit" disabled={!canAdd}>Add</button>
  </form>;
}
