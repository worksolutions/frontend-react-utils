import { useLayoutEffect, useMemo, useState } from "react";
import {
  createPopper,
  Instance as PopperInstance,
  Modifier,
  Options as PopperOptions,
  Placement,
  PositioningStrategy,
  State as PopperState,
} from "@popperjs/core";

type Options = { createPopper?: typeof createPopper } & {
  placement?: Placement;
  modifiers?: Partial<Modifier<any, any>>[];
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
  const [popperInstance, setPopperInstance] = useState<PopperInstance>();

  const popperOptions = useMemo(() => {
    return {
      onFirstUpdate: options.onFirstUpdate,
      placement: options.placement || "bottom",
      strategy: options.strategy || "absolute",
      modifiers: options.modifiers || EMPTY_MODIFIERS,
    };
  }, [options.modifiers, options.placement, options.strategy, options.onFirstUpdate]);

  useLayoutEffect(() => {
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
