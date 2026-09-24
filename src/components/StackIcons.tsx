import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Svg({
  children,
  ...props
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

/** Official-style monochrome marks for near-black surfaces. */
export function GitHubIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </Svg>
  );
}

export function NextjsIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.5 15.5h-1.8l-5.1-7.2v7.2H7.8V6.5h1.9l5 7v-7h1.8v11z" />
    </Svg>
  );
}

export function NodejsIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 1.85 2.55 7.25v9.5L12 22.15l9.45-5.4v-9.5L12 1.85zm0 1.9 7.55 4.32v7.86L12 20.25l-7.55-4.32V8.07L12 3.75z" />
      <path d="M10.35 9.2c-.95 0-1.7.35-2.05 1-.2.35-.3.8-.3 1.3 0 1 .45 1.6 1.25 1.9l1 .35c.45.15.6.35.6.7 0 .4-.35.65-.95.65H8.5v1.25h1.4c1.15 0 1.95-.45 2.3-1.15.15-.35.25-.75.25-1.2 0-1.05-.5-1.65-1.4-2l-1-.35c-.4-.15-.55-.35-.55-.65 0-.35.3-.55.8-.55h1.35V9.2h-1.3zm4.05 0h-1.5v6.2h1.5V9.2z" />
    </Svg>
  );
}

export function PythonIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12.15 2c-2.55 0-2.4.95-2.4.95l.02 2.05h2.45v.6H7.4S4.8 5.35 4.8 9.2c0 3.85 1.7 3.7 1.7 3.7h1v-1.8s-.05-2.05 2-2.05h3.5s1.95.05 1.95-1.9V4.05S15.25 2 12.15 2zm-1.45 1.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
      <path d="M11.85 22c2.55 0 2.4-.95 2.4-.95l-.02-2.05h-2.45v-.6h4.82s2.6.25 2.6-3.6c0-3.85-1.7-3.7-1.7-3.7h-1v1.8s.05 2.05-2 2.05h-3.5s-1.95-.05-1.95 1.9v3.2S8.75 22 11.85 22zm1.45-1.25a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
    </Svg>
  );
}

/** Stylized “Go” wordmark — clear at 22px on dark. */
export function GoIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7.2 8.6c-2.35 0-3.9 1.35-3.9 3.4 0 2.1 1.55 3.4 3.9 3.4 1.35 0 2.4-.5 3.05-1.35l-1.15-.85c-.4.5-1 .8-1.85.8-1.25 0-2.05-.75-2.15-1.9h5.45c.05-.25.1-.55.1-.85 0-2.05-1.5-3.65-3.45-3.65zm0 1.35c1.1 0 1.8.65 1.9 1.65H5.25c.15-1 .85-1.65 1.95-1.65zM14.35 8.75v2.35c.45-.55 1.15-.9 2.05-.9 1.55 0 2.55 1.05 2.55 2.7v3.55h-1.55v-3.3c0-.95-.5-1.5-1.35-1.5-.85 0-1.45.6-1.45 1.55v3.25h-1.55V8.75h1.3z" />
    </Svg>
  );
}

export function DockerIcon(props: IconProps) {
  return (
    <Svg {...props}>
      {/* Container blocks */}
      <path d="M4.5 11.25h2.1v2H4.5v-2zm2.55 0h2.1v2h-2.1v-2zm2.55 0h2.1v2h-2.1v-2zm-5.1-2.4h2.1v2H4.5v-2zm2.55 0h2.1v2h-2.1v-2zm2.55 0h2.1v2h-2.1v-2zm2.55 0h2.1v2h-2.1v-2zm0 2.4h2.1v2h-2.1v-2zm2.55-1.2v2.6h2.15v-.4c1.1-.2 1.95-.7 2.5-1.55.3-.45.45-.95.45-1.5V9.4H17.1v.35c0 .9-.7 1.55-1.85 1.7h-.65zM7.05 6.45h2.1v2h-2.1v-2zm2.55 0h2.1v2h-2.1v-2zm2.55 0h2.1v2h-2.1v-2z" />
      {/* Hull / waterline */}
      <path d="M3.2 14.4c.55 2.35 2.85 4.1 6.55 4.1 4.55 0 7.85-2.05 9.35-5.55H3.4c-.15 0-.2.1-.2.15z" />
    </Svg>
  );
}

export const stackIconMap = {
  GitHub: GitHubIcon,
  "Next.js": NextjsIcon,
  "Node.js": NodejsIcon,
  Python: PythonIcon,
  Go: GoIcon,
  Docker: DockerIcon,
} as const;

export type StackName = keyof typeof stackIconMap;
