import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface DoctorDetails {
  name: string;
  phoneNumber: string;
  email: string;
  nmrNumber: string;
  hospital: string;
  specialization: string;
  aboutMe: string;
  booked: string;
  bookedBy: string;
  image: any;
}

export default function MedMeetDoctorPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const doctorName = params.doctorName as string;

  // Static doctor details - in real app, fetch from API based on doctorName
  const doctorDetails: DoctorDetails = {
    name: doctorName || "Dr. PrajinKrishna",
    phoneNumber: "+91 98765 43210",
    email: "dr.prajinkrishna@herbaldoc.com",
    nmrNumber: "NMR123456789",
    hospital: "Herbal Care Medical Center",
    specialization: "MBBS, Respiratory Medicine",
    aboutMe: "I have completed my master's degree abroad and I mainly focus on asthma and breathing-related problems. With over 8 years of experience in respiratory medicine, I specialize in treating chronic respiratory conditions, asthma, COPD, and other breathing disorders. I believe in combining traditional herbal remedies with modern medical practices to provide comprehensive care to my patients.",
    booked: "none",
    bookedBy: "",
    image: require('../../assets/images/doctor1.png')
  };

  const handleBack = () => {
    router.back();
  };

  const handleBookAppointment = () => {
    Alert.alert(
      'Book Appointment',
      `Would you like to book an appointment with ${doctorDetails.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Book Now',
          onPress: () => {
            Alert.alert('Success', 'Appointment request sent! The doctor will contact you soon.');
          },
        },
      ]
    );
  };

  useEffect(() => {
    testServerConnection();
    testTokenValidity();
    fetchDoctors(); // <-- This calls the axios function
  }, []);

  const testServerConnection = async () => {
    try {
      const response = await axios.get('http://10.10.45.109:5001/consumer/medmeet/getDoctors');
      console.log('Server connection successful:', response.data);
    } catch (error) {
      console.error('Server connection failed:', error);
      Alert.alert('Error', 'Could not connect to the server. Please check your network or server status.');
    }
  };

  const testTokenValidity = async () => {
    try {
      const token = 'YOUR_JWT_TOKEN'; // Replace with your actual token
      const response = await axios.post('http://10.10.45.109:5001/consumer/auth/getDoctors', 
        { jwt: token },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000, // 10 second timeout
        }
      );
      console.log('Token validity test successful:', response.data);
    } catch (error) {
      console.error('Token validity test failed:', error);
      Alert.alert('Error', 'Token is invalid or expired. Please log in again.');
    }
  };

  const fetchDoctors = async () => {
    try {
      const token = 'YOUR_JWT_TOKEN'; // Replace with your actual token
      const response = await axios.post('http://10.10.45.109:5001/consumer/auth/getDoctors', 
        { jwt: token },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000, // 10 second timeout
        }
      );
      console.log('Doctors fetched successfully:', response.data);
      // In a real app, you would parse response.data to get doctor details
      // For now, we'll just log the response
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
      Alert.alert('Error', 'Failed to fetch doctor details. Please try again later.');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctor Profile</Text>
      </View>

      {/* Doctor Image and Basic Info */}
      <View style={styles.profileSection}>
        <Image 
          source={doctorDetails.image}
          style={styles.doctorImage}
          defaultSource={require('../../assets/images/doctorlogo.jpg')}
        />
        <Text style={styles.doctorName}>{doctorDetails.name}</Text>
        <Text style={styles.doctorSpecialization}>{doctorDetails.specialization}</Text>
        <Text style={styles.doctorHospital}>{doctorDetails.hospital}</Text>
      </View>

      {/* Contact Information */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone:</Text>
          <Text style={styles.infoValue}>{doctorDetails.phoneNumber}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{doctorDetails.email}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>NMR Number:</Text>
          <Text style={styles.infoValue}>{doctorDetails.nmrNumber}</Text>
        </View>
      </View>

      {/* About Me */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.aboutMeText}>{doctorDetails.aboutMe}</Text>
      </View>

      {/* Availability */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Availability</Text>
        <View style={styles.availabilityRow}>
          <Text style={styles.infoLabel}>Status:</Text>
          <View style={[
            styles.statusBadge, 
            { backgroundColor: doctorDetails.booked === 'none' ? '#20AB7D' : '#E74C3C' }
          ]}>
            <Text style={styles.statusText}>
              {doctorDetails.booked === 'none' ? 'Available' : 'Booked'}
            </Text>
          </View>
        </View>
        {doctorDetails.booked !== 'none' && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Booked by:</Text>
            <Text style={styles.infoValue}>{doctorDetails.bookedBy}</Text>
          </View>
        )}
      </View>

      {/* Book Appointment Button */}
      <View style={styles.buttonSection}>
        <TouchableOpacity 
          style={[
            styles.bookButton, 
            doctorDetails.booked !== 'none' && styles.bookButtonDisabled
          ]} 
          onPress={handleBookAppointment}
          disabled={doctorDetails.booked !== 'none'}
        >
          <Text style={styles.bookButtonText}>
            {doctorDetails.booked === 'none' ? 'Book Appointment' : 'Not Available'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#20AB7D',
    paddingVertical: 20,
    paddingTop: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  backButtonText: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 20,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  doctorImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  doctorSpecialization: {
    fontSize: 16,
    color: '#20AB7D',
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  doctorHospital: {
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6C757D',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#2C3E50',
    flex: 2,
    textAlign: 'right',
  },
  aboutMeText: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 22,
  },
  availabilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  buttonSection: {
    padding: 20,
    paddingBottom: 40,
  },
  bookButton: {
    backgroundColor: '#20AB7D',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  bookButtonDisabled: {
    backgroundColor: '#6C757D',
    opacity: 0.6,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
