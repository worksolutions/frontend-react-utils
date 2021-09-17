import React from "react";
import { htmlCollectionToArray } from "@worksolutions/utils";

export function useChildrenMeasure(useResizeObserver = false) {
  const [measures, setMeasures] = React.useState<DOMRect[] | null>(null);
  const [relativeMeasures, setRelativeMeasures] = React.useState<DOMRect[] | null>(null);
  const elementRef = React.useRef<HTMLElement | null>(null);

  const update = React.useCallback(() => {
    if (!elementRef.current) return;
    const childrenRects = htmlCollectionToArray(elementRef.current.children).map((element) =>
      element.getBoundingClientRect(),
    );
    const parentRect = elementRef.current.getBoundingClientRect();
    setMeasures(childrenRects);
    setRelativeMeasures(
      childrenRects.map((childrenRect) => {
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
      }),
    );
  }, []);

  const initRef = React.useCallback(
    (element: HTMLElement | null) => {
      elementRef.current = element;
      if (!element) return;

      if (useResizeObserver) {
        new ResizeObserver(update).observe(element);
        return;
      }

      update();
    },
    [update, useResizeObserver],
  );
  return { measures, relativeMeasures, initRef, update };
}
