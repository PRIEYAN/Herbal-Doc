import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
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
    console.log('Doctor selected:', doctor.name);
    try {
      // Navigate to medmeetDoctor screen with doctor data
      router.push({
        pathname: '/medmeetDoctor',
        params: { 
          doctorId: doctor.sno.toString(),
          doctorName: doctor.name,
          doctorSpecialization: doctor.specialization,
          doctorHospital: doctor.hospital,
          doctorAbout: doctor.aboutme,
          doctorPhone: doctor.phonenumber,
          doctorEmail: doctor.email,
          doctorRating: doctor.rating.toString(),
          doctorStatus: doctor.booked
        }
      });
    } catch (error) {
      console.error('Navigation error:', error);
      alert('Failed to open doctor details');
    }
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MedMeet</Text>
        <Text style={styles.headerSubtitle}>Find Doctors</Text>
      </View>

      {/* Doctors List */}
      <ScrollView style={styles.doctorsList} showsVerticalScrollIndicator={false}>
        <Text style={styles.listTitle}>Available Doctors ({doctors.length})</Text>
        {doctors.map((doctor) => (
          <TouchableOpacity
            key={doctor.sno}
            style={styles.doctorCard}
            onPress={() => handleDoctorSelect(doctor)}
          >
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.doctorSpecialization}>{doctor.specialization}</Text>
              <Text style={styles.doctorHospital}>{doctor.hospital}</Text>
              <Text style={styles.doctorAbout}>{doctor.aboutme}</Text>
            </View>
            <View style={styles.doctorDetails}>
              <Text style={styles.doctorRating}>⭐ {doctor.rating || 'No rating'}</Text>
              <Text style={styles.doctorStatus}>
                {doctor.booked === 'none' ? 'Available' : 'Booked'}
              </Text>
              <Text style={styles.doctorContact}>{doctor.phonenumber}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#20AB7D',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  headerSubtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 5,
  },
  doctorsList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#343A40',
  },
  doctorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343A40',
  },
  doctorSpecialization: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 2,
  },
  doctorHospital: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 2,
  },
  doctorAbout: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 5,
  },
  doctorDetails: {
    alignItems: 'flex-end',
  },
  doctorRating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFC107',
  },
  doctorStatus: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 2,
  },
  doctorContact: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 2,
  },
});
