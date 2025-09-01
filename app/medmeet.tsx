import { useRouter } from 'expo-router';
import React from 'react';
import MedMeetPage from '../components/pages_tabs/medmeet';

export default function MedMeetScreen() {
  const router = useRouter();

  return <MedMeetPage />;
} 