import { clsx } from "clsx";
import {
  ChangeEvent,
  FocusEventHandler,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  useContext,
  useRef,
  useState,
} from "react";
import {
  createChainedFunction,
  makePrefixer,
  useControlled,
  useForkRef,
  useIsFocusVisible,
} from "@salt-ds/core";
import { CheckboxIcon } from "./CheckboxIcon";

import "./Checkbox.css";
import { ControlLabel, ControlLabelProps } from "../control-label";
import { CheckboxGroupContext } from "./internal/CheckboxGroupContext";

const withBaseName = makePrefixer("saltCheckbox");
const classBase = "saltCheckbox";

export interface CheckboxProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  inputProps?: Partial<InputHTMLAttributes<HTMLInputElement>>;
  label?: ControlLabelProps["label"];
  LabelProps?: Partial<ControlLabelProps>;
  name?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /**
   * Callback when checked state is changed
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  value?: string;
}

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  function Checkbox(
    {
      checked: checkedProp,
      className: classNameProp,
      defaultChecked: defaultCheckedProp,
      disabled,
      indeterminate,
      inputProps,
      label,
      LabelProps,
      name,
      onBlur,
      onChange,
      onFocus,
      value,
      ...rest
    },
    ref
  ) {
    const groupContext = useContext(CheckboxGroupContext);

    let isChecked = checkedProp;
    let defaultChecked = defaultCheckedProp;

    if (groupContext) {
      if (typeof isChecked === "undefined" && typeof value === "string") {
        isChecked = groupContext?.checkedValues?.includes(value);
      }

      defaultChecked = undefined;
    }

    const handleChange = createChainedFunction(
      (event: ChangeEvent<HTMLInputElement>) => {
        // Workaround for https://github.com/facebook/react/issues/9023
        if (event.nativeEvent.defaultPrevented) {
          return;
        }

        const value = event.target.checked;
        setChecked(value);
        onChange?.(event, value);
      },
      groupContext?.onChange
    );

    const inputRef = useRef<HTMLInputElement>(null);

    const [checked, setChecked] = useControlled({
      controlled: isChecked,
      default: Boolean(defaultCheckedProp),
      name: "Checkbox",
      state: "checked",
    });

    const [focusVisible, setFocusVisible] = useState(false);

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

    const baseClassName = clsx(withBaseName("base"), classNameProp, {
      saltFocusVisible: focusVisible,
    });
    return (
      <div
        {...rest}
        className={clsx(classBase, classNameProp, {
          [`${classBase}-disabled`]: disabled,
        })}
        data-testid="checkbox"
        ref={ref}
      >
        <ControlLabel
          {...LabelProps}
          className={`${classBase}-label`}
          disabled={disabled}
          label={label}
          labelPlacement={"right"}
        >
          <span {...rest} className={baseClassName} ref={ref}>
            <input
              aria-checked={indeterminate ? "mixed" : checked}
              name={name}
              value={value}
              {...inputProps}
              checked={checked}
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
        </ControlLabel>
      </div>
    );
  }
);
