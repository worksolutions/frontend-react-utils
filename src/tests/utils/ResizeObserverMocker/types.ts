export enum ResizeObserverMethodsNames {
  observe = "observe",
  unobserve = "unobserve",
  disconnect = "disconnect",
  listener = "listener",
}

export type ConnectRect = {
  contentRect: {
    x: number;
    y: number;
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
  };
};
