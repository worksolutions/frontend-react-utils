export type OnchangePermission = ((this: { state: PermissionState }) => void) | undefined;

export class PermissionMocker {
  private onchange: OnchangePermission;
  private granted = this.mockPermission("granted");
  private denied = this.mockPermission("denied");
  private prompt = this.mockPermission("prompt");

  constructor() {
    this.setOnChange = this.setOnChange.bind(this);
    this.writeNavigator = this.writeNavigator.bind(this);
    this.mockPermission = this.mockPermission.bind(this);
    this.fireOnchangePermission = this.fireOnchangePermission.bind(this);
  }

  writeNavigator(permissionValue: PermissionState) {
    const permissionMockImplementation = this[permissionValue];
    Object.defineProperty(navigator, "permissions", {
      value: permissionMockImplementation,
      writable: true,
      configurable: true,
    });
  }

  fireOnchangePermission(permissionValue: PermissionState) {
    if (!this.onchange) return;
    this.onchange.call({ state: permissionValue });
  }

  private mockPermission(state: PermissionState) {
    const query = { state };
    let onchangeValue: OnchangePermission = undefined;
    const setOnChange = this.setOnChange.bind(this);

    Object.defineProperty(query, "onchange", {
      set(value: OnchangePermission) {
        onchangeValue = value;
        setOnChange && setOnChange(value);
      },
      get() {
        return onchangeValue;
      },
    });

    return { query: jest.fn(() => Promise.resolve(query)) };
  }

  private setOnChange(onchange: OnchangePermission) {
    this.onchange = onchange;
  }
}
