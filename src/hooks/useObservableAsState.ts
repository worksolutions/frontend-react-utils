import React from "react";
import { observe, toJS } from "mobx";

export function useObservableAsState<T extends Record<string, any>, K extends keyof T>(
  target: T,
  key: K,
  invokeImmediately?: boolean,
): T[K] {
  const [value, setValue] = React.useState(() => target[key]);

  React.useEffect(() => {
    let mounted = true;
    const unmount = observe(
      target,
      key,
      () => {
        if (!mounted) return;
        setValue(toJS(target[key]));
      },
      invokeImmediately,
    );
    return () => {
      mounted = false;
      unmount();
    };
  }, [key, target]);

  return value;
}
