import React, { useState } from "react";

import { useDebounceRef } from "./common";

export function useDebouncedInput(
  value: string,
  debounceTime: number,
  onChange: (value: string) => void,
  clearValue = "",
) {
  const [inputValue, setInputValue] = useState(value);
  const onChangeDebounce = useDebounceRef(debounceTime, onChange);

  React.useEffect(() => setInputValue(value), [value]);

  const handleClear = React.useCallback(() => {
    setInputValue(clearValue);
    onChangeDebounce.current(clearValue);
  }, [clearValue, onChangeDebounce]);

  const handleChangeInput = React.useCallback(
    (value: string) => {
      setInputValue(value);
      onChangeDebounce.current(value);
    },
    [onChangeDebounce],
  );

  return { inputValue, clear: handleClear, onInputChange: handleChangeInput };
}
