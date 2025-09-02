import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IngredientHighlighter from './IngredientHighlighter';

export default function TestIngredientHighlighter() {
  const testText = "Here are some natural remedies for fever: 1. Drink ginger tea with honey 2. Take turmeric with warm milk 3. Consume lemon and honey mixture";
  
  const handleIngredientPress = (ingredient: string) => {
    console.log('Ingredient pressed:', ingredient);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Ingredient Highlighter</Text>
      <View style={styles.testContainer}>
        <IngredientHighlighter
          text={testText}
          onIngredientPress={handleIngredientPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2C3E50',
  },
  testContainer: {
    backgroundColor: '#20AB7D',
    padding: 15,
    borderRadius: 10,
  },
}); 