import { useRouter } from 'expo-router';
import React from 'react';
import StartedPage from '../components/pages_tabs/started';

export default function StartedScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');
  };

  return <StartedPage onGetStarted={handleGetStarted} />;
} 