import { ResizeObserverMocker } from "./index";
import { ConnectRect } from "./types";

const globalState = {
  domRect: {},
};

describe("ResizeObserverMocker", () => {
  test("ResizeObserverMocker should be defined", () => {
    expect(ResizeObserverMocker).toBeDefined();
  });

  test("method in resizeObserverMocker should get default DOMRect", () => {
    const resizeObserverMocker = new ResizeObserverMocker();

    resizeObserverMocker.setResizeObserverToWindow();
    const resizeObserverCallback: any = jest.fn((data: ConnectRect) => (globalState.domRect = data));
    new ResizeObserver(resizeObserverCallback);

    resizeObserverMocker.listener(ResizeObserverMocker.defaultDOMRect);

    expect(globalState.domRect).toMatchObject(ResizeObserverMocker.defaultDOMRect);
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
