import React from "react";
import { isPureObject } from "@worksolutions/utils";

export function isReactElement(element: any): element is React.ReactNode {
  if (!isPureObject(element)) return true;

  return React.isValidElement(element);
}
