import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface Shop {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance: number;
  type: string;
}

interface IngredientSearchScreenProps {
  ingredient: string;
  onGoBack?: () => void;
}

export default function IngredientSearchScreen({ ingredient, onGoBack }: IngredientSearchScreenProps) {
  const router = useRouter();
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied');
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setUserLocation(location);
      searchNearbyShops(location.coords.latitude, location.coords.longitude);
    } catch (err) {
      setError('Failed to get location');
      setLoading(false);
    }
  };

  const searchNearbyShops = async (lat: number, lng: number) => {
    try {
      setLoading(true);
      
      // For now, let's create some mock data to test the UI
      const mockShops: Shop[] = [
        {
          id: '1',
          name: 'Local Pharmacy',
          address: '123 Main St, City',
          latitude: lat + 0.001,
          longitude: lng + 0.001,
          distance: 0.5,
          type: 'pharmacy'
        },
        {
          id: '2',
          name: 'Health Food Store',
          address: '456 Oak Ave, City',
          latitude: lat - 0.001,
          longitude: lng - 0.001,
          distance: 1.2,
          type: 'health_food'
        },
        {
          id: '3',
          name: 'Grocery Market',
          address: '789 Pine Rd, City',
          latitude: lat + 0.002,
          longitude: lng - 0.002,
          distance: 2.1,
          type: 'grocery'
        }
      ];

      setShops(mockShops);
    } catch (err) {
      setError('Failed to search for shops');
    } finally {
      setLoading(false);
    }
  };

  const openInMaps = (shop: Shop) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${shop.latitude},${shop.longitude}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open maps app');
    });
  };

  const handleBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      router.back();
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Find {ingredient}</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#20AB7D" />
          <Text style={styles.loadingText}>Searching for nearby shops...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Find {ingredient}</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={getCurrentLocation}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
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
        <Text style={styles.headerTitle}>Find {ingredient}</Text>
        <Text style={styles.headerSubtitle}>{shops.length} shops found</Text>
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>Map will be displayed here</Text>
          <Text style={styles.mapPlaceholderSubtext}>Using mock data for testing</Text>
        </View>
      </View>

      {/* Shop List */}
      <ScrollView style={styles.shopList} showsVerticalScrollIndicator={false}>
        <Text style={styles.listTitle}>Nearby Shops</Text>
        {shops.map((shop) => (
          <TouchableOpacity
            key={shop.id}
            style={styles.shopItem}
            onPress={() => openInMaps(shop)}
          >
            <View style={styles.shopInfo}>
              <Text style={styles.shopName}>{shop.name}</Text>
              <Text style={styles.shopAddress}>{shop.address}</Text>
              <Text style={styles.shopType}>{shop.type.replace('_', ' ')}</Text>
            </View>
            <View style={styles.shopDistance}>
              <Text style={styles.distanceText}>{shop.distance.toFixed(1)} km</Text>
              <Text style={styles.directionText}>→</Text>
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
  header: {
    backgroundColor: '#20AB7D',
    paddingVertical: 20,
    paddingTop: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
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
  mapContainer: {
    height: 300,
    margin: 10,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#20AB7D',
    borderStyle: 'dashed',
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#20AB7D',
    marginBottom: 8,
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  shopList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginVertical: 15,
  },
  shopItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  shopInfo: {
    flex: 1,
  },
  shopName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  shopAddress: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 2,
  },
  shopType: {
    fontSize: 12,
    color: '#20AB7D',
    textTransform: 'capitalize',
  },
  shopDistance: {
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#20AB7D',
  },
  directionText: {
    fontSize: 18,
    color: '#20AB7D',
    marginTop: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#7F8C8D',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
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
}); 