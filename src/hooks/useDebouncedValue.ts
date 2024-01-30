import React, { useState } from "react";

import { useDebounceRef } from "./common";

export function useDebouncedValue<VALUE>(value: VALUE, debounceTime: number) {
  const [resultValue, setResultValue] = useState(value);
  const handleDebouncedChangeRef = useDebounceRef(debounceTime, setResultValue);
  React.useEffect(() => handleDebouncedChangeRef.current(value), [handleDebouncedChangeRef, value]);
  return resultValue;
}
