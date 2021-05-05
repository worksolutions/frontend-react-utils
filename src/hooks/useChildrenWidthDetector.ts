import React from "react";
import { htmlCollectionToArray } from "@worksolutions/utils";

export function useChildrenWidthDetector(useResizeObserver = false) {
  const [widths, setWidths] = React.useState<number[] | null>(null);
  const elementRef = React.useRef<HTMLElement | null>(null);

  const update = React.useCallback(() => {
    if (!elementRef.current) return;
    const childrenArray = htmlCollectionToArray(elementRef.current.children);
    setWidths(childrenArray.map((element) => element.getBoundingClientRect().width));
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
  return { widths, initRef, update };
}
