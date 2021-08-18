import React, { useEffect, useState } from "react";
import { useWatchGeolocationPermissions } from "../hooks/useWatchGeolocationPermissions";
import { ComponentMeta, ComponentStory } from "@storybook/react";

const Demo = () => {
  const { denied, granted, prompt } = useWatchGeolocationPermissions();
  const [state, setState] = useState<GeolocationPosition | GeolocationPositionError>();

  useEffect(() => navigator.geolocation.getCurrentPosition(setState, setState), [denied, granted, granted]);

  return (
    <div>
      {denied && "Геолокация запрещена"}
      <br />
      {granted && "Геолокация разрешена"}
      <br />
      {prompt && "Ожидание пользователя"}
      <br />
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
  argTypes: {},
} as ComponentMeta<typeof Demo>;

const Template: ComponentStory<typeof Demo> = () => <Demo />;

export const useWatchGeolocationPermissionsInfo = Template.bind({});
useWatchGeolocationPermissionsInfo.storyName = "useWatchGeolocationPermissions";
