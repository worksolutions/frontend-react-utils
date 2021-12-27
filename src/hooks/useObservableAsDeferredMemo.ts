import React, { DependencyList } from "react";
import { observe, toJS } from "mobx";

import { ObservableAsStateOptions } from "./useObservableAsState";

export function useObservableAsDeferredMemo<RESULT, TARGET>(
  callback: (target: TARGET) => RESULT,
  dependencies: DependencyList,
  target: TARGET,
  { fireImmediately, convertToJS }: ObservableAsStateOptions = {},
) {
  const memoCallback = React.useCallback(callback, dependencies);

  const [value, setValue] = React.useState(() => memoCallback(convertToJS ? toJS(target) : target));

  React.useEffect(
    () => observe(target, () => setValue(memoCallback(convertToJS ? toJS(target) : target)), fireImmediately),
    [memoCallback, fireImmediately, target],
  );

  return value;
}
