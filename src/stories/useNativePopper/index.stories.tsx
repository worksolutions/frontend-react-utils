import React, { useMemo, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Placement } from "@popperjs/core";

import { useNativePopper } from "../../hooks/useNativePopper";
import ForceUnmountingComponent from "../../utils/storyHelpers/ForceUnmountingComponent";
import { booleanControl, numbersControl, selectControl } from "../../utils/storyHelpers/controls";

import "./style.css";

export type Props = {
  placement: Placement;
  flip: boolean;
  offset: number;
};

const Demo = ({ placement, flip, offset }: Props) => {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);

  const modifiers = useMemo(
    () => [
      {
        name: "computeStyles",
        options: {
          adaptive: false,
        },
      },
      {
        name: "flip",
        enabled: flip,
      },
      {
        name: "hide",
        enabled: false,
      },
      {
        name: "offset",
        options: {
          offset: [0, offset],
        },
      },
      {
        name: "arrow",
        enabled: arrowElement != null,
        options: { element: arrowElement },
      },
    ],
    [arrowElement],
  );

  const { state } = useNativePopper(referenceElement, popperElement, {
    placement,
    modifiers,
  });

  return (
    <div style={{ width: "100%", height: "200vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <button type="button" ref={setReferenceElement}>
        Reference element
      </button>

      <div
        className="tooltip"
        ref={setPopperElement}
        style={
          {
            background: "#333",
            color: "white",
            padding: "50px",
            fontSize: "13px",
            borderRadius: "4px",
            ...state?.styles?.popper,
          } as any
        }
        {...state?.attributes?.popper}
      >
        Popper element
        <div className="arrow" ref={setArrowElement} style={{ backgroundColor: "#aaa", width: 20, height: 20 }} />
      </div>
    </div>
  );
};

export default {
  title: "Hooks/useNativePopper",
  component: Demo,
  argTypes: {
    placement: {
      name: "Положение тултипа",
      defaultValue: "bottom",
      ...selectControl([
        "top-start",
        "top-end",
        "bottom-start",
        "bottom-end",
        "right-start",
        "right-end",
        "left-start",
        "left-end",
        "auto",
        "auto-start",
        "auto-end",
        "top",
        "bottom",
        "right",
        "left",
      ]),
    },
    flip: {
      name: "Будет ли поппер изменять свое положение сам",
      defaultValue: true,
      ...booleanControl(),
    },
    offset: {
      name: "Отступ от reference елемента",
      defaultValue: 8,
      ...numbersControl(0, 100, 1),
    },
  },
  parameters: {
    componentSource: {
      code: `
        useNativePopper(reference: HTMLElement | null, tooltip: HTMLElement | null, options: Options): {
          state: PopperState | null;
          forceUpdate: () => void;
          update: () => Promise<Partial<State>>;
        }`,
      language: "typescript",
    },
  },
} as ComponentMeta<typeof Demo>;

const Template: ComponentStory<typeof Demo> = (props) => {
  return (
    <ForceUnmountingComponent>
      <Demo {...props} />
    </ForceUnmountingComponent>
  );
};

export const useNativePopperInfo = Template.bind({});
useNativePopperInfo.args = {};

useNativePopperInfo.storyName = "useNativePopper";
