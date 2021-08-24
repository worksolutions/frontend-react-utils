import { PermissionMocker } from "./PermissionMocker";

const { writeNavigator, fireOnchangePermission } = new PermissionMocker();

const getPermissionQuery = () => navigator.permissions.query({ name: "geolocation" });
it("permissionMocker should navigator permissions should return prompt state", async () => {
  writeNavigator("prompt");
  const permissionState = await getPermissionQuery();
  expect(permissionState.state).toBe("prompt");
});

it("permissionMocker should navigator permissions should return granted state", async () => {
  writeNavigator("granted");
  const permissionState = await getPermissionQuery();
  expect(permissionState.state).toBe("granted");
});

it("permissionMocker should navigator permissions should return denied state", async () => {
  writeNavigator("denied");
  const permissionState = await getPermissionQuery();
  expect(permissionState.state).toBe("denied");
});

it("permissionMocker should execute permissionState onchange function", async () => {
  writeNavigator("denied");
  const permissionState = await getPermissionQuery();
  const onChangeCallback = jest.fn();
  permissionState.onchange = onChangeCallback;

  fireOnchangePermission("denied");
  fireOnchangePermission("denied");
  fireOnchangePermission("denied");

  expect(onChangeCallback).toHaveBeenCalledTimes(3);
});

it("permissionMocker should execute permissionState onchange with new state", async () => {
  writeNavigator("granted");
  const permissionState = await navigator.permissions.query({ name: "geolocation" });
  const onChangeCallback = (expectedValue: PermissionState) =>
    function (this: { state: PermissionState }) {
      expect(this.state).toBe(expectedValue);
    };

  permissionState.onchange = onChangeCallback("denied");
  fireOnchangePermission("denied");
  permissionState.onchange = onChangeCallback("granted");
  fireOnchangePermission("granted");
  permissionState.onchange = onChangeCallback("prompt");
  fireOnchangePermission("prompt");
});
