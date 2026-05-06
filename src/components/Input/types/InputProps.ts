import { ReactNode } from 'react';
import { FieldElement, RegisterOptions } from 'react-hook-form';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  FieldElement & {
    id: string;
    validation?: RegisterOptions;
    isError?: boolean;
    icon?: ReactNode;
  };
