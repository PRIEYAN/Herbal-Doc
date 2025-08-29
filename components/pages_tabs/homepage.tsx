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
}

export default function HomePage({ onGoToProfile }: HomePageProps) {
  const handleMedMeet = () => {
    // Navigate to MedMeet functionality
  };

  const handleChatWithAI = () => {
    // Navigate to AI chat
  };

  const handleHerbalShop = () => {
    // Navigate to herbal shop
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
            <Text style={styles.arrowIcon}>→</Text>
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
    backgroundColor: '#1a1a2e',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  medMeetCard: {
    backgroundColor: '#16213e',
    borderRadius: 16,
    padding: 40,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    width: 48,
    height: 48,
    marginRight: 16,
    borderRadius: 8,
  },
  medMeetText: {
    flex: 1,
  },
  medMeetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  medMeetDescription: {
    fontSize: 14,
    color: '#b8c5d6',
    lineHeight: 20,
  },
  arrowIcon: {
    fontSize: 32,
    color: '#4a90e2',
    fontWeight: 'bold',
  },
  actionCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionCard: {
    backgroundColor: '#16213e',
    borderRadius: 16,
    padding: 40,
    width: '48%',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionCardIcon: {
    width: 40,
    height: 40,
    marginBottom: 12,
    borderRadius: 8,
  },
  actionCardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 18,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#0f3460',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: '#4a90e2',
  },
});
