import React, { forwardRef, useMemo, useState } from "react";
import classNames from "classnames";
import { debounce as debounced } from "lodash";
export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  classPrefix?: string;
  error?: string;
  touch?: boolean;
  testid?: string;
  debounce?: boolean;
  debounceDelay?: number;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => void;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      touch,
      value = "",
      className,
      classPrefix = "fw",
      testid = "fw-textbox",
      debounce,
      debounceDelay = 500,
      startIcon,
      endIcon,
      onChange,
      placeholder = "Enter keyword...",
      ...rest
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value);
    const parentClass = `${classPrefix}-input`;

    const debouncedSearch = useMemo(
      () =>
        debounced((event, value) => onChange?.(event, value), debounceDelay),
      [onChange, debounceDelay]
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      if (debounce) debouncedSearch(event, event.target.value);
      else onChange?.(event, event.target.value);
    };

    return (
      <div
        className={classNames(
          parentClass,
          error && `${parentClass}-invalid`,
          touch && `${parentClass}-valid`,
          className
        )}
        data-testid={testid}
      >
        <div className={classNames(`${parentClass}-addon`, className)}>
          {startIcon}
          <input
            value={inputValue}
            role="textbox"
            placeholder={placeholder}
            className={classNames(`${parentClass}-control`)}
            ref={ref}
            onChange={handleChange}
            {...rest}
          />
          {endIcon}
        </div>
        {error && <span className={`${parentClass}-error`}>{error}</span>}
      </div>
    );
  }
);

export default Input;
