import React from "react";
import classnames from "classnames";
import { Link } from "@salt-ds/core";
import styles from "./Footer.module.css";

type FooterLinkItem = {
  label?: string;
  to?: string;
};

interface FooterProps {
  className?: string;
  links: FooterLinkItem[];
  copyright?: string;
}

const defaultCopyright = `© ${new Date().getFullYear()} JPMorgan Chase & Co. All rights reserved.`;

export const Footer: React.FC<FooterProps> = ({
  className,
  links,
  copyright = defaultCopyright,
}) => (
  <footer className={classnames(styles.root, className)}>
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map(({ label, to }) => (
          <div key={label}>
            <Link href={to}>{label}</Link>
          </div>
        ))}
      </div>

      <div className={styles.copyright}>
        <p>{copyright}</p>
      </div>
    </div>
  </footer>
);
