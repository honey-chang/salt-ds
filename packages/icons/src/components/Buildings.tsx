import { forwardRef } from "react";

import { Icon, IconProps } from "../icon";

export type BuildingsIconProps = IconProps;

export const BuildingsIcon = forwardRef<SVGSVGElement, BuildingsIconProps>(
  function BuildingsIcon(props: BuildingsIconProps, ref) {
    return (
      <Icon
        data-testid="BuildingsIcon"
        aria-label="buildings"
        viewBox="0 0 12 12"
        ref={ref}
        {...props}
      >
        <path d="M0 11h12v1H0v-1Z" />
        <path
          fillRule="evenodd"
          d="M6 2H1v9h5V2ZM0 1v11h7V1H0Zm11 4H9v6h2V5ZM8 4v8h4V4H8Z"
          clipRule="evenodd"
        />
        <path d="M2 3h1v1H2V3Zm0 2h1v1H2V5Zm0 2h1v1H2V7Zm2-4h1v1H4V3Zm0 2h1v1H4V5Zm0 2h1v1H4V7Zm-1 4V9h1v2H3Z" />
      </Icon>
    );
  }
);
