import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const slogans = [
  'Home Remedies, Always Easy',
  'Nature\'s Cure, Your Home',
  'Easy Herbal Healing',
  'Simple Home Health',
  'Remedies Made Simple',
  'Heal Naturally, Easily',
  'Herbs At Your Home',
  'Quick Home Cure',
  'Wellness Made Easy',
  'Easy Natural Care',
  'Herbal Care, Simplified',
  'Home Healing, Naturally',
  'Nature\'s Remedies, Simple',
  'Simple Herbal Fix',
  'Health, Made At Home',
  'Easy Home Remedies',
  'Herbs For Everyday',
  'Quick Natural Healing',
  'Home Health Solutions',
  'Nature\'s Cure, Simplified'
];

interface StartedPageProps {
  onGetStarted: () => void;
}

export default function StartedPage({ onGetStarted }: StartedPageProps) {
  const [currentSlogan, setCurrentSlogan] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * slogans.length);
    setCurrentSlogan(slogans[randomIndex]);
  }, []);

  const handleGetStarted = () => {
    onGetStarted();
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/images/Herbal-Doc.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.sloganContainer}>
        <Text style={styles.slogan}>{currentSlogan}</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sloganContainer: {
    marginBottom: 50,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  slogan: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#2C3E50',
    lineHeight: 30,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#20AB7D',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
}); 