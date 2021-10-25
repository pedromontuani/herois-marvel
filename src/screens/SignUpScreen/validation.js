import * as yup from 'yup';

export default yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .test(
        'passwords-match',
        'Passwords must match',
        (value, context) => context.parent.password === value
      )
  })
  .required();
