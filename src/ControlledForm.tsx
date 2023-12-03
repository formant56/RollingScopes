import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './FormStyle.module.css';
import { useDispatch } from 'react-redux';
import { setControlledFormValues } from './utils/controlledFormSlice';
import { useNavigate } from 'react-router-dom';
import { schema, FormData } from './utils/schema';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import { evaluatePasswordStrength } from './utils/passwordStrength';

const ControlledForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const suggestions = useSelector((state: RootState) => state.countries);
  const [filteredSuggestions, setFilteredSuggestions] = React.useState([]);
  const [passwordStrength, setPasswordStrength] = React.useState('');

  const countryValue = watch('country');

  React.useEffect(() => {
    if (countryValue) {
      const filtered = suggestions.countries.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(countryValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [countryValue, suggestions.countries]);

  const handleSuggestionClick = (suggestion: string) => {
    setValue('country', suggestion);
    setFilteredSuggestions([]);
  };

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'password') {
        setPasswordStrength(evaluatePasswordStrength(value.password || ''));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const fileAsBase64 = data.img[0] ? await toBase64(data.img[0]) : '';
    data = { ...data, img: fileAsBase64 };
    dispatch(setControlledFormValues(data));
    navigate('/');
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <h1>ControlledForm</h1>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        Return to homepage
      </button>
      <div className={styles.formGroup}>
        <label className={styles.label}>Name:</label>
        <input className={styles.input} {...register('name')} />
        <div className={styles.error}>{errors.name?.message}</div>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Age:</label>
        <input className={styles.input} {...register('age')} />
        <div className={styles.error}>{errors.age?.message}</div>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Email:</label>
        <input className={styles.input} {...register('email')} />
        <div className={styles.error}>{errors.email?.message}</div>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Gender:</label>
        <select className={styles.input} {...register('gender')}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <div className={styles.error}>{errors.gender?.message}</div>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Accept Terms and Conditions:</label>
        <input type="checkbox" className={styles.input} {...register('atc')} />
        <div className={styles.error}>{errors.atc?.message}</div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Password:</label>
        <input
          type="password"
          className={styles.input}
          {...register('password')}
        />
        <div>Password Strength: {passwordStrength}</div>
        <div className={styles.error}>{errors.password?.message}</div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Confirm Password:</label>
        <input
          type="password"
          className={styles.input}
          {...register('confirmPassword')}
        />
        <div className={styles.error}>{errors.confirmPassword?.message}</div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Choose a country:</label>
        <input className={styles.input} {...register('country')} />
        <ul>
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
        <div className={styles.error}>{errors.confirmPassword?.message}</div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Upload Image:</label>
        <input type="file" className={styles.input} {...register('img')} />
      </div>
      <div className={styles.error}>{errors.img?.message}</div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ControlledForm;
