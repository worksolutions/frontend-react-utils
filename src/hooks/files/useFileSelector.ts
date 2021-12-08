import React from "react";
import { useDropArea } from "react-use";
import { AcceptTypes, convertFileToFileInterface, createFileInput, FileInterface } from "@worksolutions/utils";

export function useFileSelector(onChange: (file: FileInterface) => void, acceptTypes?: AcceptTypes[]) {
  const handleChange = React.useCallback(([file]: File[]) => onChange(convertFileToFileInterface(file)), [onChange]);
  const input = React.useMemo(() => createFileInput(handleChange, false, acceptTypes), [handleChange, acceptTypes]);
  const [dropAreaProps, dropAreaState] = useDropArea({ onFiles: handleChange });

  React.useEffect(() => () => void input.destroy(), []);

  return {
    dropAreaProps,
    dropping: dropAreaState.over,
    openNativeFileDialog: React.useCallback(() => input.open(), [input]),
  };
}
