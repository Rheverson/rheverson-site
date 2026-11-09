type IconName = "arrow-up-right" | "arrow-right" | "download" | "copy" | "check" | "menu" | "close" | "mail" | "github" | "linkedin";

const paths: Record<IconName, React.ReactNode> = {
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  "arrow-right": <path d="M4 12h16m-6-6 6 6-6 6" />,
  download: <path d="M12 4v11m-5-5 5 5 5-5M5 20h14" />,
  copy: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="1.5" />
      <path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  github: (
    <path d="M9 19c-4 1.3-4-2-5.5-2.5M14.5 21v-3.4c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6A4.6 4.6 0 0 0 18.2 6.4a4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6.1 0C6.2 2.9 5.2 3.2 5.2 3.2a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.8 9.6c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10.5V17M8 7.25v.01M12 17v-3.6c0-1.6 1-2.6 2.3-2.6 1.3 0 1.95.9 1.95 2.6V17M12 10.5V17" />
    </>
  ),
};

export function Icon({ name, size = 18, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
