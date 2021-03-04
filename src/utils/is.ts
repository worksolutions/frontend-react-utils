import React from "react";
import { isPureObject } from "@worksolutions/utils";

export function isReactComponent<T>(element: React.ReactNode | React.FC<T>): element is React.FC<T> {
  return !(!isPureObject(element) || React.isValidElement(element));
}
