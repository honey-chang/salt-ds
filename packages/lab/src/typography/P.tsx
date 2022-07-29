import { forwardRef } from "react";
import { Text, TextProps } from "./Text";

export const P = forwardRef<HTMLElement, Omit<TextProps<"p">, "elementType">>(
  function P({ children, ...rest }, ref) {
    return (
      <Text elementType="p" ref={ref} {...rest}>
        {children}
      </Text>
    );
  }
);
