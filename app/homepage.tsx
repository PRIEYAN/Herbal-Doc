import { useRouter } from 'expo-router';
import React from 'react';
import HomePage from '../components/pages_tabs/homepage';

export default function HomeScreen() {
  const router = useRouter();

  const handleGoToMedMeet = () => {
    router.push('/medmeet');
  };

  const handleGoToHebDocAi = () => {
    router.push('/hebDocAi');
  };

  const handleGoToHerbalShop = () => {
    router.push('/herbalShop');
  };

  return <HomePage onGoToMedMeet={handleGoToMedMeet} onGoToHebDocAi={handleGoToHebDocAi} onGoToHerbalShop={handleGoToHerbalShop} />;
} 