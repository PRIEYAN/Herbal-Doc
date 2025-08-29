import React, { useState } from 'react';
import HomePage from '../components/pages_tabs/homepage';
import LoginPage from '../components/pages_tabs/login';
import MedMeetPage from '../components/pages_tabs/medmeet';
import SignupPage from '../components/pages_tabs/signup';
import StartedPage from '../components/pages_tabs/started';

export default function Index() {
  const [currentPage, setCurrentPage] = useState<'started' | 'login' | 'signup' | 'homepage' | 'medmeet'>('started');

  const handleGetStarted = () => {
    setCurrentPage('login');
  };

  const handleGoToSignup = () => {
    setCurrentPage('signup');
  };

  const handleGoToLogin = () => {
    setCurrentPage('login');
  };

  const handleSuccessfulAuth = () => {
    setCurrentPage('homepage');
  };

  const handleGoToMedMeet = () => {
    setCurrentPage('medmeet');
  };

  if (currentPage === 'login') {
    return <LoginPage onGoToSignup={handleGoToSignup} onSuccessfulAuth={handleSuccessfulAuth} />;
  }

  if (currentPage === 'signup') {
    return <SignupPage onGoToLogin={handleGoToLogin} onSuccessfulAuth={handleSuccessfulAuth} />;
  }

  if (currentPage === 'homepage') {
    return <HomePage onGoToMedMeet={handleGoToMedMeet} />;
  }

  if (currentPage === 'medmeet') {
    return <MedMeetPage />;
  }

  return <StartedPage onGetStarted={handleGetStarted} />;
}
