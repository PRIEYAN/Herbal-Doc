import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import api from '../../constants/api';

interface HomePageProps {
  onGoToProfile?: () => void;
  onGoToMedMeet?: () => void;
  onGoToHebDocAi?: () => void;
  onGoToHerbalShop?: () => void;
}

export default function HomePage({ onGoToProfile, onGoToMedMeet, onGoToHebDocAi, onGoToHerbalShop }: HomePageProps) {
  const router = useRouter();
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const storedUserData = await AsyncStorage.getItem('userData');
      
      if (!token) {
        setIsLoading(false);
        Alert.alert('Authentication Required', 'Please log in to continue.', [
          { text: 'OK', onPress: () => router.push('/login') }
        ]);
        return;
      }

      // Parse stored user data
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }

      const response = await api.post('/consumer/auth/jwt', { token });

      if (response.status === 200) {
        setIsTokenValid(true);
        setIsLoading(false);
      } else {
        throw new Error('Token verification failed');
      }
    } catch (error: any) {
      setIsLoading(false);
      
      if (error.response) {
        const { status } = error.response;
        
        if (status === 401) {
          Alert.alert('Session Expired', 'Your session has expired. Please log in again.', [
            { text: 'OK', onPress: () => {
              AsyncStorage.removeItem('authToken');
              AsyncStorage.removeItem('userData');
              router.push('/login');
            }}
          ]);
        } else if (status === 400) {
          Alert.alert('Invalid Token', 'Authentication token is invalid. Please log in again.', [
            { text: 'OK', onPress: () => {
              AsyncStorage.removeItem('authToken');
              AsyncStorage.removeItem('userData');
              router.push('/login');
            }}
          ]);
        } else {
          Alert.alert('Error', 'Failed to verify authentication. Please try again.');
        }
      } else if (error.request) {
        Alert.alert('Network Error', 'Unable to connect to server. Please check your connection.');
      } else {
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    }
  };

  const getGreeting = () => {
    if (!userData || !userData.name) {
      return 'HELLO, USER';
    }
    
    const name = userData.name.split(' ')[0]; // Get first name
    return `HELLO, ${name.toUpperCase()}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleBack = () => {
    router.back();
  };

  const handleMedMeet = () => {
    if (onGoToMedMeet) {
      onGoToMedMeet();
    }
  };

  const handleChatWithAI = () => {
    if (onGoToHebDocAi) {
      onGoToHebDocAi();
    }
  };

  const handleHerbalShop = () => {
    if (onGoToHerbalShop) {
      onGoToHerbalShop();
    }
  };

  const handleBookAppointment = () => {
    // Navigate to appointment booking
  };

  const handleHome = () => {
    // Already on home
  };

  const handleHistory = () => {
    // Navigate to history
  };

  const handleBookmarks = () => {
    // Navigate to bookmarks
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Verifying authentication...</Text>
      </View>
    );
  }

  if (!isTokenValid) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Authentication required...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.timeGreeting}>{getCurrentTime()}</Text>
          <Text style={styles.dateText}>{formatDate()}</Text>
        </View>
        <TouchableOpacity onPress={onGoToProfile}>
          <Image 
            source={require('../../assets/images/profile.jpeg')}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Info Card */}
        

        {/* Featured Card - MedMeet */}
        <TouchableOpacity style={styles.medMeetCard} onPress={handleMedMeet}>
          <View style={styles.medMeetContent}>
            <View style={styles.medMeetLeft}>
              <Image 
                source={require('../../assets/images/doctorlogo.jpg')}
                style={styles.medMeetIcon}
              />
              <View style={styles.medMeetText}>
                <Text style={styles.medMeetTitle}>MEDMEET</Text>
                <Text style={styles.medMeetDescription}>
                  REQUEST DOCTOR MEETINGS IN ADVANCE
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Action Cards */}
        <View style={styles.actionCardsContainer}>
          <TouchableOpacity style={styles.actionCard} onPress={handleChatWithAI}>
            <Image 
              source={require('../../assets/images/chatlogo.png')}
              style={styles.actionCardIcon}
            />
            <Text style={styles.actionCardText}>CHAT WITH HEBDOC-AI</Text>
            
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={handleHerbalShop}>
            <Image 
              source={require('../../assets/images/shopping.jpg')}
              style={styles.actionCardIcon}
            />
            <Text style={styles.actionCardText}>HERBAL SHOP</Text>
          </TouchableOpacity>
        </View>

        {/* Book Doctor Appointment Card */}
        <TouchableOpacity style={styles.medMeetCard} onPress={handleBookAppointment}>
          <View style={styles.medMeetContent}>
            <View style={styles.medMeetLeft}>
              <Image 
                source={require('../../assets/images/appointment.jpg')}
                style={styles.medMeetIcon}
              />
              <View style={styles.medMeetText}>
                <Text style={styles.medMeetTitle}>APPOINTMENT</Text>
                <Text style={styles.medMeetDescription}>
                  BOOK AN APPOINTMENT FOR YOUR DOCTOR
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={handleHome}>
          <Image 
            source={require('../../assets/images/home.png')}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={handleHistory}>
          <Image 
            source={require('../../assets/images/history.png')}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={handleBookmarks}>
          <Image 
            source={require('../../assets/images/save.png')}
            style={styles.navIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    fontSize: 16,
    color: '#6C757D',
    fontWeight: '500',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 14,
    color: '#2C3E50',
  },
  greetingContainer: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 10,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
  },
  timeGreeting: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: -5,
  },
  dateText: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: -5,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#20AB7D',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  userInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  userInfoContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfoText: {
    flex: 1,
  },
  userInfoName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
  },
  userInfoEmail: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: -3,
  },
  userInfoPhone: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: -3,
  },
  medMeetCard: {    
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#20AB7D',
  },
  medMeetContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  medMeetLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  medMeetIcon: {
    width: 56,
    height: 56,
    marginRight: 16,
    borderRadius: 12,
  },
  medMeetText: {
    flex: 1,
  },
  medMeetTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 6,
  },
  medMeetDescription: {
    fontSize: 14,
    color: '#6C757D',
    lineHeight: 20,
  },
  actionCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderTopWidth: 3,
    borderTopColor: '#20AB7D',
  },
  actionCardIcon: {
    width: 44,
    height: 44,
    marginBottom: 12,
    borderRadius: 10,
  },
  actionCardText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
    lineHeight: 18,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    width: 26,
    height: 26,
    tintColor: '#20AB7D',
  },
});