import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IngredientHighlighterProps {
  text: string;
  onIngredientPress: (ingredient: string) => void;
}

// Common herbal ingredients and remedies that should be clickable
const INGREDIENT_KEYWORDS = [
  'honey', 'ginger', 'turmeric', 'lemon', 'garlic', 'onion', 'pepper',
  'cinnamon', 'clove', 'cardamom', 'cumin', 'coriander', 'basil',
  'mint', 'chamomile', 'lavender', 'rosemary', 'thyme', 'sage',
  'oregano', 'parsley', 'dill', 'fennel', 'anise', 'star anise',
  'nutmeg', 'bay leaf', 'vanilla', 'cocoa', 'chocolate', 'coconut',
  'almond', 'walnut', 'cashew', 'pistachio', 'sesame', 'sunflower',
  'pumpkin', 'flax', 'chia', 'quinoa', 'rice', 'oats', 'barley',
  'wheat', 'corn', 'potato', 'sweet potato', 'carrot', 'beetroot',
  'spinach', 'kale', 'lettuce', 'cabbage', 'broccoli', 'cauliflower',
  'tomato', 'cucumber', 'bell pepper', 'jalapeño', 'chili', 'paprika',
  'apple', 'banana', 'orange', 'grape', 'strawberry', 'blueberry',
  'raspberry', 'blackberry', 'cherry', 'peach', 'plum', 'apricot',
  'mango', 'pineapple', 'watermelon', 'cantaloupe', 'honeydew',
  'tea', 'coffee', 'milk', 'yogurt', 'butter', 'cheese', 'egg',
  'fish', 'chicken', 'beef', 'pork', 'lamb', 'turkey', 'duck',
  'mushroom', 'onion', 'shallot', 'leek', 'scallion', 'chive',
  'asparagus', 'artichoke', 'eggplant', 'zucchini', 'squash',
  'pumpkin', 'butternut', 'acorn', 'spaghetti squash',
  'olive', 'avocado', 'coconut oil', 'olive oil', 'sesame oil',
  'vinegar', 'soy sauce', 'fish sauce', 'worcestershire',
  'mustard', 'ketchup', 'mayonnaise', 'sour cream', 'cream',
  'sugar', 'salt', 'black pepper', 'white pepper', 'red pepper',
  'cayenne', 'chili powder', 'curry powder', 'garam masala',
  'tandoori', 'paprika', 'oregano', 'basil', 'thyme', 'rosemary',
  'sage', 'marjoram', 'tarragon', 'dill', 'fennel', 'caraway',
  'celery seed', 'poppy seed', 'sesame seed', 'sunflower seed',
  'pumpkin seed', 'flax seed', 'chia seed', 'hemp seed',
  'almond milk', 'soy milk', 'oat milk', 'coconut milk',
  'rice milk', 'cashew milk', 'macadamia milk', 'hazelnut milk',
  'walnut milk', 'pistachio milk', 'quinoa milk', 'hemp milk',
  'flax milk', 'pea milk', 'pea protein', 'whey protein',
  'casein protein', 'collagen', 'gelatin', 'agar', 'pectin',
  'xanthan gum', 'guar gum', 'locust bean gum', 'carrageenan',
  'lecithin', 'bromelain', 'papain', 'protease', 'amylase',
  'lipase', 'cellulase', 'lactase', 'sucrase', 'maltase',
  'probiotic', 'prebiotic', 'fiber', 'pectin', 'inulin',
  'resistant starch', 'beta glucan', 'psyllium', 'acacia',
  'guar gum', 'locust bean gum', 'carrageenan', 'agar',
  'pectin', 'gelatin', 'collagen', 'whey', 'casein',
  'soy protein', 'pea protein', 'rice protein', 'hemp protein',
  'pumpkin protein', 'sunflower protein', 'sacha inchi protein',
  'spirulina', 'chlorella', 'chlorella vulgaris', 'spirulina platensis',
  'blue green algae', 'kelp', 'seaweed', 'nori', 'wakame',
  'kombu', 'dulse', 'irish moss', 'bladderwrack', 'rockweed',
  'sea lettuce', 'sea grapes', 'sea asparagus', 'sea beans',
  'sea purslane', 'sea spinach', 'sea kale', 'sea rocket',
  'sea mustard', 'sea radish', 'sea beet', 'sea carrot',
  'sea parsnip', 'sea celery', 'sea fennel', 'sea parsley',
  'sea coriander', 'sea dill', 'sea chervil', 'sea lovage',
  'sea angelica', 'sea masterwort', 'sea hogweed', 'sea cow parsnip',
  'sea water dropwort', 'sea water hemlock', 'sea water celery',
  'sea water parsley', 'sea water dill', 'sea water fennel',
  'sea water coriander', 'sea water chervil', 'sea water lovage',
  'sea water angelica', 'sea water masterwort', 'sea water hogweed',
  'sea water cow parsnip', 'sea water dropwort', 'sea water hemlock',
  'sea water celery', 'sea water parsley', 'sea water dill',
  'sea water fennel', 'sea water coriander', 'sea water chervil',
  'sea water lovage', 'sea water angelica', 'sea water masterwort',
  'sea water hogweed', 'sea water cow parsnip', 'sea water dropwort',
  'sea water hemlock', 'sea water celery', 'sea water parsley',
  'sea water dill', 'sea water fennel', 'sea water coriander',
  'sea water chervil', 'sea water lovage', 'sea water angelica',
  'sea water masterwort', 'sea water hogweed', 'sea water cow parsnip'
];

export default function IngredientHighlighter({ text, onIngredientPress }: IngredientHighlighterProps) {
  const highlightIngredients = (text: string) => {
    // Split text into words while preserving punctuation and spaces
    const words = text.split(/(\s+|[.,!?;:])/);
    
    return words.map((word, index) => {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
      
      // More precise matching - only match exact words, not partial matches
      const isIngredient = INGREDIENT_KEYWORDS.some(keyword => {
        const keywordLower = keyword.toLowerCase();
        
        // For single word keywords, do exact match
        if (!keyword.includes(' ')) {
          return cleanWord === keywordLower;
        }
        
        // For multi-word keywords, check if the current word is part of it
        // but be more careful about partial matches
        const keywordWords = keywordLower.split(' ');
        return keywordWords.includes(cleanWord) && cleanWord.length > 2;
      });
      
      if (isIngredient && cleanWord.length > 2) {
        return (
          <TouchableOpacity
            key={index}
            style={styles.ingredientChip}
            onPress={() => {
              console.log('Ingredient pressed:', word.trim());
              onIngredientPress(word.trim());
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.ingredientText}>{word}</Text>
          </TouchableOpacity>
        );
      }
      
      return <Text key={index} style={styles.regularText}>{word}</Text>;
    });
  };

  return (
    <View style={styles.container}>
      {highlightIngredients(text)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  ingredientChip: {
    backgroundColor: '#E8F5E8',
    borderWidth: 1,
    borderColor: '#20AB7D',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginHorizontal: 1,
    marginVertical: 1,
  },
  ingredientText: {
    color: '#20AB7D',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  regularText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
  },
}); 