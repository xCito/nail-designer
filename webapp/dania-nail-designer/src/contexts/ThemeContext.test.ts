import { describe, expect, it } from 'vitest';
import { resolveThemePreference } from './ThemeContext';

describe('theme preference resolution', () => {
  it('uses the system theme when the preference is system', () => {
    expect(resolveThemePreference('system', 'dark')).toBe('dark');
    expect(resolveThemePreference('system', 'light')).toBe('light');
  });

  it('applies an explicit override instead of the system value', () => {
    expect(resolveThemePreference('dark', 'light')).toBe('dark');
    expect(resolveThemePreference('light', 'dark')).toBe('light');
  });
});
