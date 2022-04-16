import { useEffect } from "react";

export function useDocumentTitle(title: string, timeout = 0) {
  useEffect(() => {
    if (title === "") return;
    if (timeout === 0) {
      document.title = title;
      return;
    }

    setTimeout(() => (document.title = title), timeout);
  }, [timeout, title]);
}
