import { useWatchGeolocationPermissions } from "../hooks";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";

const mockPermission = (state: PermissionState, setOnChange: any) => {
  const query = { state, onchangeValue: null };

  Object.defineProperty(query, "onchange", {
    set(value) {
      this.onchangeValue = value;
      setOnChange && setOnChange(value);
    },
    get() {
      return this.onchangeValue;
    },
  });
  return {
    query: jest.fn(() => Promise.resolve(query)),
  };
};

let onchange: any = null;
const setOnChange = (onchangeValue: any) => {
  onchange = onchangeValue;
};

const granted = mockPermission("granted", setOnChange);
const denied = mockPermission("denied", setOnChange);
const prompt = mockPermission("prompt", setOnChange);

const setUp = (ones?: boolean) => renderHook(() => useWatchGeolocationPermissions({ ones }));

const grantedState = { granted: true, denied: false, prompt: false, receivedState: true };
const deniedState = { granted: false, denied: true, prompt: false, receivedState: true };
const promptState = { granted: false, denied: false, prompt: true, receivedState: true };
const writeNavigator = (value: any) =>
  Object.defineProperty(navigator, "permissions", { value, writable: true, configurable: true });

it("at mount, state should not be received", async () => {
  writeNavigator(granted);
  const { result } = setUp();
  await act(async () => expect(result.current.receivedState).toBe(false));
});

it("at update, state should  be received", async () => {
  writeNavigator(granted);
  const { result, rerender } = setUp();
  await act(async () => expect(result.current.receivedState).toBe(false));
  rerender();
  await act(async () => expect(result.current.receivedState).toBe(true));
});

it("should return prompt permission state", async () => {
  writeNavigator(prompt);
  const { result } = setUp();
  await act(async () => expect(result.current.receivedState).toBe(false));
  await act(async () => expect(result.current).toStrictEqual(promptState));
});

it("should return granted permission state", async () => {
  writeNavigator(granted);
  const { result } = setUp();
  await act(async () => expect(result.current.receivedState).toBe(false));
  await act(async () => expect(result.current).toStrictEqual(grantedState));
});

it("should return denied permission state", async () => {
  writeNavigator(denied);
  const { result } = setUp();
  await act(async () => expect(result.current.receivedState).toBe(false));
  await act(async () => expect(result.current).toStrictEqual(deniedState));
});

it("permission state should be changed ", async () => {
  writeNavigator(denied);
  const { result } = setUp();
  await act(async () => expect(result.current.receivedState).toBe(false));
  await act(async () => expect(result.current).toStrictEqual(deniedState));
  act(() => onchange.call({ state: "granted" }));
  await act(async () => expect(result.current).toStrictEqual(grantedState));
});

// it("hook should executed ones times", async () => {
//   writeNavigator(denied);
//   const { result } = setUp(true);
//   await act(async () => expect(result.current.receivedState).toBe(false));
//   await act(async () => expect(result.current).toStrictEqual(deniedState));
//   act(() => onchange.call({ state: "granted" }));
//   await act(async () => expect(result.current).toStrictEqual(deniedState));
// });
