import { SyntheticEvent } from "react";
import { preventDefault as jsPreventDefault } from "@worksolutions/utils";

import { stopPropagation } from "./stopPropagation";

export function preventDefault<EVENT extends SyntheticEvent>(callback?: (event: EVENT) => void) {
  const preventDefaultHandler = jsPreventDefault(callback as any);
  return function (event: EVENT) {
    return preventDefaultHandler(event as any);
  };
}

export const preventDefaultHandler = preventDefault();

export const preventDefaultAndStopPropagationHandler = stopPropagation(preventDefaultHandler);
