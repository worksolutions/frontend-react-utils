import React from "react";

export default function DebugComponent({ data }: { data: any }) {
  return <pre style={{ fontSize: 10 }}>{JSON.stringify(data, null, 2)}</pre>;
}
