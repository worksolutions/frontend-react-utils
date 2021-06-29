import React from "react";

import { useEffectSkipFirst } from "./common";

export function useMeasureCallback(callback: (clientRect: DOMRectReadOnly, contentRect: DOMRectReadOnly) => void) {
  const [element, setElement] = React.useState<HTMLElement | null | undefined>();

  const observer = React.useMemo(
    () => new ResizeObserver(([entry]) => callback(entry.target.getBoundingClientRect(), entry.contentRect)),
    [callback],
  );

  useEffectSkipFirst(() => {
    if (!element) return () => null;
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [element]);

  return [setElement, element] as const;
}

const emptyClientRect: DOMRectReadOnly = {
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
  const [measure, setMeasure] = React.useState<{ clientRect: DOMRectReadOnly; contentRect: DOMRectReadOnly }>({
    clientRect: emptyClientRect,
    contentRect: emptyClientRect,
  });
  const [setElement, element] = useMeasureCallback(
    React.useCallback((clientRect, contentRect) => setMeasure({ clientRect, contentRect }), []),
  );

  return [setElement, measure.clientRect, measure.contentRect, element] as const;
}
