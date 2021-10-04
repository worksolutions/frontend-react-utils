import { ResizeObserverMethodsNames } from "./types";

const Global = window || global;
export class ResizeObserverMocker {
  static defaultDOMRect: { contentRect: DOMRect } = {
    contentRect: {
      x: 0,
      y: 0,
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    } as DOMRect,
  };

  constructor() {
    this.setListener = this.setListener.bind(this);
  }

  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  listener: any = undefined as any;

  implementResizeObserverMethod(methodName: ResizeObserverMethodsNames, mockMethod: jest.Mock<any, any>) {
    this[methodName] = mockMethod;
  }

  setResizeObserverToWindow() {
    const setListener = this.setListener.bind(this);
    const { observe, unobserve, disconnect } = this;

    // @ts-ignore
    Global.ResizeObserver = class ResizeObserver {
      constructor(ls: any) {
        setListener(ls);
      }
    };

    Global.ResizeObserver.prototype.observe = observe;
    Global.ResizeObserver.prototype.unobserve = unobserve;
    Global.ResizeObserver.prototype.disconnect = disconnect;
  }

  private setListener(ls: ResizeObserverCallback) {
    this.listener = ls;
  }
}
