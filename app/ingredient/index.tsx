import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import IngredientSearchScreen from '../../components/IngredientSearchScreen';

export default function IngredientSearchPage() {
  const params = useLocalSearchParams<{ ingredient: string }>();
  const ingredient = params.ingredient || 'ingredient';
  
  console.log('IngredientSearchPage received params:', params);
  console.log('Ingredient:', ingredient);
  
  return (
    <IngredientSearchScreen 
      ingredient={ingredient} 
    />
  );
} 