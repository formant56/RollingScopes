import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setFormValues } from './utils/uncontrolledFormSlice';
import styles from './FormStyle.module.css';
import { useNavigate } from 'react-router-dom';
import { schema } from './utils/schema';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import { FormDataType, ErrorsType } from './utils/types';
import * as yup from 'yup';

const UncontrolledForm: React.FC = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const atcRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filteredSuggestions, setFilteredSuggestions] = React.useState([]);
  const suggestions = useSelector((state: RootState) => state.countries);

  const [errors, setErrors] = React.useState<ErrorsType>({});

  const handleInputChange = () => {
    const inputValue = countryRef.current?.value;
    if (inputValue) {
      const filtered = suggestions.countries.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (countryRef.current) {
      countryRef.current.value = suggestion;
      setFilteredSuggestions([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let formData: FormDataType = {
      name: nameRef.current?.value || '',
      age: ageRef.current?.value || '',
      email: emailRef.current?.value || '',
      gender: genderRef.current?.value || '',
      atc: atcRef.current?.checked || false,
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      country: countryRef.current?.value || '',
      img: imgRef.current?.files || null,
    };

    try {
      await schema.validate(formData, { abortEarly: false });
      let fileAsBase64 = '';
      if (formData.img && formData.img[0]) {
        fileAsBase64 = (await toBase64(formData.img[0])) as string;
      }
      setErrors({});

      formData = { ...formData, img: fileAsBase64 };
      dispatch(setFormValues(formData));
      navigate('/');
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors = err.inner.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        setErrors(newErrors);

        return;
      }
    }
  };

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h1>UncontrolledForm</h1>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        Return to homepage
      </button>
      <div className={styles.formGroup}>
        <label className={styles.label}>Name:</label>
        <input type="text" ref={nameRef} className={styles.input} />
        <div className={styles.error}>{errors.name}</div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Age:</label>
        <input type="text" ref={ageRef} className={styles.input} />
        <div className={styles.error}>{errors.age}</div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Email:</label>
        <input type="text" ref={emailRef} className={styles.input} />
        <div className={styles.error}>{errors.email}</div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Gender:</label>
        <select ref={genderRef} className={styles.input}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <div className={styles.error}>{errors.gender}</div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Accept Terms and Conditions:</label>
        <input type="checkbox" ref={atcRef} className={styles.input} />
        <div className={styles.error}>{errors.atc}</div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Password:</label>
        <input type="password" ref={passwordRef} className={styles.input} />
        <div className={styles.error}>{errors.password}</div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Confirm Password:</label>
        <input
          type="password"
          ref={confirmPasswordRef}
          className={styles.input}
        />
        <div className={styles.error}>{errors.confirmPassword}</div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Choose a country:</label>
        <input
          type="text"
          ref={countryRef}
          className={styles.input}
          onChange={handleInputChange}
        />
        <ul>
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
        <div className={styles.error}>{errors.country}</div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Upload Image:</label>
        <input type="file" ref={imgRef} className={styles.input} />
        <div className={styles.error}>{errors.img}</div>
      </div>

      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default UncontrolledForm;
