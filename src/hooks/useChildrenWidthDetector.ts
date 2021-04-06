import React from "react";
import { htmlCollectionToArray } from "@worksolutions/utils";

export function useChildrenWidthDetector(useResizeObserver = false) {
  const [widths, setWidths] = React.useState<number[] | null>(null);
  const initRef = React.useCallback(
    (element: HTMLElement | null) => {
      if (!element) return;
      const update = () =>
        setWidths(htmlCollectionToArray(element.children).map((element) => element.getBoundingClientRect().width));

      if (useResizeObserver) {
        new ResizeObserver(update).observe(element);
        return;
      }

      update();
    },
    [useResizeObserver],
  );
  return { widths, initRef };
}
