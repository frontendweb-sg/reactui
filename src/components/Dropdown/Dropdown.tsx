import classNames from "classnames";
import React, {
  ReactElement,
  forwardRef,
  memo,
  useEffect,
  useMemo,
  useRef,
} from "react";
import Input from "../Input";
import type { InputProps } from "../Input";
import { useDropdown } from "./useDropdown";
import Check from "../svg/Check";
import CaretDown from "../svg/CaretDown";
import CaretUp from "../svg/CaretUp";

export type DropdownProps<T> = {
  idProp?: string;
  className?: string;
  classPrefix?: string;
  error?: string;
  inputProps?: InputProps;
  options: T[];
  open?: boolean;
  sorting?: boolean;
  clearable?: boolean;
  isSearch?: boolean;
  defaultValue?: T | T[];
  isMulti?: boolean;
  placeholder?: string;
  onChange?: (event: React.MouseEvent, value: T | T[]) => void;
  onAsyncSearch?: (value: string) => void;
  getOptionLabel?: (option: T) => string;
};

const Dropdown = forwardRef(
  <T,>(
    {
      idProp = "id",
      defaultValue,
      options = [],
      getOptionLabel,
      onChange,
      onAsyncSearch,
      clearable,
      sorting,
      className,
      classPrefix = "fw",
      error,
      open,
      isMulti,
      placeholder = "Select",
      isSearch,
      ...rest
    }: DropdownProps<T>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const {
      isOpen,
      search,
      values,
      currentFocus,
      filteredOptions,
      transform,
      handleKeyboard,
      handleToggle,
      handleClickItem,
      handleFocus,
      handleClose,
      handleSearch,
      handleClear,
    } = useDropdown({
      isMulti,
      options,
      open,
      onChange,
      getOptionLabel,
      defaultValue,
    });

    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownMenuRef = useRef<HTMLDivElement>(null);
    const dropdownItemRef = useRef<HTMLLIElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    const parentClass = `${classPrefix}-dropdown`;

    useEffect(() => {
      if (isOpen && searchRef.current) {
        searchRef.current.focus();
      }
    }, [isOpen]);

    useEffect(() => {
      const handler = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          handleClose();
        }
      };

      document.addEventListener("click", handler, { capture: true });
      return () => {
        document.removeEventListener("click", handler, { capture: true });
      };
    }, []);

    useEffect(() => {
      if (!dropdownItemRef.current) return;
      dropdownItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, [currentFocus]);

    const getDisplay = useMemo(() => {
      if (!values || (Array.isArray(values) && values.length == 0)) {
        return placeholder;
      }

      if (isMulti) {
        return (
          <div className={`${parentClass}-chips`}>
            {(values as T[]).map((option: T, index: number) => (
              <div
                className={`${parentClass}-chips-item`}
                key={`chip-${
                  option[(idProp ?? "label") as keyof T] as string
                }-${index}`}
              >
                {transform(option) as string}
              </div>
            ))}
          </div>
        );
      }
      return transform(values as T);
    }, [placeholder, getOptionLabel, transform]);
    return (
      <div
        className={classNames(
          parentClass,
          className,
          error && `${classPrefix}-invalid`
        )}
        tabIndex={0}
        ref={dropdownRef}
        onKeyDown={handleKeyboard}
      >
        <div
          onClick={handleToggle}
          className={classNames(`${parentClass}-placeholder`)}
        >
          {getDisplay as string | ReactElement}

          <div className={classNames(`${parentClass}-clear`)}>
            {clearable && <button onClick={handleClear}>X</button>}
            {isOpen ? <CaretUp /> : <CaretDown />}
          </div>
        </div>
        {isOpen && (
          <div
            className={classNames(`${parentClass}-menu`)}
            ref={dropdownMenuRef}
          >
            {isSearch && (
              <Input ref={searchRef} value={search} onChange={handleSearch} />
            )}

            {filteredOptions.length === 0 && (
              <div className={classNames(`${parentClass}-norecord`)}>
                No records
              </div>
            )}
            <div className={classNames(`${parentClass}-listbox`)}>
              <ul className={classNames(`${parentClass}-list`)}>
                {filteredOptions.map((option: T, index: number) => {
                  const selected = isMulti
                    ? (values as T[]).find(
                        (item: T) => transform(item) === transform(option)
                      )
                    : transform(values as T) === transform(option);

                  return (
                    <li
                      tabIndex={-1}
                      role="option"
                      id={`option-${index}`}
                      data-option-index={index}
                      key={option[(idProp ?? "label") as keyof T] as string}
                      area-selected={currentFocus === index}
                      className={classNames(`${parentClass}-list-item`, {
                        active: currentFocus === index,
                      })}
                      ref={currentFocus === index ? dropdownItemRef : null}
                      onClick={(event) => {
                        handleClickItem(event, option, index);
                        handleFocus(index);
                      }}
                    >
                      {transform(option) as string} {selected && <Check />}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default memo(Dropdown);
