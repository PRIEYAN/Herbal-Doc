import { useRouter } from 'expo-router';
import React from 'react';
import HebDocAiPage from '../components/pages_tabs/HebDocAi';

export default function HebDocAiScreen() {
  const router = useRouter();

  return <HebDocAiPage />;
} 