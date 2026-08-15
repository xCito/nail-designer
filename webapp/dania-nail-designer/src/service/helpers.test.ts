import { describe, expect, it } from 'vitest';
import { interpolateSvgPath } from './helpers';

describe('interpolateSvgPath', () => {
  it('blends matching cubic bezier commands without breaking the path structure', () => {
    const from = 'M 0 0 C 10 10 20 20 30 30';
    const to = 'M 0 0 C 20 20 30 30 40 40';

    expect(interpolateSvgPath(from, to, 0.5)).toBe('M 0 0 C 15 15 25 25 35 35');
  });
});
