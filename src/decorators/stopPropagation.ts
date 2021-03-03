import { SyntheticEvent } from "react";
import { stopPropagation as jsStopPropagation } from "@worksolutions/utils";

export function stopPropagation<EVENT extends SyntheticEvent>(callback?: (event: EVENT) => void) {
  const stopPropagationHandler = jsStopPropagation(callback as any);
  return function (event: EVENT) {
    return stopPropagationHandler(event as any);
  };
}

export const stopPropagationHandler = stopPropagation();
