import Link from 'next/link';
import { PropsWithChildren } from 'react';

type LinkProps = {
  color?: 'primary' | 'purple' | 'white';
  href: string;
  legacyBehavior?: boolean;
  className?: string;
};

const colorMapping = {
  primary: 'bg-brand-teal text-surface-dark',
  purple: 'bg-brand-purple text-white',
  white: 'bg-white text-surface-dark',
};

const LinkWrapper = ({
  color = 'primary',
  children,
  href,
  legacyBehavior,
  className = '',
  ...props
}: PropsWithChildren<LinkProps>) => (
  <div
    className={`inline-flex items-center justify-center rounded-md font-bold transition-all hover:opacity-90 shadow-md ${colorMapping[color]} ${className}`}
    {...props}
  >
    <Link
      href={href}
      legacyBehavior={legacyBehavior}
      className="w-full text-center py-3.5 px-6 no-underline text-inherit"
    >
      {children}
    </Link>
  </div>
);

export { LinkWrapper };
