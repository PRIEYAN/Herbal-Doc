import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';

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
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  sloganContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  slogan: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.light.text,
    lineHeight: 32,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#406231',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
}); 