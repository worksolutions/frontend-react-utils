import { SyntheticEvent } from "react";
import { eventValue as jsEventValue } from "@worksolutions/utils";

export function eventValue<EVENT extends SyntheticEvent>(callback: (targetValue: string) => void) {
  const eventValueHandler = jsEventValue(callback as any);
  return function (event: EVENT) {
    return eventValueHandler(event as any);
  };
}
