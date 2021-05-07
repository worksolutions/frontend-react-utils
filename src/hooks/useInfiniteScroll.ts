import React from "react";
import { throttle, debounce } from "lodash";

import { useSyncToRef } from "./useSyncToRef";

interface UseInfiniteScrollConfig {
  loading: boolean;
  hasNextPage: boolean;
  threshold?: number;
  scrollCheckInterval?: number;
  onLoadMore: () => void;
}

type ScrollableElement = HTMLElement | null | undefined;

function getScrollToBottomSize(element: HTMLElement) {
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
  const previousHeight = useSyncToRef<number | null>(null);

  React.useEffect(() => {
    if (!scrollableElement) return () => null;

    const listener = throttle(function () {
      if (!hasNextPageRef.current || loadingRef.current) return;
      const scrollToBottom = getScrollToBottomSize(scrollableElement);
      if (scrollToBottom > threshold) return;
      onLoadMoreRef.current();
    }, scrollCheckInterval);

    scrollableElement.addEventListener("scroll", listener);
    return () => {
      scrollableElement.removeEventListener("scroll", listener);
    };
  }, [hasNextPageRef, loadingRef, onLoadMoreRef, scrollCheckInterval, scrollableElement, threshold]);

  React.useEffect(() => {
    if (!scrollableElement) return () => null;

    const resizeObserver = new ResizeObserver(
      debounce((entries: ResizeObserverEntry[]) => {
        if (!Array.isArray(entries)) return;
        if (entries.length === 0) return;

        const entry = entries[0];
        const newHeight = Math.round(entry.contentRect.height);

        if (previousHeight.current === newHeight) return;
        if (!hasNextPageRef.current && loadingRef.current) return;
        if (scrollableElement.clientHeight !== scrollableElement.scrollHeight) return;

        onLoadMoreRef.current();
        previousHeight.current = newHeight;
      }, scrollCheckInterval),
    );

    resizeObserver.observe(scrollableElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [scrollableElement, previousHeight, hasNextPageRef, loadingRef, scrollCheckInterval, onLoadMoreRef]);

  return setScrollableElement;
}
