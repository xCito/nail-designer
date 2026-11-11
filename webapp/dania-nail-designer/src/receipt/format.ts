import { CatalogItem, ChargeUnit, Receipt, ReceiptLine, Visit } from "./types";

const UNIT_TEXT: Record<ChargeUnit, string> = {
  flat: '',
  nail: ' / nail',
  toe: ' / toe',
  hand: ' / hand',
  piece: ' each',
  time: ' each time',
  wash: ' / wash',
};

export function lineTotal(line: ReceiptLine): number {
  return line.priceOverride ?? line.unitPrice * line.qty;
}

/** Comped lines are listed but not counted. */
export function visitTotal(visit: Visit): number {
  return visit.lines.reduce((sum, line) => sum + (line.comp ? 0 : lineTotal(line)), 0);
}

export function receiptTotal(receipt: Receipt): number {
  return receipt.visits.reduce((sum, visit) => sum + visitTotal(visit), 0);
}

export function formatMoney(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
}

/** "$2 / nail", "$25" */
export function priceText(item: Pick<CatalogItem, 'price' | 'unit'>): string {
  return `$${formatMoney(item.price)}${UNIT_TEXT[item.unit]}`;
}

export function sortLines(lines: ReceiptLine[]): ReceiptLine[] {
  return [...lines].sort((a, b) => a.order - b.order);
}

/** "Repairs (1, middle)", "Late (2) [COMP 2 sleepovers]", "Manicure" */
export function lineLabel(line: ReceiptLine): string {
  const details: string[] = [];
  if (line.unit !== 'flat' && (line.qtyDisplay === 'always' || line.qty > 1)) {
    details.push(String(line.qty));
  }
  if (line.note.trim()) {
    details.push(line.note.trim());
  }

  let label = line.name + (details.length ? ` (${details.join(', ')})` : '');
  if (line.comp) {
    label += line.compNote.trim() ? ` [COMP ${line.compNote.trim()}]` : ' [COMP]';
  }
  return label;
}

function ordinal(day: number): string {
  const lastTwo = day % 100;
  if (lastTwo >= 11 && lastTwo <= 13) return `${day}th`;
  switch (day % 10) {
    case 1: return `${day}st`;
    case 2: return `${day}nd`;
    case 3: return `${day}rd`;
    default: return `${day}th`;
  }
}

/** "November 11th Visit", from the day the visit was started. */
export function defaultVisitLabel(visit: Pick<Visit, 'createdAt'>): string {
  const date = new Date(visit.createdAt);
  const month = date.toLocaleString('en-US', { month: 'long' });
  return `${month} ${ordinal(date.getDate())} Visit`;
}

export function visitHeading(visit: Visit): string {
  const label = visit.label.trim().replace(/:+$/, '') || defaultVisitLabel(visit);
  return `${label}:`;
}

/** The text Dania pastes to her client. */
export function formatReceipt(receipt: Receipt): string {
  const out: string[] = [];
  const visits = receipt.visits.filter(v => v.lines.length > 0);
  const isMultiVisit = visits.length > 1;

  const priceWidth = Math.max(
    2,
    ...visits.flatMap(v => v.lines.map(l => formatMoney(lineTotal(l)).length)),
  );

  if (receipt.title.trim()) {
    out.push(receipt.title.trim(), '');
  }

  for (const visit of visits) {
    if (isMultiVisit || visit.label.trim()) {
      out.push(visitHeading(visit));
    }
    for (const line of sortLines(visit.lines)) {
      out.push(`$ ${formatMoney(lineTotal(line)).padStart(priceWidth)} - ${lineLabel(line)}`);
    }
    out.push('', `Total = $${formatMoney(visitTotal(visit))}`, '');
  }

  if (isMultiVisit) {
    const note = receipt.grandTotalNote.trim();
    out.push(`Grand Total = $${formatMoney(receiptTotal(receipt))}${note ? ` ${note}` : ''}`, '');
  }

  const footnotes = receipt.footnotes
    .split('\n')
    .map(f => f.trim().replace(/^[•\-*]\s*/, ''))
    .filter(Boolean);
  if (footnotes.length) {
    out.push(...footnotes.map(f => `• ${f}`));
  }

  while (out.length && out[out.length - 1] === '') out.pop();
  return out.join('\n');
}
