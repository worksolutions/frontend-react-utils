import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { Story } from "@storybook/react/types-6-0";

export const history = createMemoryHistory();

export function StorybookWrapper(Story: Story) {
  // @ts-ignore
  const element = Story({ history });

  return <Router history={history}>{element}</Router>;
}
