import { useEffect, useState } from 'react';
import { ValidationError } from 'yup';

import userSchema from '../../utils/userSchema';
import createPasswordLabel from '../../utils/createPasswordLabel';

const PasswordStrengthMeter = ({
  password,
}: {
  password: string | undefined;
}) => {
  const [passwordProgress, setPasswordProgress] = useState(0);

  useEffect(() => {
    if (!password) return setPasswordProgress(0);

    try {
      userSchema.validateSync({ password }, { abortEarly: false });
    } catch (err) {
      if (err instanceof ValidationError) {
        let progressValue = 4;
        err.inner.forEach((error) => {
          if (error.path === 'password') {
            progressValue--;
          }
        });
        setPasswordProgress(progressValue);
      }
    }
  }, [password]);

  return (
    <div className="password-strength-meter">
      <progress
        className={`password-strength-meter-progress strength-${createPasswordLabel(
          passwordProgress
        )}`}
        value={passwordProgress}
        max="4"
      />
      <br />
      <label className="password-strength-meter-label">
        <strong>Password strength:</strong>{' '}
        {createPasswordLabel(passwordProgress)}
      </label>
    </div>
  );
};

export default PasswordStrengthMeter;
