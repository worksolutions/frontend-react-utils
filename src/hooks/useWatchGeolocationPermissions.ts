import { useEffect, useRef, useState } from "react";

export type HookWatchGeolocationPermissionsParams = { ones?: boolean };
export type HookWatchGeolocationPermissionsReturnType = PermissionsState;

type PermissionsState = {
  granted: null | boolean;
  denied: null | boolean;
  prompt: null | boolean;
};

export function useWatchGeolocationPermissions({
  ones,
}: HookWatchGeolocationPermissionsParams = {}): PermissionsState & { receivedState: boolean } {
  const permissionStatusRef = useRef<PermissionStatus>();
  const [permissions, setPermissions] = useState<PermissionsState>({
    granted: null,
    denied: null,
    prompt: null,
  });

  const setPromptPermission = () => setPermissions({ granted: false, denied: false, prompt: true });
  const setGrantedPermission = () => setPermissions({ granted: true, denied: false, prompt: false });
  const setDeniedPermission = () => setPermissions({ granted: false, denied: true, prompt: false });

  function onChangeGeolocationPermission(this: PermissionStatus) {
    if (this.state === "prompt") setPromptPermission();
    if (this.state === "denied") setDeniedPermission();
    if (this.state === "granted") setGrantedPermission();
  }

  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then((permissionStatus) => {
      onChangeGeolocationPermission.call(permissionStatus);
      if (ones) return;

      permissionStatus.onchange = onChangeGeolocationPermission;
      permissionStatusRef.current = permissionStatus;
    });

    return () => {
      if (!permissionStatusRef.current) return;
      permissionStatusRef.current.onchange = null;
    };
  }, []);

  const isReceivedState = () =>
    permissions.denied !== null && permissions.granted !== null && permissions.prompt !== null;

  return { ...permissions, receivedState: isReceivedState() };
}
