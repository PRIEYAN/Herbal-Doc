import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface HomePageProps {
  onGoToProfile?: () => void;
  onGoToMedMeet?: () => void;
  onGoToHebDocAi?: () => void;
  onGoToHerbalShop?: () => void;
}

export default function HomePage({ onGoToProfile, onGoToMedMeet, onGoToHebDocAi, onGoToHerbalShop }: HomePageProps) {
  const router = useRouter();

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

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.greeting}>HELLO, PRIEYAN</Text>
        <TouchableOpacity onPress={onGoToProfile}>
          <Image 
            source={require('../../assets/images/profile.jpeg')}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
  greeting: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
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
