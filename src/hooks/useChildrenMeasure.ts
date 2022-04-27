import React from "react";
import { htmlCollectionToArray } from "@worksolutions/utils";

import { useDebounceRef } from "./common";

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

  const debouncedUpdate = useDebounceRef(20, update);

  const resizeObserver = React.useRef<ResizeObserver | null>(null);
  React.useEffect(() => () => resizeObserver.current?.disconnect(), []);
  const mutationObserver = React.useRef<MutationObserver | null>(null);
  React.useEffect(() => () => mutationObserver.current?.disconnect(), []);

  const initRef = React.useCallback(
    (element: HTMLElement | null, filter?: (element: HTMLElement, index: number) => any) => {
      elementRef.current = element;
      if (!element) return;

      if (useResizeObserver) {
        resizeObserver.current = new ResizeObserver(() => debouncedUpdate.current(filter));
        resizeObserver.current.observe(element);
        mutationObserver.current = new MutationObserver(() => debouncedUpdate.current(filter));
        mutationObserver.current.observe(element, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["class"],
        });
        return;
      }

      debouncedUpdate.current(filter);
    },
    [debouncedUpdate, useResizeObserver],
  );

  return { measures, relativeMeasures, initRef, update };
}
