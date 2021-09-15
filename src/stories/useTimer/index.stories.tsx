import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { useTimer } from "../../hooks";
import { rangeControl } from "../../utils/storyHelpers/controls";
import ForceUnmountingComponent from "../../utils/storyHelpers/ForceUnmountingComponent";

export type HookTimerInfoProps = {
  interval: number;
  initialValue: number;
  addedValue: number;
  finishValue: number;
};

const Demo = ({ addedValue, initialValue, interval, finishValue }: HookTimerInfoProps) => {
  const { value, start, stop } = useTimer({
    interval: interval,
    finisher: (value) => value >= finishValue,
    initialValue: () => initialValue,
    onSuccess: () => {},
    tickHandler: (value) => value + addedValue,
  });

  return (
    <div>
      <div>Count: {value}</div>
      <button onClick={() => start()}>start</button>
      <button onClick={stop}>stop</button>
    </div>
  );
};

export default {
  title: "Hooks/useTimer",
  component: Demo,
  argTypes: {
    interval: {
      name: "Интервал изменения счетчика",
      defaultValue: 1000,
      ...rangeControl(100, 10000, 50),
    },
    initialValue: {
      name: "Начальное значение",
      defaultValue: 0,
      ...rangeControl(0, 100, 1),
    },
    addedValue: {
      name: "Прибавляемое значение",
      defaultValue: 1,
      ...rangeControl(0, 10, 1),
    },
    finishValue: {
      name: "Значение, при достижении которого счетчик остановится",
      defaultValue: 10,
      ...rangeControl(10, 500, 1),
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

export const useTimerInfo = Template.bind({});
useTimerInfo.args = {};

useTimerInfo.storyName = "useTimer";
