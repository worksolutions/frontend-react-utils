import React, { useEffect, useState } from "react";
import { useWatchGeolocationPermissions } from "../hooks/useWatchGeolocationPermissions";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export type HookWatchGeolocationPermissionsInfoProps = {
  ones: boolean;
};

const Demo = ({ ones }: HookWatchGeolocationPermissionsInfoProps) => {
  const { denied, granted, prompt } = useWatchGeolocationPermissions({ ones });
  const [state, setState] = useState<GeolocationPosition | GeolocationPositionError>();

  useEffect(() => navigator.geolocation.getCurrentPosition(setState, setState), [denied, granted, granted]);

  return (
    <div>
      {denied && "Геолокация запрещена"}
      {granted && "Геолокация разрешена"}
      {prompt && "Ожидание пользователя"}
      {!prompt && (
        <div>
          {state instanceof GeolocationPosition && (
            <span>
              latitude: {state?.coords.latitude} longitude:{state?.coords.longitude}
            </span>
          )}
          {state instanceof GeolocationPositionError && <span>{state?.message}</span>}
        </div>
      )}
    </div>
  );
};

export default {
  title: "Hooks/useWatchGeolocationPermissions",
  component: Demo,
  argTypes: {
    ones: {
      name: "Сработает один раз при маунте компонента",
    },
  },
} as ComponentMeta<typeof Demo>;

const Template: ComponentStory<typeof Demo> = (props) => {
  return (
    <div>
      {props.ones ? <Demo {...props} /> : ""}
      {!props.ones ? <Demo {...props} /> : ""}
    </div>
  );
};

export const useWatchGeolocationPermissionsInfo = Template.bind({});
useWatchGeolocationPermissionsInfo.args = {
  ones: false,
};

useWatchGeolocationPermissionsInfo.storyName = "useWatchGeolocationPermissions";
