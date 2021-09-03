import React from "react";
import { ComponentStory } from "@storybook/react";

import { useQueryParams } from "../../../hooks";
import ForceUnmountingComponent from "../../../utils/storyHelpers/ForceUnmountingComponent";
import { eventValue } from "../../../decorators/eventValue";

const Demo = () => {
  const [query, setQuery] = useQueryParams();
  const [param, setParam] = React.useState("value");

  return (
    <div>
      {Object.keys(query).length === 0 ? (
        <button onClick={() => setQuery({ param: "value" })}>add query param</button>
      ) : (
        <>
          <input type="text" value={param} onChange={eventValue(setParam)} />
          <button onClick={() => setQuery({ param })}>change value</button>
        </>
      )}
      <p>Query params: {JSON.stringify(query)}</p>
    </div>
  );
};

export default {
  title: "Hooks/useQueryParams",
  component: Demo,
};

const Template: ComponentStory<typeof Demo> = () => {
  return (
    <ForceUnmountingComponent>
      <Demo />
    </ForceUnmountingComponent>
  );
};

export const useQueryParamsInfo = Template.bind({});
useQueryParamsInfo.args = {};

useQueryParamsInfo.storyName = "useQueryParams";
