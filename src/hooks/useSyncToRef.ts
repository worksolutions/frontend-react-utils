import React from "react";

export function useSyncToRef<T>(data: T) {
  const ref = React.useRef(data);
  React.useMemo(() => {
    ref.current = data;
  }, [data]);
  return ref;
}
