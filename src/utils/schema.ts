import * as yup from 'yup';

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const schema = yup.object().shape({
  name: yup.string().required('Name is a required field'),
  age: yup.number().required('Age is a required field').positive().integer(),
  email: yup.string().required('Email is a required field').email(),
  gender: yup
    .string()
    .oneOf(['Male', 'Female', 'Other'], ' You must choose a gender'),
  atc: yup.boolean().oneOf([true], ' You must accept Terms and Conditions'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      passwordRegex,
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  country: yup.string().required('You must choose a country'),
  img: yup
    .mixed()
    .required('Image is required')
    .test('size', 'The image size should not be more than "300kB"', (files) => {
      if (!files || !files[0]) return false;

      return files[0].size <= 307200;
    })
    .test('type', 'The image must be in "PNG" or "JPEG" format', (files) => {
      if (!files || !files[0]) return false;

      return files[0].type === 'image/jpeg' || files[0].type === 'image/png';
    }),
});

export type FormData = yup.InferType<typeof schema>;
