import React from "react";
import { htmlCollectionToArray } from "@worksolutions/utils";

export function useChildrenMeasure(useResizeObserver = false) {
  const [measures, setMeasures] = React.useState<DOMRect[] | null>(null);
  const elementRef = React.useRef<HTMLElement | null>(null);

  const update = React.useCallback(() => {
    if (!elementRef.current) return;
    const childrenArray = htmlCollectionToArray(elementRef.current.children);
    setMeasures(childrenArray.map((element) => element.getBoundingClientRect()));
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
    [useResizeObserver],
  );
  return { measures, initRef, update };
}
