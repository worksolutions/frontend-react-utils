import React, { useCallback } from "react";

function ForceUnmountingComponent({ children }: { children: JSX.Element }) {
  const DemoComponent = useCallback(() => children, [{}]);
  return <DemoComponent />;
}

export default ForceUnmountingComponent;
