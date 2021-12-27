import React, { DependencyList } from "react";
import { observe, toJS } from "mobx";

type ObservableOptions = { fireImmediately?: boolean; convertToJS?: boolean };

export function useObservableAsState<T extends Record<string, any>, K extends keyof T>(
  target: T,
  key: K,
  { fireImmediately, convertToJS }: ObservableOptions = {},
): T[K] {
  const [value, setValue] = React.useState(() => target[key]);

  React.useEffect(() => {
    let mounted = true;
    const unmount = observe(
      target,
      key,
      () => {
        if (!mounted) return;
        const value = target[key];
        setValue(convertToJS ? toJS(value) : value);
      },
      fireImmediately,
    );
    return () => {
      mounted = false;
      unmount();
    };
  }, [fireImmediately, key, target]);

  return value;
}

export function useObservableAsDeferredMemo<RESULT, TARGET>(
  callback: (target: TARGET) => RESULT,
  dependencies: DependencyList,
  target: TARGET,
  { fireImmediately, convertToJS }: ObservableOptions = {},
) {
  const memoCallback = React.useCallback(callback, dependencies);

  const [value, setValue] = React.useState(() => memoCallback(target));

  React.useEffect(
    () => observe(target, () => setValue(memoCallback(convertToJS ? toJS(target) : target)), fireImmediately),
    [memoCallback, fireImmediately, target],
  );

  return value;
}
