import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View
} from 'react-native';
import api from '../../constants/api';

interface MedMeetPageProps {
  onGoBack?: () => void;
}

interface Doctor {
  sno: number;
  name: string;
  email: string;
  phonenumber: string;
  nmr_number: string;
  hospital: string;
  specialization: string;
  aboutme: string;
  booked: string;
  bookedby: string;
  rating: number;
}

export default function MedMeetPage({ onGoBack }: MedMeetPageProps) {
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const testTokenValidity = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      console.log('Testing token validity...');
      console.log('Token exists:', !!token);
      if (token) {
        console.log('Token length:', token.length);
        console.log('Token preview:', token.substring(0, 50) + '...');
      }
    } catch (error) {
      console.error('Error testing token:', error);
    }
  };

  const testServerConnection = async () => {
    try {
      console.log('Testing server connection...');
      const response = await api.get('/', { timeout: 5000 });
      console.log('Server is running:', response.status);
    } catch (error: any) {
      console.error('Server connection failed:', error.message);
    }
  };

  useEffect(() => {
    testServerConnection();
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      console.log('Fetching doctors...');

      const response = await api.get('/consumer/medmeet/getDoctors', {
        timeout: 10000, // 10 second timeout
      });

      console.log('Response status:', response.status);
      console.log('Response data:', response.data);

      if (response.status === 200) {
        if (response.data && response.data.doctors) {
          setDoctors(response.data.doctors);
          console.log('Doctors fetched successfully:', response.data.doctors.length);
        } else {
          console.log('No doctors data in response');
          setDoctors([]);
        }
        setIsLoading(false);
      } else {
        throw new Error('Failed to fetch doctors');
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error('Error fetching doctors:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      
      if (error.response) {
        const { status, data } = error.response;
        console.log('Error status:', status);
        console.log('Error data:', data);
        
        if (status === 500) {
          setError('Server error. Please try again later.');
        } else if (status === 404) {
          setError('Doctors endpoint not found. Please check server configuration.');
        } else {
          setError(`Failed to fetch doctors (${status}). Please try again.`);
        }
      } else if (error.request) {
        console.log('Network error - no response received');
        setError('Network error. Please check your connection.');
      } else {
        console.log('Other error:', error.message);
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      router.back();
    }
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    // Handle doctor selection
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#20AB7D" />
        <Text style={styles.loadingText}>Loading doctors...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Content here */}
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
    marginTop: 12,
    fontSize: 16,
    color: '#6C757D',
  },
});
