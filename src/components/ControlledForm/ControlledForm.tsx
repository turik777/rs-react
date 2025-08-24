import React from 'react';
import Button from '../Button/Button';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { schema, type TFormData } from '../../validation/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { fileToBase64 } from '../../utils/fileToBase64';
import PasswordStrength from '../PasswordStrength/PasswordStrength';
import { useFormStore } from '../../store/store';

interface IProps {
  onSubmit: (data: TFormData) => void;
}

const ControlledForm: React.FC<IProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<TFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: 0,
      email: '',
      gender: '',
      country: '',
      acceptTerms: false,
    },
  });

  const { countries } = useFormStore();
  const password = watch('password');

  const processSubmit: SubmitHandler<TFormData> = async (data) => {
    const pictureFile = data.picture[0];
    const base64Picture = await fileToBase64(pictureFile);
    onSubmit({ ...data, picture: base64Picture });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(processSubmit)}>
      <div className="flex gap-3">
        <div className="w-4/5">
          <label htmlFor="name-controlled" className="form-label">
            Name
          </label>
          <input
            id="name-controlled"
            className="form-input"
            {...register('name')}
            autoFocus
          />
          <ErrorMessage errors={errors} field="name" />
        </div>
        <div className="w-1/5">
          <label htmlFor="age-controlled" className="form-label">
            Age
          </label>
          <input
            id="age-controlled"
            type="number"
            className="form-input"
            {...register('age', { valueAsNumber: true })}
          />
          <ErrorMessage errors={errors} field="age" />
        </div>
      </div>
      <div>
        <label htmlFor="email-controlled" className="form-label">
          Email
        </label>
        <input
          id="email-controlled"
          type="email"
          className="form-input"
          {...register('email')}
        />
        <ErrorMessage errors={errors} field="email" />
      </div>

      <div className="flex gap-3">
        <div className="w-1/2">
          <label htmlFor="password-controlled" className="form-label">
            Password
          </label>
          <input
            id="password-controlled"
            type="password"
            className="form-input"
            {...register('password')}
          />
          <PasswordStrength password={password} />
          <ErrorMessage errors={errors} field="password" />
        </div>
        <div className="w-1/2">
          <label htmlFor="passwordConfirm-controlled" className="form-label">
            Confirm Password
          </label>
          <input
            id="passwordConfirm-controlled"
            type="password"
            className="form-input"
            {...register('passwordConfirm')}
          />
          <ErrorMessage errors={errors} field="passwordConfirm" />
        </div>
      </div>

      <div>
        <label className="form-label">Gender</label>
        <div className="flex gap-4">
          <label>
            <input type="radio" value="male" {...register('gender')} /> Male
          </label>
          <label>
            <input type="radio" value="female" {...register('gender')} /> Female
          </label>
          <label>
            <input type="radio" value="other" {...register('gender')} /> Other
          </label>
        </div>
        <ErrorMessage errors={errors} field="gender" />
      </div>

      <div>
        <label htmlFor="country-controlled" className="form-label">
          Country
        </label>
        <input
          id="country-controlled"
          list="country-list"
          className="form-input"
          placeholder="Type to search..."
          {...register('country')}
        />
        <datalist id="country-list">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        <ErrorMessage errors={errors} field="country" />
      </div>

      <div>
        <label htmlFor="picture-controlled" className="form-label">
          Profile Picture
        </label>
        <input
          id="picture-controlled"
          type="file"
          accept="image/png, image/jpeg"
          className="w-full text-sm hover:text-gray-500 cursor-pointer"
          {...register('picture')}
        />
        <ErrorMessage errors={errors} field="picture" />
      </div>

      <div>
        <label htmlFor="acceptTerms-controlled" className="flex items-center">
          <input
            id="acceptTerms-controlled"
            type="checkbox"
            className="cursor-pointer"
            {...register('acceptTerms')}
          />
          <span className="ml-1 text-sm hover:text-gray-500 cursor-pointer">
            Accept Terms and Conditions
          </span>
        </label>
        <ErrorMessage errors={errors} field="acceptTerms" />
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button type="submit" className="button" disabled={!isValid}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ControlledForm;
