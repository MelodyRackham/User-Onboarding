import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const NewUserForm = ({ values, touched, errors, status }) => {
  const [newUser, SetNewUser] = useState([]);

  useEffect(() => {
    status && SetNewUser(newUser => [...newUser, status]);
  }, [status]);

  return (
    <div className='user-form'>
      <Form>
        <Field className='name' type='text' name='name' placeholder='name' />
        {touched.name && errors.name && <p className='error'>{errors.name}</p>}
        <br />
        <Field className='email' type='text' name='email' placeholder='email' />
        {touched.email && errors.email && <p className='error'>{errors.email}</p>}
        <br />
        <Field className='password' type='password' name='password' placeholder='password' />
        {touched.password && errors.password && <p className='error'>{errors.password}</p>}
        <br />
        <label>
          <span>I have read and agree to the Term of Service.</span>
          <Field type='checkbox' name='terms' checked={values.terms} />
          {touched.terms && errors.terms && <p>{errors.terms}</p>}
        </label>
        <br />
        <button type='submit'> Submit! </button>
        <br />
        <input type='text' className='input' placeholder='Search...' />
      </Form>
      {newUser.map(user => (
        <ul key={user.id}>
          <li> Name: {user.name} </li>
          <li> Email: {user.email} </li>
          <li> Password: {user.password} </li>
          <li> Agrees to Terms: {user.terms} </li>
        </ul>
      ))}
    </div>
  );
};

const FormikNewUserForm = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || '',
      email: email || '',
      password: password || ' ',
      terms: terms || false,
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required('You must enter your name to continue.'),
    email: Yup.string()
      .email('Invalid email!')
      .required('Please enter your email to continue.'),
    password: Yup.string()
      .min(8, 'Your password must be at least 8 characters!')
      .required('Password is required.'),
  }),
  handleSubmit(values, { setStatus }) {
    axios
      .post('https://reqres.in/api/users/', values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  },
})(NewUserForm);
export default FormikNewUserForm;
console.log('This is the HOC', FormikNewUserForm);
