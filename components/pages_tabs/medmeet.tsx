import React from 'react';
import {
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

interface DoctorProfile {
  id: number;
  name: string;
  title: string;
  bio: string;
  rating: number;
  image: any;
}

const doctors: DoctorProfile[] = [
  {
    id: 1,
    name: 'Dr. PrajinKrishna',
    title: 'MBBS',
    bio: 'I have completed my master in abroad, and i mainly focused on asthma, and breathing related problems.',
    rating: 4.5,
    image: require('../../assets/images/doctor1.png')
  },
  {
    id: 2,
    name: 'Dr. Sarah Johnson',
    title: 'MD, Cardiologist',
    bio: 'Specialized in cardiovascular diseases with over 10 years of experience in treating heart conditions.',
    rating: 4.8,
    image: require('../../assets/images/doctor1.png')
  },
  {
    id: 3,
    name: 'Dr. Michael Chen',
    title: 'MBBS, General Medicine',
    bio: 'Experienced general practitioner with expertise in preventive medicine and chronic disease management.',
    rating: 4.3,
    image: require('../../assets/images/doctor1.png')
  },
  {
    id: 4,
    name: 'Dr. Emily Rodriguez',
    title: 'MBBS, Pediatrician',
    bio: 'Dedicated pediatrician with special focus on child development and early diagnosis.',
    rating: 4.7,
    image: require('../../assets/images/doctor1.png')
  }
];

export default function MedMeetPage({ onGoBack }: MedMeetPageProps) {
  const handleDoctorSelect = (doctor: DoctorProfile) => {
    // Handle doctor selection for appointment
    console.log('Selected doctor:', doctor.name);
  };

  const renderStarRating = (rating: number) => {
    return (
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{rating}/5</Text>
        <Text style={styles.starIcon}>⭐</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MEDMEET</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {doctors.map((doctor) => (
          <TouchableOpacity 
            key={doctor.id} 
            style={styles.doctorCard}
            onPress={() => handleDoctorSelect(doctor)}
          >
            <View style={styles.doctorInfo}>
              <Image 
                source={doctor.image}
                style={styles.doctorImage}
                defaultSource={require('../../assets/images/doctorlogo.jpg')}
              />
              <View style={styles.doctorDetails}>
                <Text style={styles.doctorName}>{doctor.name}</Text>
                <Text style={styles.doctorTitle}>{doctor.title}</Text>
              </View>
            </View>
            
            <View style={styles.separator} />
            
            <Text style={styles.doctorBio}>{doctor.bio}</Text>
            
            {renderStarRating(doctor.rating)}
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
});
