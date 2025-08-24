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
          <label htmlFor="name-uncontrolled" className="form-label">
            Name
          </label>
          <input
            name="name"
            id="name-uncontrolled"
            className="form-input"
            defaultValue=""
            autoFocus
          />
          <ErrorMessage field="name" />
        </div>
        <div className="w-1/5">
          <label htmlFor="age-uncontrolled" className="form-label">
            Age
          </label>
          <input
            name="age"
            id="age-uncontrolled"
            type="number"
            className="form-input"
            defaultValue={0}
          />
          <ErrorMessage field="age" />
        </div>
      </div>
      <div>
        <label htmlFor="email-uncontrolled" className="form-label">
          Email
        </label>
        <input
          name="email"
          id="email-uncontrolled"
          type="email"
          className="form-input"
          defaultValue=""
        />
        <ErrorMessage field="email" />
      </div>

      <div className="flex gap-3">
        <div className="w-1/2">
          <label htmlFor="password-uncontrolled" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password-uncontrolled"
            type="password"
            className="form-input"
            defaultValue=""
          />
          <PasswordStrength password={password} />
          <ErrorMessage field="password" />
        </div>
        <div className="w-1/2">
          <label htmlFor="passwordConfirm-uncontrolled" className="form-label">
            Confirm Password
          </label>
          <input
            name="passwordConfirm"
            id="passwordConfirm-uncontrolled"
            type="password"
            className="form-input"
            defaultValue=""
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
        <label htmlFor="country-uncontrolled" className="form-label">
          Country
        </label>
        <input
          name="country"
          id="country-uncontrolled"
          list="country-list"
          className="form-input"
          placeholder="Type to search..."
        />
        <datalist id="country-list">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        <ErrorMessage field="country" />
      </div>

      <div>
        <label htmlFor="picture-uncontrolled" className="form-label">
          Profile Picture
        </label>
        <input
          name="picture"
          id="picture-uncontrolled"
          type="file"
          accept="image/png, image/jpeg"
          className="w-full text-sm hover:text-gray-500 cursor-pointer"
        />
        <ErrorMessage field="picture" />
      </div>

      <div>
        <label htmlFor="acceptTerms-uncontrolled" className="flex items-center">
          <input
            name="acceptTerms"
            id="acceptTerms-uncontrolled"
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
