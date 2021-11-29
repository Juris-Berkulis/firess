import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { allAppComponentsWithPageTitle } from '../../data/consts';
import { functionsForMocks } from '../../helper/forMocks/functions';
import { SignupUI } from '../../ui_components/SignupUI';

export const Signup = () => {
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
      await functionsForMocks.registration(email, password);
      push(allAppComponentsWithPageTitle.profile.path);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <SignupUI handleSubmit={handleSubmit} handleEmailChange={handleEmailChange} handlePassChange={handlePassChange} error={error} email={email} password={password} allAppComponentsWithPageTitle={allAppComponentsWithPageTitle}></SignupUI>
  )
};
