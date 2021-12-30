import React, { DependencyList } from "react";
import { observe, toJS } from "mobx";
import { isPureObject } from "@worksolutions/utils";

import { ObservableAsStateOptions } from "./useObservableAsState";

export function useObservableAsDeferredMemo<RESULT, TARGET>(
  callback: (target: TARGET) => RESULT,
  dependencies: DependencyList,
  target: TARGET,
  { fireImmediately = true, convertToJS }: ObservableAsStateOptions = {},
) {
  const memoCallback = React.useCallback(callback, dependencies);

  const [value, setValue] = React.useState(() => memoCallback(convertToJS ? toJS(target) : target));

  React.useEffect(() => {
    const callback = () => setValue(memoCallback(convertToJS ? toJS(target) : target));

    if (fireImmediately && isPureObject(target)) {
      callback();
      return observe(target, callback);
    }

    return observe(target, callback, fireImmediately);
  }, [memoCallback, fireImmediately, target]);

  return value;
}
