import React, { useMemo, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Placement } from "@popperjs/core";

import { useNativePopper } from "../../hooks/useNativePopper";
import ForceUnmountingComponent from "../../utils/storyHelpers/ForceUnmountingComponent";
import { selectControl } from "../../utils/storyHelpers/controls";

import "./style.css";

export type Props = {
  placement: Placement;
};

const Demo = ({ placement }: Props) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);

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
        enabled: true,
      },
      {
        name: "hide",
        enabled: false,
      },
      {
        name: "offset",
        options: {
          offset: [0, 8],
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
    strategy: "absolute",
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
        style={{
          ...{
            background: "#333",
            color: "white",
            fontWeight: "bold",
            padding: "50px",
            fontSize: "13px",
            borderRadius: "4px",
          },
          ...state?.styles?.popper,
        }}
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
