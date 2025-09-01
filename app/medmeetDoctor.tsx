import { useRouter } from 'expo-router';
import React from 'react';
import MedMeetDoctorPage from '../components/pages_tabs/medmeetDoctor';

export default function MedMeetDoctorScreen() {
  const router = useRouter();

  return <MedMeetDoctorPage />;
} 