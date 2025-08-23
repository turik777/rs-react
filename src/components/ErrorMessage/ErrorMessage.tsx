import type { FC } from 'react';
import type { FieldErrors } from 'react-hook-form';
import type { TFormData } from '../../validation/schema';

interface IProps {
  field: keyof TFormData;
  errors: FieldErrors<TFormData>;
}

const ErrorMessage: FC<IProps> = ({ field, errors }) => {
  const error = errors[field];

  return (
    <div className="h-2 text-red-500 text-xs mt-1 mb-2">
      {error && typeof error.message === 'string' && <p>{error.message}</p>}
    </div>
  );
};

export default ErrorMessage;
