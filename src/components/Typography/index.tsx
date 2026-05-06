import { HTMLAttributes, PropsWithChildren } from 'react';

type TypographyProps = {
  variant?: 'h1' | 'h2' | 'h3' | 'body1' | 'body2' | 'body3';
  color?: string;
  weight?: string;
  lineHeight?: string;
  fontSize?: string;
  as?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<HTMLHeadingElement>;

const variantMapping = {
  h1: 'font-display text-[4rem] leading-[5.5rem] tracking-[0.2px]',
  h2: 'font-display text-[2.25rem] leading-[2.6rem]',
  h3: 'font-display text-[1.75rem] leading-[2rem]',
  body1: 'font-sans text-[1.5rem] leading-[2rem]',
  body2: 'font-sans text-[1.125rem] leading-[1.56rem]',
  body3: 'font-sans text-[1rem] leading-[1.56rem]',
};

const tagMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body1: 'p',
  body2: 'p',
  body3: 'p',
};

export const Typography = ({
  variant = 'body1',
  color,
  weight,
  lineHeight,
  fontSize,
  children,
  as,
  className = '',
  style,
  ...props
}: PropsWithChildren<TypographyProps>) => {
  const Component = (as || tagMapping[variant] || 'p') as any;

  const combinedStyle = {
    color,
    fontWeight: weight,
    lineHeight,
    fontSize,
    ...style,
  };

  return (
    <Component
      style={combinedStyle}
      className={`${variantMapping[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
