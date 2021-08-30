export function selectControl(options: any[]) {
  return { control: { type: "select", options: options } };
}

export function textControl() {
  return { control: { type: "text" } };
}

export function numbersControl(min: number, max: number, step: number) {
  return { control: { type: "number", mim: min, max: max, step: step } };
}

export function rangeControl(min: number, max: number, step: number) {
  return { control: { type: "range", mim: min, max: max, step: step } };
}

export function booleanControl() {
  return { control: { type: "boolean" } };
}
