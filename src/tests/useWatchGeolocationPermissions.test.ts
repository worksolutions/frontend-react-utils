import { act } from "react-dom/test-utils";
import { renderHook } from "@testing-library/react-hooks";

import { useWatchGeolocationPermissions } from "../hooks";
import { PermissionMocker } from "./utils/PermissionMocker";

const { writeNavigator, fireOnchangePermission } = new PermissionMocker();

const setUp = (ones?: boolean) => renderHook(() => useWatchGeolocationPermissions({ ones }));

const grantedState = { granted: true, denied: false, prompt: false, receivedState: true };
const deniedState = { granted: false, denied: true, prompt: false, receivedState: true };
const promptState = { granted: false, denied: false, prompt: true, receivedState: true };

it("at mount, state should not be received", async () => {
  writeNavigator("granted");
  const { result } = setUp();
  await act(async () => expect(result.current.receivedState).toBe(false));
});

it("at update, state should  be received", async () => {
  writeNavigator("granted");
  const { result, rerender } = setUp();
  await act(async () => expect(result.current.receivedState).toBe(false));
  await act(async () => rerender());
  await act(async () => expect(result.current.receivedState).toBe(true));
});

it("should return prompt permission state", async () => {
  writeNavigator("prompt");
  const { result } = setUp();
  await act(async () => expect(result.current.receivedState).toBe(false));
  await act(async () => expect(result.current).toStrictEqual(promptState));
});

it("should return granted permission state", async () => {
  writeNavigator("granted");
  const { result } = setUp();
  await act(async () => expect(result.current.receivedState).toBe(false));
  await act(async () => expect(result.current).toStrictEqual(grantedState));
});

it("should return denied permission state", async () => {
  writeNavigator("denied");
  const { result } = setUp();
  await act(async () => expect(result.current.receivedState).toBe(false));
  await act(async () => expect(result.current).toStrictEqual(deniedState));
});

it("permission state should be changed ", async () => {
  writeNavigator("denied");
  const { result } = setUp();
  await act(async () => expect(result.current.receivedState).toBe(false));
  await act(async () => expect(result.current).toStrictEqual(deniedState));
  await act(async () => fireOnchangePermission("granted"));
  await act(async () => expect(result.current).toStrictEqual(grantedState));
  await act(async () => fireOnchangePermission("denied"));
  await act(async () => expect(result.current).toStrictEqual(deniedState));
  await act(async () => fireOnchangePermission("prompt"));
  await act(async () => expect(result.current).toStrictEqual(promptState));
});

it("permission onchange should executed ones times", async () => {
  writeNavigator("denied");
  const { result } = setUp(true);
  await act(async () => expect(result.current.receivedState).toBe(false));
  await act(async () => expect(result.current).toStrictEqual(deniedState));
  await act(async () => fireOnchangePermission("granted"));
  await act(async () => expect(result.current).toStrictEqual(deniedState));
});
