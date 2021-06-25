import React from "react";

import { useEffectSkipFirst } from "./common";

type Sizes = { width: number; height: number };

export function useMeasureCallback(callback: (sizes: Sizes, contentRect: DOMRectReadOnly) => void) {
  const [element, setElement] = React.useState<HTMLElement | null | undefined>();

  const observer = React.useMemo(
    () =>
      new ResizeObserver(([entry]) => {
        const [size] = entry.borderBoxSize;
        callback({ width: size.inlineSize, height: size.blockSize }, entry.contentRect);
      }),
    [callback],
  );

  useEffectSkipFirst(() => {
    if (!element) return () => null;
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [element]);

  return setElement;
}

const emptySizes: Sizes = { width: 0, height: 0 };

const emptyContentRect: DOMRectReadOnly = {
  height: 0,
  width: 0,
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  x: 0,
  y: 0,
  toJSON: () => "empty",
};

export function useMeasure() {
  const [measure, setMeasure] = React.useState<{ sizes: Sizes; contentRect: DOMRectReadOnly }>({
    sizes: emptySizes,
    contentRect: emptyContentRect,
  });
  const setElement = useMeasureCallback(
    React.useCallback((sizes, contentRect) => setMeasure({ sizes, contentRect }), []),
  );

  return [setElement, measure.sizes, measure.contentRect] as const;
}
