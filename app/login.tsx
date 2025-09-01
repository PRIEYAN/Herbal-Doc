import { useRouter } from 'expo-router';
import React from 'react';
import LoginPage from '../components/pages_tabs/login';

export default function LoginScreen() {
  const router = useRouter();

  const handleGoToSignup = () => {
    router.push('/signup');
  };

  const handleSuccessfulAuth = () => {
    router.push('/homepage');
  };

  return <LoginPage onGoToSignup={handleGoToSignup} onSuccessfulAuth={handleSuccessfulAuth} />;
} 