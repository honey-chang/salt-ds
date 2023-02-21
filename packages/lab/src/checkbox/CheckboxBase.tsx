import { clsx } from "clsx";
import {
  ChangeEvent,
  FocusEventHandler,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  useRef,
  useState,
} from "react";
import {
  makePrefixer,
  useControlled,
  useForkRef,
  useIsFocusVisible,
} from "@salt-ds/core";
import { CheckboxIcon } from "./CheckboxIcon";

import "./CheckboxBase.css";

const withBaseName = makePrefixer("saltCheckboxBase");

export interface CheckboxBaseProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  inputProps?: Partial<InputHTMLAttributes<HTMLInputElement>>;
  name?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /**
   * Callback when checked state is changed
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  value?: string;
}

export const CheckboxBase = forwardRef<HTMLDivElement, CheckboxBaseProps>(
  function CheckboxBase(
    {
      checked: checkedProp,
      className: classNameProp,
      defaultChecked,
      disabled,
      indeterminate,
      inputProps,
      name,
      onBlur,
      onChange,
      onFocus,
      value,
      ...rest
    },
    ref
  ) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [checked, setChecked] = useControlled({
      controlled: checkedProp,
      default: Boolean(defaultChecked),
      name: "Checkbox",
      state: "checked",
    });

    const [focusVisible, setFocusVisible] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      // Workaround for https://github.com/facebook/react/issues/9023
      if (event.nativeEvent.defaultPrevented) {
        return;
      }

      const value = event.target.checked;
      setChecked(value);
      onChange?.(event, value);
    };

    const {
      isFocusVisibleRef,
      onFocus: handleFocusVisible,
      onBlur: handleBlurVisible,
      ref: focusVisibleRef,
    } = useIsFocusVisible<HTMLInputElement>();

    const handleRef = useForkRef<HTMLInputElement>(inputRef, focusVisibleRef);

    const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
      handleFocusVisible(event);
      if (isFocusVisibleRef.current) {
        setFocusVisible(true);
      }
      if (onFocus) {
        onFocus(event);
      }
    };

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      handleBlurVisible();
      setFocusVisible(false);
      if (onBlur) {
        onBlur(event);
      }
    };

    const className = clsx(withBaseName(), classNameProp, {
      saltFocusVisible: focusVisible,
    });
    return (
      <span {...rest} className={className} ref={ref}>
        <input
          aria-checked={indeterminate ? "mixed" : checked}
          name={name}
          value={value}
          {...inputProps}
          checked={checkedProp}
          className={withBaseName("input")}
          data-indeterminate={indeterminate}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          ref={handleRef}
          type="checkbox"
        />
        <CheckboxIcon
          checked={checked}
          disabled={disabled}
          indeterminate={indeterminate}
        />
      </span>
    );
  }
);
