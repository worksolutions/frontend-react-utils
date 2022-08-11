import React, { DependencyList } from "react";
import { toJS } from "mobx";
import { isPureObject } from "@worksolutions/utils";

import { createObserverForStateHook, ObservableAsStateOptions } from "./useObservableAsSimpleValue";

export function useObservableAsDeferredMemo<RESULT, TARGET>(
  callback: (target: TARGET) => RESULT,
  dependencies: DependencyList,
  target: TARGET,
  { fireImmediately = true, convertToJS, deep }: ObservableAsStateOptions = {},
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoCallback = React.useCallback(callback, dependencies);

  const [value, setValue] = React.useState(() => memoCallback(convertToJS ? toJS(target) : target));

  React.useEffect(() => {
    const callback = () => setValue(memoCallback(convertToJS ? toJS(target) : target));

    if (fireImmediately && isPureObject(target)) {
      callback();
      return createObserverForStateHook(target, undefined, callback, { deep });
    }

    return createObserverForStateHook(target, undefined, callback, { deep, fireImmediately });
  }, [memoCallback, fireImmediately, target, convertToJS, deep]);

  return value;
}
