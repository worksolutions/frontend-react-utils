import React from "react";
import { htmlCollectionToArray } from "@worksolutions/utils";

export function useChildrenWidthDetector() {
  const [widths, setWidths] = React.useState<number[] | null>(null);
  const initRef = React.useCallback((element: HTMLElement | null) => {
    if (!element) return;
    setWidths(htmlCollectionToArray(element.children).map((element) => element.getBoundingClientRect().width));
  }, []);
  return { widths, initRef };
}
