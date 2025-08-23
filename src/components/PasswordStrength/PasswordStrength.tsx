import { useState, useEffect, type FC } from 'react';

interface Props {
  password: string;
}

const PasswordStrength: FC<Props> = ({ password = '' }) => {
  const [strength, setStrength] = useState(0);

  const checks = {
    isLongEnough: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  useEffect(() => {
    let score = 0;
    if (checks.hasNumber) {
      score++;
    }
    if (checks.hasUpperCase) {
      score++;
    }
    if (checks.hasLowerCase) {
      score++;
    }
    if (checks.hasSpecialChar) {
      score++;
    }
    if (checks.isLongEnough) {
      score++;
    }
    setStrength(score);
  }, [
    password,
    checks.hasNumber,
    checks.hasUpperCase,
    checks.hasLowerCase,
    checks.hasSpecialChar,
    checks.isLongEnough,
  ]);

  const getStrengthColor = () => {
    switch (strength) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-orange-500';
      case 3:
        return 'bg-yellow-500';
      case 4:
      case 5:
        return 'bg-green-500';
    }
  };

  return (
    <div className="pt-1">
      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-200 ${getStrengthColor()}`}
          style={{ width: `${(strength / 5) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PasswordStrength;
