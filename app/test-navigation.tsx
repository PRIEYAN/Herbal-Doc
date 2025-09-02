import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TestNavigationPage() {
  const router = useRouter();
  
  const testNavigation = () => {
    console.log('Testing navigation to ingredient search');
    router.push({
      pathname: '/ingredient',
      params: { ingredient: 'honey' }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Navigation</Text>
      <TouchableOpacity style={styles.button} onPress={testNavigation}>
        <Text style={styles.buttonText}>Test Navigate to Ingredient Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2C3E50',
  },
  button: {
    backgroundColor: '#20AB7D',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#7F8C8D',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 