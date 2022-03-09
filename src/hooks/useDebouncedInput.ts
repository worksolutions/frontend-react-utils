import React, { useState } from "react";

import { useDebounceRef } from "./common";

export function useDebouncedInput<T>(
  value: string,
  debounceTime: number,
  onChange: (value: string, additionalData?: T) => void,
) {
  const [inputValue, setInputValue] = useState(value);
  const onChangeDebounce = useDebounceRef(debounceTime, onChange);

  React.useEffect(() => setInputValue(value), [value]);

  const clear = React.useCallback(() => {
    setInputValue("");
    onChangeDebounce.current("");
  }, [onChangeDebounce]);

  const handleChangeInput = React.useCallback(
    (value: string, additionalData?: T) => {
      setInputValue(value);
      onChangeDebounce.current(value, additionalData);
    },
    [onChangeDebounce],
  );

  return { inputValue, clear, onInputChange: handleChangeInput };
}
