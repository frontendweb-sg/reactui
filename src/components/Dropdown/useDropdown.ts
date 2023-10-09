import React, {
  KeyboardEvent,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { DropdownProps } from "./Dropdown";

export function useDropdown<T>({
  open = false,
  options,
  isMulti,
  defaultValue,
  getOptionLabel,
  onChange,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const [search, setSearch] = useState<string>("");
  const [currentFocus, setCurrentFocus] = useState<number>(0);
  const [values, setValues] = useState<T | T[]>(
    isMulti ? [...(defaultValue as T[])] : (defaultValue as T)
  );

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleClose = () => setIsOpen(false);
  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setSearch(event.target.value),
    []
  );

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    setValues(isMulti ? [] : ("" as T));
    setSearch("");
    setCurrentFocus(0);
    event.stopPropagation();
  };

  const handleFocus = (index: number) => setCurrentFocus(index);

  const transform = (option: T) => getOptionLabel || option["label" as keyof T];
  const removeOption = (option: T) => {
    return (values as T[]).filter((o) => transform(o) !== transform(option));
  };

  const handleClickItem = (
    event: React.MouseEvent,
    option: T,
    index: number
  ) => {
    event.stopPropagation();
    let newValue: T | T[] = option;
    if (isMulti) {
      if (
        (values as T[]).findIndex(
          (item: T) => transform(item) === transform(option)
        ) >= 0
      ) {
        newValue = removeOption(option);
      } else {
        newValue = [...(values as []), option];
      }
    }
    setValues(newValue);
    onChange?.(event, newValue);
  };

  const handleKeyboard = (event: KeyboardEvent) => {
    const { key } = event;
    switch (key) {
      case "Esc":
        event.stopPropagation();
        handleClose();
        break;
      case "ArrowUp":
        event.stopPropagation();
        setCurrentFocus((prev) => (prev === 0 ? 0 : prev - 1));
        break;
      case "ArrowDown":
        event.stopPropagation();
        setCurrentFocus((prev) =>
          prev === filteredOptions.length - 1 ? 0 : prev + 1
        );
        break;
      case "Enter":
        event.stopPropagation();
        handleClickItem(
          event as any,
          filteredOptions[currentFocus],
          currentFocus
        );
        break;
      default:
        break;
    }
  };

  const filteredOptions = useMemo(() => {
    return options.filter((option: T) =>
      (transform(option) as string).toLowerCase().includes(search.toLowerCase())
    );
  }, [options, getOptionLabel, search]);

  return {
    isOpen,
    search,
    currentFocus,
    values,
    handleToggle,
    handleClose,
    handleSearch,
    transform,
    handleClickItem,
    handleKeyboard,
    filteredOptions,
    handleFocus,
    handleClear,
  };
}
