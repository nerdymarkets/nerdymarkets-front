import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
const PasswordInput = ({
  id = 'password',
  name = 'password',
  value,
  onChange,
  required = true,
  label,
  className,
  labelClassName,
  placeholder,
  invalid,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormGroup>
      <Label for="password" className={`${labelClassName}`}>
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          invalid={!!invalid}
          className={`${className}`}
        />
        <p
          onClick={toggleShowPassword}
          className="absolute inset-y-0 right-0 pr-5 flex items-center cursor-pointer"
        >
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="w-4 text-gray-600"
          />
        </p>
      </div>
    </FormGroup>
  );
};
PasswordInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  invalid: PropTypes.bool,
  placeholder: PropTypes.string,
  labelClassName: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};
export default PasswordInput;
