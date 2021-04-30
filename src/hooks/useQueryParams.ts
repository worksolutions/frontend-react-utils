import React from "react";
import { useLocation, useHistory } from "react-router";
import qs from "qs";
import { isDeepEqual, isNotNil } from "@worksolutions/utils";

export function useQueryParams<P extends string>() {
  const { search, pathname } = useLocation();
  const history = useHistory();
  const query = React.useMemo(() => qs.parse(search.slice(1)) as Partial<Record<P, string>>, [search]);
  const setQuery = React.useCallback(
    (queryPatch: Partial<Record<P, string | number>>, replace = false) => {
      const newQuery = Object.fromEntries(
        Object.entries({ ...query, ...queryPatch }).filter(([, value]) => isNotNil(value)),
      );
      if (isDeepEqual(query, newQuery)) return;
      history[replace ? "replace" : "push"](`${pathname}?${qs.stringify(newQuery)}`);
    },
    [history, pathname, query],
  );

  return [query, setQuery] as const;
}
