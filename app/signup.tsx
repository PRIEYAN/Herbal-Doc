import { useRouter } from 'expo-router';
import React from 'react';
import SignupPage from '../components/pages_tabs/signup';

export default function SignupScreen() {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.back();
  };

  const handleSuccessfulAuth = () => {
    router.push('/homepage');
  };

  return <SignupPage onGoToLogin={handleGoToLogin} onSuccessfulAuth={handleSuccessfulAuth} />;
} 