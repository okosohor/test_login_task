import './LoginForm.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const formValidator = () => {
    setError('');

    if(!login) {
      setError('Please enter name');
    } else if (login.length <= 1) {
      setError('Name is too short');
    } else  if (login.length > 150) {
      setError('Name is too long');
    } else if (!password) {
      setError('Please enter password');
    } else if (password.length <= 1) {
      setError('Password is too short');
    } else  if (password.length > 128) {
      setError('Password is too long');
    } ;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    formValidator();

    if((!error || error ==='Wrong name or password') && login && password) {

      const user = {
        username: login,
        password: password,
      };

      fetch('https://technical-task-api.icapgroupgmbh.com/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
      })
        .then(res => {
          if (!res.ok) {
            setError('Wrong name or password');
          } else {
            console.log(res);
            navigate('/table');
          }
        });
    };
  };


  return (
    <form className="login-form" onSubmit={event => handleSubmit(event)}>
      <h1 className="login-form__title">Login</h1>
      <p className="login-form__error">{error}</p>
      <input 
        className="login-form__input" 
        type="text" 
        placeholder="Name"
        value={login}
        onChange={event => setLogin(event.target.value)}
      />
      <input 
        className="login-form__input" 
        type="password" 
        placeholder="Password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
      <button 
        className="login-form__button" 
        type="submit"
      >
        Sign in
      </button>
    </form>
  );
};
