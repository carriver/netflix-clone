import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useIsMobile } from './useIsMobile';

const resizeWindowTo = (width) => {
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
};

describe('useIsMobile', () => {
  afterEach(() => vi.restoreAllMocks());

  it('follows the window across the 700px breakpoint', () => {
    window.innerWidth = 1200;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => resizeWindowTo(500));
    expect(result.current).toBe(true);

    act(() => resizeWindowTo(1200));
    expect(result.current).toBe(false);
  });

  it('removes its resize listener when unmounted', () => {
    const addListener = vi.spyOn(window, 'addEventListener');
    const removeListener = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useIsMobile());

    unmount();

    const added = addListener.mock.calls.filter(([type]) => type === 'resize');
    const removed = removeListener.mock.calls.filter(([type]) => type === 'resize');
    expect(added).toHaveLength(1);
    expect(removed).toEqual(added);
  });
});
