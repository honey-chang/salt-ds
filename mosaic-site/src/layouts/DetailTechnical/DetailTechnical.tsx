import React, { FC } from "react";
import clsx from "clsx";
import { HelpLinks } from "@jpmorganchase/mosaic-components";
import {
  AppHeader,
  DocPaginator,
  BackLink,
  Breadcrumbs,
  TableOfContents,
  PageNavigation,
  Sidebar,
} from "@jpmorganchase/mosaic-site-components";
import { Footer } from "../../components/footer";
import { LayoutBase } from "@jpmorganchase/mosaic-layouts";
import { LayoutColumns } from "../LayoutColumns/LayoutColumns";
import { SaltProvider } from "@salt-ds/core";
import { LayoutProps } from "../types/index";
import layoutStyles from "../index.module.css";
import styles from "./DetailTechnical.module.css";

export const DetailTechnical: FC<LayoutProps> = ({
  BackLinkProps,
  FooterProps,
  SidebarProps,
  children,
}) => {
  const Header = <AppHeader />;

  const PrimarySidebar = (
    <>
      {BackLinkProps && (
        <header className={styles.sidebarHeader}>
          <BackLink {...BackLinkProps} />
        </header>
      )}
      {/*  TODO: Add salt light theme to vertical navigation */}
      <PageNavigation />
      {SidebarProps?.helpLinks && (
        <HelpLinks subTitle="Need help?" {...SidebarProps.helpLinks} />
      )}
    </>
  );

  const SecondarySidebar = <TableOfContents />;

  const title = children?.props.source.frontmatter.title;

  return (
    <LayoutBase Header={Header}>
      <div className={clsx(layoutStyles.docsWrapper, styles.docsWrapper)}>
        <LayoutColumns PrimarySidebar={PrimarySidebar}>
          <Breadcrumbs />
          <h1 className={layoutStyles.title}>{title}</h1>
          <SaltProvider mode="light">
            <div className={layoutStyles.docsPageContainer}>
              <div className={layoutStyles.docsPageContent}>{children}</div>
              <Sidebar sticky>{SecondarySidebar}</Sidebar>
            </div>
          </SaltProvider>
          <DocPaginator />
        </LayoutColumns>
      </div>
      <Footer {...FooterProps} />
    </LayoutBase>
  );
};
