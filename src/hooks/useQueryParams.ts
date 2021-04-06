import React from "react";
import { useLocation, useHistory } from "react-router";
import qs from "qs";

export function useQueryParams<P extends string>() {
  const { search, pathname } = useLocation();
  const history = useHistory();
  const query = React.useMemo(() => qs.parse(search.slice(1)) as Partial<Record<P, string>>, [search]);
  const setQuery = React.useCallback(
    (newQuery: Partial<Record<P, string | number>>, replace = false) => {
      history[replace ? "replace" : "push"](`${pathname}?${qs.stringify({ ...query, ...newQuery })}`);
    },
    [history, pathname, query],
  );

  return [query, setQuery] as const;
}
