import { StorybookWrapper } from "../src/storybook/StorybookWrapper";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [StorybookWrapper];
