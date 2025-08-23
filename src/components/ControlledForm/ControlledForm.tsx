import React from 'react';
import Button from '../Button/Button';

interface IProps {
  onSubmit: () => void;
}

const ControlledForm: React.FC<IProps> = ({ onSubmit }) => {
  return (
    <form className="space-y-4">
      <div className="flex gap-3">
        <div className="w-4/5">
          <label htmlFor="name-controlled" className="form-label">
            Name
          </label>
          <input id="name-controlled" className="form-input" />
        </div>
        <div className="w-1/5">
          <label htmlFor="age-controlled" className="form-label">
            Age
          </label>
          <input id="age-controlled" type="number" className="form-input" />
        </div>
      </div>
      <div>
        <label htmlFor="email-controlled" className="form-label">
          Email
        </label>
        <input id="email-controlled" type="email" className="form-input" />
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
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="passwordConfirm-controlled" className="form-label">
            Confirm Password
          </label>
          <input
            id="passwordConfirm-controlled"
            type="password"
            className="form-input"
          />
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
      </div>

      <div>
        <label htmlFor="country-controlled" className="form-label">
          Country
        </label>
        <select id="country-controlled" className="form-input">
          <option disabled>Select a country</option>
        </select>
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
        />
      </div>

      <div>
        <label htmlFor="acceptTerms-controlled" className="flex items-center">
          <input
            id="acceptTerms-controlled"
            type="checkbox"
            className="cursor-pointer"
          />
          <span className="ml-1 text-sm hover:text-gray-500 cursor-pointer">
            Accept Terms and Conditions
          </span>
        </label>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button type="submit" className="button" onSubmit={onSubmit}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ControlledForm;
