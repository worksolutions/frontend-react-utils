export type COLOR_NAME_TYPE = string | number | symbol;

export type Theme<COLOR_NAME extends COLOR_NAME_TYPE> = {
  colors: Record<COLOR_NAME, string>;
  overrides: Record<string, any>;
};

export type StyledComponentsPropsWithTheme<COLOR_NAME extends COLOR_NAME_TYPE> = { theme: Theme<COLOR_NAME> };

export type IncomeColorVariant<COLOR_NAME extends COLOR_NAME_TYPE> =
  | COLOR_NAME
  | ((props: StyledComponentsPropsWithTheme<COLOR_NAME>) => COLOR_NAME);

export type GetColorType<COLOR_NAME extends COLOR_NAME_TYPE> = (
  colorName: IncomeColorVariant<COLOR_NAME>,
) => (props: StyledComponentsPropsWithTheme<COLOR_NAME>) => string;
