import React from "react";

import { provideRef } from "./libs/provideRef";

export function useProvideRef(...to: Parameters<typeof provideRef>) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useMemo(() => provideRef(...to), to);
}
