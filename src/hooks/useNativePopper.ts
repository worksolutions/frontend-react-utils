import { useEffect, useMemo, useState } from "react";
import {
  createPopper,
  Modifier,
  Placement,
  PositioningStrategy,
  State as PopperState,
  Instance as PopperInstance,
  Options as PopperOptions,
  createPopper as defaultCreatePopper,
} from "@popperjs/core";

type Options = { createPopper?: typeof defaultCreatePopper } & {
  placement?: Placement;
  modifiers?: Array<Partial<Modifier<any, any>>>;
  strategy?: PositioningStrategy;
  onFirstUpdate?: ((arg: Partial<PopperState>) => void) | undefined;
};

const EMPTY_MODIFIERS: PopperOptions["modifiers"] = [];

type UsePopperResult = {
  state: PopperState | null;
  update: PopperInstance["update"] | null;
  forceUpdate: PopperInstance["forceUpdate"] | null;
};

export function useNativePopper(
  reference: HTMLElement | null,
  tooltip: HTMLElement | null,
  options: Options,
): UsePopperResult {
  const optionsWithDefaults = {
    onFirstUpdate: options.onFirstUpdate,
    placement: options.placement || "bottom",
    strategy: options.strategy || "absolute",
    modifiers: options.modifiers || EMPTY_MODIFIERS,
  };

  const [popperInstance, setPopperInstance] = useState<PopperInstance>();

  const popperOptions = useMemo(() => {
    return {
      placement: optionsWithDefaults.placement,
      strategy: optionsWithDefaults.strategy,
      modifiers: [...optionsWithDefaults.modifiers],
    };
  }, [optionsWithDefaults.modifiers, optionsWithDefaults.placement, optionsWithDefaults.strategy]);

  useEffect(() => {
    if (!reference) return;
    if (!tooltip) return;

    const popper = createPopper(reference, tooltip, popperOptions);
    popper?.update();
    popper?.forceUpdate();
    setPopperInstance(popper);

    return () => {
      popper.destroy();
    };
  }, [reference, tooltip, popperOptions]);

  return {
    forceUpdate: popperInstance ? popperInstance.forceUpdate : null,
    update: popperInstance ? popperInstance.update : null,
    state: popperInstance ? popperInstance.state : null,
  };
}
