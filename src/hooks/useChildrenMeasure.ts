import React, { useEffect } from "react";
import { htmlCollectionToArray } from "@worksolutions/utils";

export function computeRelativeMeasures(childrenRects: DOMRect[], parentRect: DOMRect) {
  return childrenRects.map((childrenRect) => {
    const x = childrenRect.x - parentRect.x;
    const y = childrenRect.y - parentRect.y;

    return {
      toJSON: () => "",
      width: childrenRect.width,
      height: childrenRect.height,
      x,
      y,
      left: x,
      top: y,
      bottom: y + childrenRect.height,
      right: x + childrenRect.width,
    };
  });
}

export function useChildrenMeasure(useResizeObserver = false) {
  const elementRef = React.useRef<HTMLElement | null>(null);
  const resizeObserverRef = React.useRef<ResizeObserver>(null!);

  const [measures, setMeasures] = React.useState<DOMRect[] | null>(null);
  const [relativeMeasures, setRelativeMeasures] = React.useState<DOMRect[] | null>(null);

  const update = React.useCallback(() => {
    if (!elementRef.current) return;
    const childrenRects = htmlCollectionToArray(elementRef.current.children).map((element) =>
      element.getBoundingClientRect(),
    );

    const parentRect = elementRef.current.getBoundingClientRect();
    setMeasures(childrenRects);
    setRelativeMeasures(computeRelativeMeasures(childrenRects, parentRect));
  }, []);

  const initRef = React.useCallback(
    (element: HTMLElement | null) => {
      elementRef.current = element;
      if (!element) return;

      if (useResizeObserver) {
        resizeObserverRef.current = new ResizeObserver(update);
        return;
      }

      update();
    },
    [update, useResizeObserver],
  );

  useEffect(() => {
    return () => resizeObserverRef.current && resizeObserverRef.current.disconnect();
  });

  return { measures, relativeMeasures, initRef, update };
}
