import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { htmlCollectionToArray } from "@worksolutions/utils";

import { ResizeObserverMocker } from "./utils/ResizeObserverMocker";
import { useChildrenMeasure } from "../hooks";

const mockRect: DOMRect = {
  x: 10,
  y: 10,
  width: 200,
  height: 200,
  top: 100,
  bottom: 0,
  left: 100,
  right: 0,
  toJSON: () => "",
};

const defaultEmptyArray = new Array(4).fill(undefined);

const $rootTestElement = document.createElement("div");
$rootTestElement.getBoundingClientRect = jest.fn(() => {
  const newMockRect = { ...mockRect };
  newMockRect.x = 10;
  newMockRect.y = 10;

  return newMockRect;
});

defaultEmptyArray.forEach(() => {
  const $childElement = document.createElement("div");
  $rootTestElement.appendChild($childElement);
});

function rewriteChildrenRect(rect: DOMRect = ResizeObserverMocker.defaultDOMRect.contentRect) {
  htmlCollectionToArray($rootTestElement.children).forEach(($childElement: HTMLElement) => {
    $childElement.getBoundingClientRect = jest.fn(() => rect);
  });
}

describe("useChildrenMeasure", () => {
  test("useChildrenMeasure is defined", () => {
    expect(useChildrenMeasure).toBeDefined();
  });

  test("useChildrenMeasure should get default values", () => {
    const { result } = renderHook(() => useChildrenMeasure());
    rewriteChildrenRect();

    act(() => result.current.initRef($rootTestElement));
    expect(result.current.measures).toMatchObject(
      defaultEmptyArray.map(() => ResizeObserverMocker.defaultDOMRect.contentRect),
    );
  });

  test("useChildrenMeasure should get children rect", () => {
    const { result } = renderHook(() => useChildrenMeasure());
    rewriteChildrenRect(mockRect);

    act(() => result.current.initRef($rootTestElement));

    expect(result.current.measures).toMatchObject(defaultEmptyArray.map(() => mockRect));
  });

  test("useChildrenMeasure should track changes in childrens", () => {
    const resizeObserverMocker = new ResizeObserverMocker();
    resizeObserverMocker.setResizeObserverToWindow();
    rewriteChildrenRect();

    const { result } = renderHook(() => useChildrenMeasure(true));
    act(() => result.current.initRef($rootTestElement));
    act(() => result.current.update());

    expect(result.current.measures).toMatchObject(
      defaultEmptyArray.map(() => ResizeObserverMocker.defaultDOMRect.contentRect),
    );

    rewriteChildrenRect(mockRect);
    act(() => resizeObserverMocker.listener());

    expect(result.current.measures).toMatchObject(defaultEmptyArray.map(() => mockRect));
  });

  test("disconnect should call when component unmount", () => {
    const resizeObserverMocker = new ResizeObserverMocker();
    resizeObserverMocker.setResizeObserverToWindow();
    rewriteChildrenRect();

    const { result, unmount } = renderHook(() => useChildrenMeasure(true));
    act(() => result.current.initRef($rootTestElement));

    unmount();

    expect(resizeObserverMocker.disconnect).toBeCalled();
  });
});
