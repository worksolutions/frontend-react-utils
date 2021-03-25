import React from "react";

import { useEffectSkipFirst } from "./common";

export function useSyncToRef<T>(data: T) {
  const ref = React.useRef(data);
  useEffectSkipFirst(() => {
    ref.current = data;
  }, [data]);
  return ref;
}
