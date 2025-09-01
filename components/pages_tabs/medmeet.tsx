import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

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
      const response = await axios.get('http://10.10.45.109:5001/', { timeout: 5000 });
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

      const response = await axios.get('http://10.10.45.109:5001/consumer/medmeet/getDoctors', {
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
    // Navigate to doctor details page
    router.push({
      pathname: '/medmeetDoctor',
      params: { 
        doctorName: doctor.name,
        doctorId: doctor.sno.toString(),
        doctorSpecialization: doctor.specialization,
        doctorHospital: doctor.hospital,
        doctorAbout: doctor.aboutme,
        doctorRating: doctor.rating.toString(),
        doctorPhone: doctor.phonenumber,
        doctorEmail: doctor.email
      }
    });
  };

  const renderStarRating = (rating: number) => {
    return (
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{rating}/5</Text>
        <Text style={styles.starIcon}>⭐</Text>
      </View>
    );
  };

  const getDefaultProfilePic = () => {
    return require('../../assets/images/doctorlogo.jpg');
  };

  const getAvailabilityStatus = (booked: string) => {
    return booked === 'none' ? 'Available' : 'Booked';
  };

  const getAvailabilityColor = (booked: string) => {
    return booked === 'none' ? '#20AB7D' : '#E74C3C';
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
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchDoctors}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.debugButton} onPress={() => {
          console.log('Current error state:', error);
          console.log('Attempting to fetch doctors again...');
          fetchDoctors();
        }}>
          <Text style={styles.debugButtonText}>Debug Retry</Text>
        </TouchableOpacity>
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
        <Text style={styles.headerTitle}>MEDMEET</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {doctors.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No doctors available at the moment.</Text>
          </View>
        ) : (
          doctors.map((doctor) => (
            <TouchableOpacity 
              key={doctor.sno} 
              style={styles.doctorCard}
              onPress={() => handleDoctorSelect(doctor)}
            >
              <View style={styles.doctorInfo}>
                <Image 
                  source={getDefaultProfilePic()}
                  style={styles.doctorImage}
                  defaultSource={getDefaultProfilePic()}
                />
                <View style={styles.doctorDetails}>
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <Text style={styles.doctorTitle}>{doctor.specialization}</Text>
                  <Text style={styles.doctorHospital}>{doctor.hospital}</Text>
                  <View style={styles.availabilityContainer}>
                    <Text style={[styles.availabilityText, { color: getAvailabilityColor(doctor.booked) }]}>
                      {getAvailabilityStatus(doctor.booked)}
                    </Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.separator} />
              
              <Text style={styles.doctorBio}>{doctor.aboutme}</Text>
              
              <View style={styles.doctorFooter}>
                <Text style={styles.nmrNumber}>NMR: {doctor.nmr_number}</Text>
                {renderStarRating(doctor.rating)}
              </View>
            </TouchableOpacity>
          ))
        )}
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
    fontSize: 16,
    color: '#6C757D',
    marginTop: 16,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#E74C3C',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#20AB7D',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  debugButton: {
    backgroundColor: '#6C757D',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  debugButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#20AB7D',
    paddingVertical: 20,
    paddingTop: 60,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  doctorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16, 
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 4,
  },
  doctorTitle: {
    fontSize: 14,
    color: '#6C757D',
    fontWeight: '500',
    marginBottom: 2,
  },
  doctorHospital: {
    fontSize: 12,
    color: '#6C757D',
    marginBottom: 4,
  },
  availabilityContainer: {
    marginTop: 4,
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#E9ECEF',
    marginBottom: 16,
  },
  doctorBio: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
    marginBottom: 16,
  },
  doctorFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nmrNumber: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginRight: 8,
  },
  starIcon: {
    fontSize: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 60,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});
