import React from "react";
import debounce from "lodash.debounce";
import throttle from "lodash.throttle";

import { useSyncToRef } from "./useSyncToRef";

interface UseInfiniteScrollConfig {
  loading: boolean;
  hasNextPage: boolean;
  threshold?: number;
  scrollCheckInterval?: number;
  onLoadMore: () => void;
}

type ScrollableElement = HTMLElement | Window | null | undefined;

function isWindow(element: HTMLElement | Window): element is Window {
  return element === window;
}

function getScrollToBottomSize(element: HTMLElement | Window) {
  if (isWindow(element)) return document.documentElement.scrollHeight - element.scrollY - element.innerHeight;
  return element.scrollHeight - element.scrollTop - element.offsetHeight;
}

export function useInfiniteScroll({
  scrollCheckInterval = 200,
  threshold = 200,
  loading,
  hasNextPage,
  onLoadMore,
}: UseInfiniteScrollConfig) {
  const [scrollableElement, setScrollableElement] = React.useState<ScrollableElement>();
  const loadingRef = useSyncToRef(loading);
  const hasNextPageRef = useSyncToRef(hasNextPage);
  const onLoadMoreRef = useSyncToRef(onLoadMore);
  const previousHeightRef = useSyncToRef<number | null>(null);

  React.useEffect(() => {
    if (!scrollableElement) return () => null;

    const listener = throttle(function () {
      if (!hasNextPageRef.current || loadingRef.current) return;
      const scrollToBottom = getScrollToBottomSize(scrollableElement);
      if (scrollToBottom > threshold) return;
      onLoadMoreRef.current();
    }, scrollCheckInterval);

    scrollableElement.addEventListener("scroll", listener);
    return () => scrollableElement.removeEventListener("scroll", listener);
  }, [hasNextPageRef, loadingRef, onLoadMoreRef, scrollCheckInterval, scrollableElement, threshold]);

  React.useEffect(() => {
    if (!scrollableElement) return () => null;
    if (isWindow(scrollableElement)) return;

    const resizeObserver = new ResizeObserver(
      debounce(([entry]) => {
        if (!entry) return;

        const newHeight = Math.round(entry.contentRect.height);

        if (previousHeightRef.current === newHeight) return;
        if (!hasNextPageRef.current || loadingRef.current) return;
        if (scrollableElement.clientHeight !== scrollableElement.scrollHeight) return;

        onLoadMoreRef.current();
        previousHeightRef.current = newHeight;
      }, scrollCheckInterval),
    );

    resizeObserver.observe(scrollableElement);
    return () => resizeObserver.disconnect();
  }, [scrollableElement, previousHeightRef, hasNextPageRef, loadingRef, scrollCheckInterval, onLoadMoreRef]);

  return setScrollableElement;
}
