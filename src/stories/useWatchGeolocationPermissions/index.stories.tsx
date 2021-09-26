import React, { useEffect, useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { useWatchGeolocationPermissions } from "../../hooks";
import ForceUnmountingComponent from "../../utils/storyHelpers/ForceUnmountingComponent";

export type HookWatchGeolocationPermissionsInfoProps = {
  ones: boolean;
};

const Demo = ({ ones }: HookWatchGeolocationPermissionsInfoProps) => {
  const { denied, granted, prompt, receivedState } = useWatchGeolocationPermissions({ ones });
  const [state, setState] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);

  useEffect(
    () =>
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState(position);
          setError(null);
        },
        (error) => {
          setError(error);
          setState(null);
        },
      ),
    [denied, granted, prompt, receivedState],
  );

  return (
    <div>
      {denied && "Геолокация запрещена"}
      {granted && "Геолокация разрешена"}
      {prompt && "Ожидание пользователя"}
      {!prompt && (
        <div>
          {state && (
            <span>
              latitude: {state?.coords.latitude} longitude:{state?.coords.longitude}
            </span>
          )}
          {error && <span>{error?.message}</span>}
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
      name: "Изменение разрешения геолокации произойдет один раз при маунте компонента",
    },
  },
  parameters: {
    componentSource: {
      code: `
      useWatchGeolocationPermissions({ ones }?: { ones?: boolean }):  {
        granted: null | boolean; 
        denied: null | boolean;
        prompt: null | boolean;
        receivedState: null | boolean 
      }
      `,
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

export const useWatchGeolocationPermissionsInfo = Template.bind({});
useWatchGeolocationPermissionsInfo.args = {
  ones: false,
};

useWatchGeolocationPermissionsInfo.storyName = "useWatchGeolocationPermissions";
