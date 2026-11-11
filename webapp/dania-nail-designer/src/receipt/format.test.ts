import { describe, expect, it } from 'vitest';
import { CHOICE_GROUPS, buildItemId } from './catalog';
import { defaultVisitLabel, formatReceipt, lineLabel, receiptTotal } from './format';
import { ReceiptAction, ReceiptsState, getActiveReceipt, getActiveVisit, initialState, receiptsReducer } from './receipt-reducer';

function run(actions: ReceiptAction[], start: ReceiptsState = initialState()) {
  return actions.reduce(receiptsReducer, start);
}

describe('formatReceipt', () => {
  it('reproduces a two-visit receipt with a comped line and a grand total note', () => {
    let state = run([{ type: 'setTitle', title: '🤍🌺 Hibiscus Azúl & Wallpaper 🌺💙' }]);
    state = run([
      { type: 'setVisitLabel', visitId: state.activeVisitId, label: 'June 3rd & 4th Visits' },
      { type: 'setQty', itemId: 'manicure', qty: 1 },
      { type: 'choose', groupIds: CHOICE_GROUPS.build, itemId: buildItemId('ns', 'polygel') },
      { type: 'setQty', itemId: 'repairs', qty: 1 },
      { type: 'addVisit' },
    ], state);
    state = run([
      { type: 'setVisitLabel', visitId: state.activeVisitId, label: 'June 8th Visit' },
      { type: 'setQty', itemId: 'manicure', qty: 1 },
      { type: 'updateLine', itemId: 'manicure', patch: { comp: true } },
      { type: 'setQty', itemId: 'wallpaper', qty: 2 },
      { type: 'updateLine', itemId: 'wallpaper', patch: { name: 'Hibiscus Wallpaper' } },
      { type: 'setQty', itemId: 'french', qty: 6 },
      { type: 'setQty', itemId: 'charm_large', qty: 2 },
      { type: 'setQty', itemId: 'supple', qty: 2 },
      { type: 'setQty', itemId: 'late', qty: 1 },
      { type: 'setGrandTotalNote', note: '(for June)' },
    ], state);

    expect(formatReceipt(getActiveReceipt(state))).toBe([
      '🤍🌺 Hibiscus Azúl & Wallpaper 🌺💙',
      '',
      'June 3rd & 4th Visits:',
      '$ 25 - Manicure',
      '$ 35 - NS Polygel',
      '$  3 - Repairs (1)',
      '',
      'Total = $63',
      '',
      'June 8th Visit:',
      '$ 25 - Manicure [COMP]',
      '$ 12 - French (6)',
      '$ 10 - Hibiscus Wallpaper (2)',
      '$ 20 - Large Charm (2)',
      '$ 10 - Supple Treat. (2)',
      '$  5 - Late (1)',
      '',
      'Total = $57',
      '',
      'Grand Total = $120 (for June)',
    ].join('\n'));
  });

  it('prints a single visit without a heading, and adds footnotes', () => {
    const state = run([
      { type: 'setTitle', title: '🍂🦶🏼Deluxe Fall Toes 🦶🏼🧲' },
      { type: 'choose', groupIds: CHOICE_GROUPS.pedicure, itemId: 'pedi_russian' },
      { type: 'setQty', itemId: 'magnetic', qty: 10 },
      { type: 'setQty', itemId: 'hydration', qty: 1 },
      { type: 'setFootnotes', footnotes: 'Magnetic = base gel, magnetic color, top coat\n• Hydration = Saran Wrap\n\n' },
    ]);

    expect(formatReceipt(getActiveReceipt(state))).toBe([
      '🍂🦶🏼Deluxe Fall Toes 🦶🏼🧲',
      '',
      '$ 25 - Russian Pedicure',
      '$ 20 - Magnetic (10)',
      '$  5 - Hydration',
      '',
      'Total = $50',
      '',
      '• Magnetic = base gel, magnetic color, top coat',
      '• Hydration = Saran Wrap',
    ].join('\n'));
  });

  it('pads prices to the widest line and uses price overrides', () => {
    const state = run([
      { type: 'setQty', itemId: 'wash', qty: 3 },
      { type: 'addCustomLine', name: 'Big Job', price: 120 },
      { type: 'setQty', itemId: 'deep_condition', qty: 1 },
      { type: 'updateLine', itemId: 'deep_condition', patch: { priceOverride: 8 } },
    ]);
    expect(formatReceipt(getActiveReceipt(state))).toBe([
      '$  15 - Wash (3)',
      '$   8 - Deep Conditioning',
      '$ 120 - Big Job',
      '',
      'Total = $143',
    ].join('\n'));
  });
});

describe('lineLabel', () => {
  const base = { itemId: 'repairs', name: 'Repairs', unit: 'nail' as const, qtyDisplay: 'always' as const, unitPrice: 3, qty: 1, priceOverride: null, comp: false, compNote: '', note: '', order: 0 };

  it('combines quantity, note and comp note', () => {
    expect(lineLabel({ ...base, note: 'middle' })).toBe('Repairs (1, middle)');
    expect(lineLabel({ ...base, name: 'Late', qty: 2, comp: true, compNote: '2 sleepovers' })).toBe('Late (2) [COMP 2 sleepovers]');
  });

  it('hides a single wash count', () => {
    expect(lineLabel({ ...base, name: 'Wash', unit: 'wash', qtyDisplay: 'multiple' })).toBe('Wash');
    expect(lineLabel({ ...base, name: 'Wash', unit: 'wash', qtyDisplay: 'multiple', qty: 2 })).toBe('Wash (2)');
  });
});

describe('defaultVisitLabel', () => {
  it('names a visit after its date', () => {
    expect(defaultVisitLabel({ createdAt: new Date(2026, 5, 3).getTime() })).toBe('June 3rd Visit');
    expect(defaultVisitLabel({ createdAt: new Date(2026, 6, 11).getTime() })).toBe('July 11th Visit');
    expect(defaultVisitLabel({ createdAt: new Date(2026, 6, 22).getTime() })).toBe('July 22nd Visit');
  });
});

describe('build price list', () => {
  it('offers Builder Gel for new sets only', () => {
    expect(CHOICE_GROUPS.build).toContain(buildItemId('ns', 'builder'));
    expect(CHOICE_GROUPS.build).not.toContain(buildItemId('rebalance', 'builder'));
    expect(CHOICE_GROUPS.build).not.toContain(buildItemId('refill', 'builder'));
  });
});

describe('receiptsReducer', () => {
  it('keeps only one option of a choice group', () => {
    const state = run([
      { type: 'choose', groupIds: CHOICE_GROUPS.styling, itemId: 'style_kid' },
      { type: 'choose', groupIds: CHOICE_GROUPS.styling, itemId: 'style_adult_long' },
    ]);
    expect(getActiveVisit(state).lines.map(l => l.itemId)).toEqual(['style_adult_long']);
    expect(receiptTotal(getActiveReceipt(state))).toBe(25);
  });

  it('removes a line when its quantity drops to zero', () => {
    const state = run([
      { type: 'setQty', itemId: 'gems', qty: 3 },
      { type: 'setQty', itemId: 'gems', qty: 0 },
    ]);
    expect(getActiveVisit(state).lines).toEqual([]);
  });

  it('does not start a new receipt while the current one is empty', () => {
    const start = initialState();
    expect(receiptsReducer(start, { type: 'newReceipt' })).toBe(start);
  });

  it('starts a fresh receipt after deleting the open one', () => {
    const start = run([{ type: 'setTitle', title: 'Simply Pink' }]);
    const state = receiptsReducer(start, { type: 'deleteReceipt', receiptId: start.activeReceiptId });
    expect(state.receipts).toHaveLength(1);
    expect(getActiveReceipt(state).title).toBe('');
  });
});
