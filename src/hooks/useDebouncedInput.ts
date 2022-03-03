import React, { useState } from "react";

import { useDebounce } from "./common";

export function useDebouncedInput<T>(
  value: string,
  debounceTime: number,
  onChange: (value: string, additionalData?: T) => void,
) {
  const [inputValue, setInputValue] = useState(value);
  const { run } = useDebounce(debounceTime, onChange);

  React.useEffect(() => setInputValue(value), [value]);

  const clear = React.useCallback(() => {
    setInputValue("");
    run("");
  }, [run]);

  const handleChangeInput = React.useCallback(
    (value: string, additionalData?: T) => {
      setInputValue(value);
      run(value, additionalData);
    },
    [run],
  );

  return { inputValue, clear, onInputChange: handleChangeInput };
}
