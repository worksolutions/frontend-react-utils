import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import ForceUnmountingComponent from "../../utils/storyHelpers/ForceUnmountingComponent";
import DebugComponent from "../../utils/storyHelpers/DebugComponent";
import { booleanControl } from "../../utils/storyHelpers/controls";

import { useChildrenMeasure } from "../../hooks";

const defaultElements = () => new Array(5).fill(null);

const Demo = (props: { useResizeObserver: boolean }) => {
  const { update, initRef, measures } = useChildrenMeasure(props.useResizeObserver);

  return (
    <div>
      <div ref={initRef}>
        {defaultElements().map((_, index) => (
          <div>item {index}</div>
        ))}
      </div>
      <DebugComponent data={measures} />
      <div onClick={update} style={{ marginTop: 20, cursor: "pointer", fontWeight: 700 }}>
        Update widths
      </div>
    </div>
  );
};

const Template: ComponentStory<typeof Demo> = (props) => {
  return (
    <ForceUnmountingComponent>
      <Demo {...props} />
    </ForceUnmountingComponent>
  );
};

export default {
  title: "Hooks/useChildrenWidthDetector",
  component: Demo,
  argTypes: {
    useResizeObserver: {
      name: "Использовать ResizeObserver",
      defaultValue: true,
      ...booleanControl(),
    },
  },
  parameters: {
    componentSource: {
      code: `
      useChildrenWidthDetector(useResizeObserver?: boolean): { 
        widths: number[] | null,
        initRef: (element: (HTMLElement | null)) => void,
        update: () => void
      }`,
      language: "typescript",
    },
  },
} as ComponentMeta<typeof Demo>;

export const useChildrenWidthDetectorInfo = Template.bind({});
useChildrenWidthDetectorInfo.args = {};

useChildrenWidthDetectorInfo.storyName = "useChildrenWidthDetector";
