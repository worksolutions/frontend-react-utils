import React from "react";
import throttle from "lodash/throttle";

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

  return setScrollableElement;
}
