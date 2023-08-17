import React, { DependencyList } from "react";
import {observe, toJS} from "mobx";
import { isPureObject } from "@worksolutions/utils";

import {deepObserve} from "mobx-utils";

export type UseObservableAsDeferredMemoOptions = { fireImmediately?: boolean; convertToJS?: boolean; deep?: boolean };

export function useObservableAsDeferredMemo<RESULT, TARGET>(
  callback: (target: TARGET) => RESULT,
  dependencies: DependencyList,
  target: TARGET,
  { fireImmediately = true, convertToJS, deep }: UseObservableAsDeferredMemoOptions = {},
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoCallback = React.useCallback(callback, dependencies);

  const [value, setValue] = React.useState(() => memoCallback(convertToJS ? toJS(target) : target));

  React.useEffect(() => {
    const callback = () => setValue(() => memoCallback(convertToJS ? toJS(target) : target));

    if (fireImmediately && isPureObject(target)) {
      callback();
      return createObserverForStateHook(target, undefined, callback, { deep });
    }

    return createObserverForStateHook(target, undefined, callback, { deep, fireImmediately });
  }, [memoCallback, fireImmediately, target, convertToJS, deep]);

  return value;
}


export function createObserverForStateHook(
  target: any,
  key: any,
  callback: () => void,
  { fireImmediately, deep }: { fireImmediately?: boolean; deep?: boolean },
) {
  if (key === undefined) {
    if (deep) {
      if (fireImmediately) callback();
      return deepObserve(target, callback);
    }
    return observe(target, callback, fireImmediately);
  }

  if (deep) {
    if (fireImmediately) callback();
    return deepObserve(target[key], callback);
  }

  return observe(target, key, callback, fireImmediately);
}
