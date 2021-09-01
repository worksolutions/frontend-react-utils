import { act } from "react-dom/test-utils";
import { renderHook } from "@testing-library/react-hooks";

import { useTimer } from "../hooks";

jest.useFakeTimers();

const initialValue = 0;

const increment = (value: number) => value + 1;
const wait = (time: number) =>
  act(() => {
    jest.advanceTimersByTime(time);
  });

type setupHook = {
  onSuccess?: () => void;
  finisher?: (value: number) => boolean;
  tickHandler?: (value: number) => number;
};

const startUp = (params: setupHook = {} as any) =>
  renderHook(() =>
    useTimer({
      interval: 100,
      initialValue: () => initialValue,
      onSuccess: params.onSuccess,
      tickHandler: params.tickHandler || increment,
      finisher: params.finisher,
    }),
  );

it("useTimer should start with initialValue", () => {
  const { result } = startUp();
  expect(result.current.value).toBe(initialValue);
});

it("useTimer should be started", () => {
  const { result } = startUp();

  act(() => result.current.start());
  wait(500);
  expect(result.current.value).toBe(initialValue + 5);
  act(() => result.current.stop());
});

it("useTimer should be stopped", () => {
  const { result } = startUp();

  act(() => result.current.start());
  wait(500);
  act(() => result.current.stop());
  wait(300);
  expect(result.current.value).toBe(initialValue + 5);
  expect(result.current.value).not.toBe(initialValue + 8);
});

it("useTimer should change value at startup", () => {
  const { result } = startUp();

  act(() => result.current.start());
  wait(100);
  expect(result.current.value).toBe(initialValue + 1);
  act(() => result.current.stop());
});

it("tickHandler should add to value 10", () => {
  const { result } = startUp({ tickHandler: (value) => value + 10 });

  act(() => result.current.start());
  wait(200);
  expect(result.current.value).toBe(initialValue + 20);
  act(() => result.current.stop());
});

it("onSuccess should be called", () => {
  const mockFn = jest.fn();
  const { result } = startUp({ onSuccess: mockFn });

  act(() => result.current.start());
  wait(200);
  act(() => result.current.stop());

  expect(mockFn).toHaveBeenCalled();
});

it("finisher should stop counter", () => {
  const { result } = startUp({ finisher: (value) => value === 3 });

  act(() => result.current.start());
  wait(400);
  expect(result.current.value).toBe(initialValue + 3);
});
