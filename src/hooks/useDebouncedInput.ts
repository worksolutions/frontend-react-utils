import React, { useState } from "react";

import { useDebounceRef } from "./common";

export function useDebouncedInput<VALUE>(
  value: VALUE,
  debounceTime: number,
  onChange: (value: VALUE) => void,
  clearValue?: VALUE,
) {
  const [inputValue, setInputValue] = useState(value);
  const onChangeDebounce = useDebounceRef(debounceTime, onChange);

  React.useEffect(() => setInputValue(value), [value]);

  const clear = React.useCallback(() => {
    if (!clearValue) return;
    setInputValue(clearValue);
    onChangeDebounce.current(clearValue);
  }, [clearValue, onChangeDebounce]);

  const handleChangeInput = React.useCallback(
    (value: VALUE) => {
      setInputValue(value);
      onChangeDebounce.current(value);
    },
    [onChangeDebounce],
  );

  return { inputValue, clear, onInputChange: handleChangeInput };
}
