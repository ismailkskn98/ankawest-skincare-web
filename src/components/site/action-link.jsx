import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import styles from "./site.module.css";

export function ActionLink({
  children,
  href,
  external = false,
  variant = "primary",
  compact = false,
}) {
  const className = [
    styles.actionLink,
    styles[`${variant}Action`],
    compact ? styles.compactAction : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{children}</span>
      <span className={styles.actionIcon} aria-hidden="true">
        <ArrowUpRight size={16} weight="regular" />
      </span>
    </>
  );

  if (external) {
    return (
      <a
        className={className}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {content}
    </Link>
  );
}
