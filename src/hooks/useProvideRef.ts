import React from "react";

import { provideRef } from "./libs/provideRef";

export function useProvideRef(...to: Parameters<typeof provideRef>) {
  return React.useMemo(() => provideRef(...to), to);
}
