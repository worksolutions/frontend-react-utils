import React from "react";
import { useDropArea } from "react-use";
import { convertFileToFileInterface, createFileInput, FileInterface } from "@worksolutions/utils";

type Result = { dropAreaProps: ReturnType<typeof useDropArea>[0]; dropping: boolean; openNativeFileDialog: () => void };

export function useFileSelector(
  onChange: (files: FileInterface[]) => void,
  options: { acceptTypes?: string; multiply: true },
): Result;

export function useFileSelector(
  onChange: (files: FileInterface) => void,
  options: { acceptTypes?: string; multiply: false },
): Result;

export function useFileSelector(
  onChange: ((files: FileInterface) => void) | ((files: FileInterface[]) => void),
  { acceptTypes, multiply }: { acceptTypes?: string; multiply: boolean },
) {
  const handleChange = React.useCallback(
    (files: File[]) =>
      onChange(multiply ? files.map(convertFileToFileInterface) : (convertFileToFileInterface(files[0]) as any)),
    [multiply, onChange],
  );
  const input = React.useMemo(
    () => (typeof window === "undefined" ? null : createFileInput(handleChange, multiply, acceptTypes)),
    [multiply, handleChange, acceptTypes],
  );
  const [dropAreaProps, dropAreaState] = useDropArea({ onFiles: handleChange });

  React.useEffect(() => () => input?.destroy(), [input]);

  return {
    dropAreaProps,
    dropping: dropAreaState.over,
    openNativeFileDialog: React.useCallback(() => input?.open(), [input]),
  };
}
