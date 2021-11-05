import { ResizeObserverMocker } from "./index";

const globalState = {
  domRect: {},
};

const mockRect: DOMRect = {
  x: 1,
  y: 2,
  width: 200,
  height: 200,
  top: 100,
  bottom: 0,
  left: 100,
  right: 0,
  toJSON: () => "",
};

const newMockRect = { ...mockRect, width: 9999 };

describe("ResizeObserverMocker", () => {
  test("ResizeObserverMocker should be defined", () => {
    expect(ResizeObserverMocker).toBeDefined();
  });

  test("method in resizeObserverMocker should set default DOMRect", () => {
    const resizeObserverMocker = new ResizeObserverMocker();

    resizeObserverMocker.setResizeObserverToWindow();
    const resizeObserverCallback: any = jest.fn((data: DOMRect) => (globalState.domRect = data));
    new ResizeObserver(resizeObserverCallback);

    resizeObserverMocker.listener(ResizeObserverMocker.defaultDOMRect);

    expect(globalState.domRect).toMatchObject(ResizeObserverMocker.defaultDOMRect);
  });

  test("multiple updates listener", () => {
    const resizeObserverMocker = new ResizeObserverMocker();

    resizeObserverMocker.setResizeObserverToWindow();
    const resizeObserverCallback: any = jest.fn((data: DOMRect) => (globalState.domRect = data));
    new ResizeObserver(resizeObserverCallback);

    resizeObserverMocker.listener(ResizeObserverMocker.defaultDOMRect);
    expect(globalState.domRect).toMatchObject(ResizeObserverMocker.defaultDOMRect);

    resizeObserverMocker.listener(mockRect);
    expect(globalState.domRect).toMatchObject(mockRect);

    resizeObserverMocker.listener(newMockRect);
    expect(globalState.domRect).toMatchObject(newMockRect);
  });

  test("methods in resizeObserverMocker should be called", () => {
    const resizeObserverMocker = new ResizeObserverMocker();

    resizeObserverMocker.disconnect();
    resizeObserverMocker.unobserve();
    resizeObserverMocker.observe();

    expect(resizeObserverMocker.disconnect).toBeCalled();
    expect(resizeObserverMocker.unobserve).toBeCalled();
    expect(resizeObserverMocker.observe).toBeCalled();
  });
});
