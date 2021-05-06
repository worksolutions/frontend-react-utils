import React from "react";
import { useLocation, useHistory } from "react-router";
import qs from "qs";
import { isDeepEqual, isNotNil } from "@worksolutions/utils";

import { useSyncToRef } from "./useSyncToRef";

export function useQueryParams<P extends string>() {
  const { search, pathname } = useLocation();
  const history = useHistory();
  const query = React.useMemo(() => qs.parse(search.slice(1)) as Partial<Record<P, string>>, [search]);
  const pathnameRef = useSyncToRef(pathname);
  const queryRef = useSyncToRef(query);
  const setQuery = React.useCallback(
    (queryPatch: Partial<Record<P, string | number>>, replace = false) => {
      const newQuery = Object.fromEntries(
        Object.entries({ ...queryRef.current, ...queryPatch }).filter(([, value]) => isNotNil(value)),
      );
      if (isDeepEqual(queryRef.current, newQuery)) return;
      history[replace ? "replace" : "push"](`${pathnameRef.current}?${qs.stringify(newQuery)}`);
    },
    [history, queryRef, pathnameRef],
  );

  return [query, setQuery] as const;
}
