import React from "react";

import { useEffectSkipFirst } from "./common";

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

export function useMeasureCallback(callback: (clientRect: DOMRectReadOnly, contentRect: DOMRectReadOnly) => void) {
  const [element, setElement] = React.useState<HTMLElement | null | undefined>();

  useEffectSkipFirst(() => {
    if (!element) {
      callback(emptyClientRect, emptyClientRect);
      return () => null;
    }
    const observer = new ResizeObserver(([entry]) => callback(entry.target.getBoundingClientRect(), entry.contentRect));
    observer.observe(element);
    return () => observer.disconnect();
  }, [element, callback]);

  return [setElement, element] as const;
}

interface Measure {
  clientRect: DOMRectReadOnly;
  contentRect: DOMRectReadOnly;
}

export function useMeasure() {
  const [measure, setMeasure] = React.useState<Measure>({ clientRect: emptyClientRect, contentRect: emptyClientRect });
  const [setElement, element] = useMeasureCallback(
    React.useCallback((clientRect, contentRect) => setMeasure({ clientRect, contentRect }), []),
  );

  return [setElement, measure.clientRect, measure.contentRect, element] as const;
}
