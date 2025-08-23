import React, { useState } from 'react';
import Button from '../Button/Button';
import { schema, type TFormData } from '../../validation/schema';
import { useFormStore } from '../../store/store';
import { fileToBase64 } from '../../utils/fileToBase64';
import PasswordStrength from '../PasswordStrength/PasswordStrength';

interface IProps {
  onSubmit: (data: TFormData) => void;
}

const UncontrolledForm: React.FC<IProps> = ({ onSubmit }) => {
  const { countries } = useFormStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get('name'),
      age: formData.get('age') ? Number(formData.get('age')) : undefined,
      email: formData.get('email'),
      password: formData.get('password'),
      passwordConfirm: formData.get('passwordConfirm'),
      gender: formData.get('gender'),
      country: formData.get('country'),
      picture: formData.getAll('picture'),
      acceptTerms: formData.get('acceptTerms') === 'on',
    };

    const result = schema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === 'string') {
          if (!fieldErrors[field]) {
            fieldErrors[field] = issue.message;
          }
        }
      });
      setErrors(fieldErrors);
      return;
    }

    const pictureFile = result.data.picture[0];
    const base64Picture = await fileToBase64(pictureFile);

    setErrors({});
    onSubmit({ ...result.data, picture: base64Picture });
  };

  const ErrorMessage = ({ field }: { field: string }) => (
    <div className="h-2 text-red-500 text-xs mt-1 mb-2">
      {errors[field] && <p>{errors[field]}</p>}
    </div>
  );

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div className="flex gap-3">
        <div className="w-4/5">
          <label htmlFor="name-controlled" className="form-label">
            Name
          </label>
          <input
            name="name"
            id="name-controlled"
            className="form-input"
            autoFocus
          />
          <ErrorMessage field="name" />
        </div>
        <div className="w-1/5">
          <label htmlFor="age-controlled" className="form-label">
            Age
          </label>
          <input
            name="age"
            id="age-controlled"
            type="number"
            className="form-input"
          />
          <ErrorMessage field="age" />
        </div>
      </div>
      <div>
        <label htmlFor="email-controlled" className="form-label">
          Email
        </label>
        <input
          name="email"
          id="email-controlled"
          type="email"
          className="form-input"
        />
        <ErrorMessage field="email" />
      </div>

      <div className="flex gap-3">
        <div className="w-1/2">
          <label htmlFor="password-controlled" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password-controlled"
            type="password"
            className="form-input"
          />
          <PasswordStrength password={password} />
          <ErrorMessage field="password" />
        </div>
        <div className="w-1/2">
          <label htmlFor="passwordConfirm-controlled" className="form-label">
            Confirm Password
          </label>
          <input
            name="passwordConfirm"
            id="passwordConfirm-controlled"
            type="password"
            className="form-input"
          />
          <ErrorMessage field="passwordConfirm" />
        </div>
      </div>

      <div>
        <label className="form-label">Gender</label>
        <div className="flex gap-4">
          <label>
            <input type="radio" value="male" name="gender" /> Male
          </label>
          <label>
            <input type="radio" value="female" name="gender" /> Female
          </label>
          <label>
            <input type="radio" value="other" name="gender" /> Other
          </label>
        </div>
        <ErrorMessage field="gender" />
      </div>

      <div>
        <label htmlFor="country-controlled" className="form-label">
          Country
        </label>
        <select
          id="country-controlled"
          defaultValue=""
          name="country"
          className="form-input"
        >
          <option value="" disabled>
            Select a country
          </option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <ErrorMessage field="country" />
      </div>

      <div>
        <label htmlFor="picture-controlled" className="form-label">
          Profile Picture
        </label>
        <input
          name="picture"
          id="picture-controlled"
          type="file"
          accept="image/png, image/jpeg"
          className="w-full text-sm hover:text-gray-500 cursor-pointer"
        />
        <ErrorMessage field="picture" />
      </div>

      <div>
        <label htmlFor="acceptTerms-controlled" className="flex items-center">
          <input
            name="acceptTerms"
            id="acceptTerms-controlled"
            type="checkbox"
            className="cursor-pointer"
          />
          <span className="ml-1 text-sm hover:text-gray-500 cursor-pointer">
            Accept Terms and Conditions
          </span>
        </label>
        <ErrorMessage field="acceptTerms" />
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button type="submit" className="button">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default UncontrolledForm;
