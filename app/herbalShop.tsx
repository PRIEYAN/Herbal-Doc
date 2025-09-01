import { useRouter } from 'expo-router';
import React from 'react';
import HerbalShopPage from '../components/pages_tabs/herbalShop';

export default function HerbalShopScreen() {
  const router = useRouter();

  return <HerbalShopPage />;
} 