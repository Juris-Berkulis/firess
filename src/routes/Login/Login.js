import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { LoginUI } from '../../ui_components/LoginUI';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {push} = useHistory();

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await auth.signInWithEmailAndPassword(email, password);
      push('/profile');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <LoginUI handleSubmit={handleSubmit} handleEmailChange={handleEmailChange} handlePassChange={handlePassChange} error={error} email={email} password={password}></LoginUI>
  )
};
