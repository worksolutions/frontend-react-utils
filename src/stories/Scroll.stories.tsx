import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { times } from "ramda";
import { useVerticalScrollInfo } from "../hooks";

const Demo = () => {
  const [result, setResult] = useState({});
  const init = useVerticalScrollInfo(setResult);
  return (
    <div>
      <div
        ref={init}
        style={{
          overflowY: "scroll",
          height: "100px",
          border: "1px solid red",
        }}
      >
        {times(
          (i) => (
            <div>{i}</div>
          ),
          30,
        )}
      </div>
      <br />
      <br />
      <div>Result: {JSON.stringify(result)}</div>
    </div>
  );
};

export default {
  title: "Hooks/useVerticalScroll",
  component: Demo,
} as ComponentMeta<typeof Demo>;

const Template: ComponentStory<typeof Demo> = () => <Demo />;

export const UseVerticalScrollInfo = Template.bind({});
UseVerticalScrollInfo.storyName = "useVerticalScrollInfo";
