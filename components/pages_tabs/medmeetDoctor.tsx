import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
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
  
  // Get all the doctor details passed from the previous page
  const doctorName = params.doctorName as string;
  const doctorId = params.doctorId as string;
  const doctorSpecialization = params.doctorSpecialization as string;
  const doctorHospital = params.doctorHospital as string;
  const doctorAbout = params.doctorAbout as string;
  const doctorRating = params.doctorRating as string;
  const doctorPhone = params.doctorPhone as string;
  const doctorEmail = params.doctorEmail as string;

  // Create doctor details object from passed parameters
  const doctorDetails: DoctorDetails = {
    name: doctorName || "Dr. Unknown",
    phoneNumber: doctorPhone || "Not available",
    email: doctorEmail || "Not available",
    nmrNumber: params.doctorNmrNumber as string || "Not available",
    hospital: doctorHospital || "Not specified",
    specialization: doctorSpecialization || "General Medicine",
    aboutMe: doctorAbout || "No information available",
    booked: "none", // Default to available
    bookedBy: "",
    image: require('../../assets/images/doctorlogo.jpg')
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
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{doctorRating || "0"}/5</Text>
          <Text style={styles.starIcon}>⭐</Text>
        </View>
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
  },
  starIcon: {
    fontSize: 18,
    marginLeft: 4,
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
