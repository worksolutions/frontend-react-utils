import React, { DependencyList } from "react";
import { observe } from "mobx";

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
        setValue(target[key]);
      },
      invokeImmediately,
    );
    return () => {
      mounted = false;
      unmount();
    };
  }, [invokeImmediately, key, target]);

  return value;
}

export function useObservableAsDeferredMemo<RESULT, TARGET>(
  callback: (target: TARGET) => RESULT,
  dependencies: DependencyList,
  target: TARGET,
  invokeImmediately?: boolean,
) {
  const memoCallback = React.useCallback(callback, dependencies);

  const [value, setValue] = React.useState(() => memoCallback(target));

  React.useEffect(
    () => observe(target, () => setValue(memoCallback(target)), invokeImmediately),
    [memoCallback, invokeImmediately, target],
  );

  return value;
}
