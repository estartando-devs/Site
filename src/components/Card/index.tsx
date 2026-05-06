import { HTMLAttributes, PropsWithChildren } from 'react';

export type CardProps = HTMLAttributes<HTMLDivElement>;

export const Card = ({
  children,
  className = '',
  ...props
}: PropsWithChildren<CardProps>) => (
  <div
    className={`flex bg-surface-container/60 shadow-lg rounded-[4px] border border-white/5 ${className}`}
    {...props}
  >
    {children}
  </div>
);
