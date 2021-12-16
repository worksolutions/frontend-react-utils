import React from "react";
import { htmlCollectionToArray } from "@worksolutions/utils";

export function useChildrenMeasure(useResizeObserver = false) {
  const [measures, setMeasures] = React.useState<DOMRect[] | null>(null);
  const [relativeMeasures, setRelativeMeasures] = React.useState<DOMRect[] | null>(null);
  const elementRef = React.useRef<HTMLElement | null>(null);

  const update = React.useCallback((filter?: (element: HTMLElement, index: number) => any) => {
    if (!elementRef.current) return;
    const children = htmlCollectionToArray(elementRef.current.children);
    const filteredChildren = filter ? children.filter(filter) : children;
    const childrenRects = filteredChildren.map((element) => element.getBoundingClientRect());

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
    (element: HTMLElement | null, filter?: (element: HTMLElement, index: number) => any) => {
      elementRef.current = element;
      if (!element) return;

      if (useResizeObserver) {
        new ResizeObserver(() => update(filter)).observe(element);
        return;
      }

      update(filter);
    },
    [update, useResizeObserver],
  );
  return { measures, relativeMeasures, initRef, update };
}
