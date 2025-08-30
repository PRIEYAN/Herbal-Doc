import React, { useState } from 'react';
import HebDocAiPage from '../components/pages_tabs/HebDocAi';
import HomePage from '../components/pages_tabs/homepage';
import LoginPage from '../components/pages_tabs/login';
import MedMeetPage from '../components/pages_tabs/medmeet';
import SignupPage from '../components/pages_tabs/signup';
import StartedPage from '../components/pages_tabs/started';

export default function Index() {
  const [currentPage, setCurrentPage] = useState<'started' | 'login' | 'signup' | 'homepage' | 'medmeet' | 'hebDocAi'>('started');

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

  const handleGoToHebDocAi = () => {
    setCurrentPage('hebDocAi');
  };

  if (currentPage === 'login') {
    return <LoginPage onGoToSignup={handleGoToSignup} onSuccessfulAuth={handleSuccessfulAuth} />;
  }

  if (currentPage === 'signup') {
    return <SignupPage onGoToLogin={handleGoToLogin} onSuccessfulAuth={handleSuccessfulAuth} />;
  }

  if (currentPage === 'homepage') {
    return <HomePage onGoToMedMeet={handleGoToMedMeet} onGoToHebDocAi={handleGoToHebDocAi} />;
  }

  if (currentPage === 'medmeet') {
    return <MedMeetPage />;
  }

  if (currentPage === 'hebDocAi') {
    return <HebDocAiPage />;
  }

  return <StartedPage onGetStarted={handleGetStarted} />;
}
