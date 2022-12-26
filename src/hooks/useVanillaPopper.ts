import { useEffect, useMemo, useState } from "react";
import {
  createPopper,
  Instance as PopperInstance,
  Options as PopperOptions,
  Placement,
  PositioningStrategy,
  State as PopperState,
} from "@popperjs/core";

export type VanillaPopperOptions = { createPopper?: typeof createPopper } & {
  placement?: Placement;
  modifiers?: PopperOptions["modifiers"];
  strategy?: PositioningStrategy;
  onFirstUpdate?: ((state: Partial<PopperState>) => void) | undefined;
};

const EMPTY_MODIFIERS: PopperOptions["modifiers"] = [];

export function useVanillaPopper(
  reference: HTMLElement | null,
  popupElement: HTMLElement | null,
  options: VanillaPopperOptions,
) {
  const [popperInstance, setPopperInstance] = useState<PopperInstance>();

  const popperOptions = useMemo(() => {
    return {
      onFirstUpdate: options.onFirstUpdate,
      placement: options.placement || "bottom",
      strategy: options.strategy || "absolute",
      modifiers: options.modifiers || EMPTY_MODIFIERS,
    };
  }, [options.modifiers, options.placement, options.strategy, options.onFirstUpdate]);

  useEffect(() => {
    if (!reference) return;
    if (!popupElement) return;

    const popper = createPopper(reference, popupElement, popperOptions);
    setPopperInstance(popper);

    return () => popper.destroy();
  }, [reference, popupElement, popperOptions]);

  return popperInstance;
}
