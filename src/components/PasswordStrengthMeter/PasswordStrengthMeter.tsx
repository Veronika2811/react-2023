import { useEffect, useState } from 'react';
import { ValidationError } from 'yup';

import userSchema from '../../utils/userSchema';
import createPasswordLabel from '../../utils/createPasswordLabel';

const PasswordStrengthMeter = ({
  password,
  passwordProgressRef,
}: {
  password?: string;
  passwordProgressRef?: React.RefObject<HTMLProgressElement>;
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

        if (!passwordProgressRef) {
          setPasswordProgress(progressValue);
        }
      }
    }
  }, [password, passwordProgressRef]);

  return (
    <div className="password-strength-meter">
      <progress
        className={`password-strength-meter-progress strength-${createPasswordLabel(
          !passwordProgressRef
            ? passwordProgress
            : passwordProgressRef?.current?.value
        )}`}
        value={passwordProgress}
        max="4"
        defaultValue="0"
        ref={passwordProgressRef}
      />
      <br />
      <label className="password-strength-meter-label">
        <strong>Password strength:</strong>{' '}
        {createPasswordLabel(
          !passwordProgressRef
            ? passwordProgress
            : passwordProgressRef?.current?.value
        )}
      </label>
    </div>
  );
};

export default PasswordStrengthMeter;
