import React from "react";
import classnames from "classnames";
import {
  HelpLinks,
  LinkButton,
  H6,
  P2,
} from "@jpmorganchase/mosaic-components";
import type { LinkIconProps } from "@jpmorganchase/mosaic-components";
import styles from "./Footer.module.css";

type FooterLinkItem = {
  label?: string;
  to?: string;
};

interface FooterProps {
  className?: string;
  description?: string;
  helpLinks?: {
    stackoverflowLabel: string;
    stackoverflowUrl: string;
    symphonyLabel: string;
    symphonyUrl: string;
  };
  href?: string;
  label?: string;
  iconProps?: LinkIconProps;
  title?: string;
  links: FooterLinkItem[];
  copyright?: string;
}

const defaultCopyright = `© ${new Date().getFullYear()} JPMorgan Chase & Co. All rights reserved.`;

export const Footer: React.FC<FooterProps> = ({
  className,
  description,
  helpLinks,
  title,
  href,
  label,
  links,
  copyright = defaultCopyright,
}) => (
  <footer className={classnames(styles.root, className)}>
    <div className={styles.content}>
      {title && <H6 className={styles.title}>{title}</H6>}
      {description && <P2 className={styles.description}> {description}</P2>}
      {label && href && (
        <div className={styles.button}>
          <LinkButton href={href}>{label}</LinkButton>
        </div>
      )}
    </div>

    {helpLinks && (
      <div className={styles.links}>
        {helpLinks ? <HelpLinks subTitle="Need Help?" {...helpLinks} /> : null}
      </div>
    )}

    <div className={styles.links}>
      {links.map(({ label, to }) => (
        <div key={label}>
          <p>{label}</p>
          <p>{to}</p>
        </div>
      ))}
    </div>

    <div className={styles.copyright}>
      <p>{copyright}</p>
    </div>
  </footer>
);
