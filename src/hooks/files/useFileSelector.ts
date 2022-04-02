import React from "react";
import { useDropArea } from "react-use";
import { AcceptTypes, convertFileToFileInterface, createFileInput, FileInterface } from "@worksolutions/utils";

type Result = { dropAreaProps: ReturnType<typeof useDropArea>[0]; dropping: boolean; openNativeFileDialog: () => void };

export function useFileSelector(
  onChange: (files: FileInterface[]) => void,
  options: { acceptTypes?: AcceptTypes[]; multiply: true },
): Result;

export function useFileSelector(
  onChange: (files: FileInterface) => void,
  options: { acceptTypes?: AcceptTypes[]; multiply: false },
): Result;

export function useFileSelector(
  onChange: ((files: FileInterface) => void) | ((files: FileInterface[]) => void),
  { acceptTypes, multiply }: { acceptTypes?: AcceptTypes[]; multiply: boolean },
) {
  const handleChange = React.useCallback(
    (files: File[]) =>
      onChange(multiply ? files.map(convertFileToFileInterface) : (convertFileToFileInterface(files[0]) as any)),
    [onChange],
  );
  const input = React.useMemo(() => createFileInput(handleChange, false, acceptTypes), [handleChange, acceptTypes]);
  const [dropAreaProps, dropAreaState] = useDropArea({ onFiles: handleChange });

  React.useEffect(() => () => void input.destroy(), []);

  return {
    dropAreaProps,
    dropping: dropAreaState.over,
    openNativeFileDialog: React.useCallback(() => input.open(), [input]),
  };
}
