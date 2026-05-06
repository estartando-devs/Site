import { HTMLAttributes, PropsWithChildren } from 'react';

type LayoutProps = {
  full?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const Layout = ({
  children,
  full = false,
  className = '',
  ...props
}: PropsWithChildren<LayoutProps>) => (
  <main
    className={`bg-surface-dark w-full ${
      full ? 'h-screen' : 'min-h-full'
    } ${className}`}
    {...props}
  >
    {children}
  </main>
);
