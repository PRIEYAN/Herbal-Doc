import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface Product {
  id: string;
  name: string;
  price: string;
  rating: string;
  image: string;
  url: string;
  platform: 'amazon' | 'flipkart';
  availability: string;
}

interface IngredientSearchScreenProps {
  ingredient: string;
  onGoBack?: () => void;
}

export default function IngredientSearchScreen({ ingredient, onGoBack }: IngredientSearchScreenProps) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<'amazon' | 'flipkart' | 'both'>('both');

  useEffect(() => {
    searchProducts();
  }, [ingredient]);

  const searchProducts = async () => {
    try {
      setLoading(true);
      
      // For now, let's create mock data that simulates Amazon and Flipkart products
      const mockProducts: Product[] = [
        // Amazon products
        {
          id: 'amz1',
          name: `Organic ${ingredient} - Pure Natural`,
          price: '₹299',
          rating: '4.5 ★',
          image: 'https://via.placeholder.com/100x100/FF9900/FFFFFF?text=A',
          url: `https://www.amazon.in/s?k=${encodeURIComponent(ingredient)}`,
          platform: 'amazon',
          availability: 'In Stock'
        },
        {
          id: 'amz2',
          name: `Premium ${ingredient} Extract - 100g`,
          price: '₹450',
          rating: '4.2 ★',
          image: 'https://via.placeholder.com/100x100/FF9900/FFFFFF?text=A',
          url: `https://www.amazon.in/s?k=${encodeURIComponent(ingredient)}`,
          platform: 'amazon',
          availability: 'In Stock'
        },
        {
          id: 'amz3',
          name: `${ingredient} Powder - Ayurvedic`,
          price: '₹180',
          rating: '4.7 ★',
          image: 'https://via.placeholder.com/100x100/FF9900/FFFFFF?text=A',
          url: `https://www.amazon.in/s?k=${encodeURIComponent(ingredient)}`,
          platform: 'amazon',
          availability: 'In Stock'
        },
        // Flipkart products
        {
          id: 'flip1',
          name: `${ingredient} Natural - Pure Quality`,
          price: '₹275',
          rating: '4.3 ★',
          image: 'https://via.placeholder.com/100x100/2874F6/FFFFFF?text=F',
          url: `https://www.flipkart.com/search?q=${encodeURIComponent(ingredient)}`,
          platform: 'flipkart',
          availability: 'In Stock'
        },
        {
          id: 'flip2',
          name: `Organic ${ingredient} - Best Price`,
          price: '₹320',
          rating: '4.6 ★',
          image: 'https://via.placeholder.com/100x100/2874F6/FFFFFF?text=F',
          url: `https://www.flipkart.com/search?q=${encodeURIComponent(ingredient)}`,
          platform: 'flipkart',
          availability: 'In Stock'
        },
        {
          id: 'flip3',
          name: `${ingredient} Supplement - Health Plus`,
          price: '₹195',
          rating: '4.1 ★',
          image: 'https://via.placeholder.com/100x100/2874F6/FFFFFF?text=F',
          url: `https://www.flipkart.com/search?q=${encodeURIComponent(ingredient)}`,
          platform: 'flipkart',
          availability: 'In Stock'
        }
      ];

      setProducts(mockProducts);
    } catch (err) {
      setError('Failed to search for products');
    } finally {
      setLoading(false);
    }
  };

  const openProduct = (product: Product) => {
    Linking.openURL(product.url).catch(() => {
      Alert.alert('Error', 'Could not open the product link');
    });
  };

  const openPlatformSearch = (platform: 'amazon' | 'flipkart') => {
    const url = platform === 'amazon' 
      ? `https://www.amazon.in/s?k=${encodeURIComponent(ingredient)}`
      : `https://www.flipkart.com/search?q=${encodeURIComponent(ingredient)}`;
    
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', `Could not open ${platform}`);
    });
  };

  const handleBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      router.back();
    }
  };

  const filteredProducts = selectedPlatform === 'both' 
    ? products 
    : products.filter(p => p.platform === selectedPlatform);

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
          <Text style={styles.loadingText}>Searching for products...</Text>
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
          <TouchableOpacity style={styles.retryButton} onPress={searchProducts}>
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
        <Text style={styles.headerSubtitle}>{filteredProducts.length} products found</Text>
      </View>

      {/* Platform Filter */}
      <View style={styles.platformFilter}>
        <TouchableOpacity 
          style={[styles.platformButton, selectedPlatform === 'both' && styles.platformButtonActive]}
          onPress={() => setSelectedPlatform('both')}
        >
          <Text style={[styles.platformButtonText, selectedPlatform === 'both' && styles.platformButtonTextActive]}>
            Both
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.platformButton, selectedPlatform === 'amazon' && styles.platformButtonActive]}
          onPress={() => setSelectedPlatform('amazon')}
        >
          <Text style={[styles.platformButtonText, selectedPlatform === 'amazon' && styles.platformButtonTextActive]}>
            Amazon
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.platformButton, selectedPlatform === 'flipkart' && styles.platformButtonActive]}
          onPress={() => setSelectedPlatform('flipkart')}
        >
          <Text style={[styles.platformButtonText, selectedPlatform === 'flipkart' && styles.platformButtonTextActive]}>
            Flipkart
          </Text>
        </TouchableOpacity>
      </View>

      {/* Quick Search Buttons */}
      <View style={styles.quickSearchContainer}>
        <TouchableOpacity 
          style={styles.quickSearchButton}
          onPress={() => openPlatformSearch('amazon')}
        >
          <Text style={styles.quickSearchButtonText}>Search on Amazon</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.quickSearchButton}
          onPress={() => openPlatformSearch('flipkart')}
        >
          <Text style={styles.quickSearchButtonText}>Search on Flipkart</Text>
        </TouchableOpacity>
      </View>

      {/* Products List */}
      <ScrollView style={styles.productsList} showsVerticalScrollIndicator={false}>
        <Text style={styles.listTitle}>Available Products</Text>
        {filteredProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productItem}
            onPress={() => openProduct(product)}
          >
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
              <Text style={styles.productRating}>{product.rating}</Text>
              <Text style={styles.productAvailability}>{product.availability}</Text>
            </View>
            <View style={styles.productPlatform}>
              <Text style={[
                styles.platformTag, 
                product.platform === 'amazon' ? styles.amazonTag : styles.flipkartTag
              ]}>
                {product.platform.toUpperCase()}
              </Text>
              <Text style={styles.viewText}>View →</Text>
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
  platformFilter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  platformButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    alignItems: 'center',
  },
  platformButtonActive: {
    backgroundColor: '#20AB7D',
    borderColor: '#20AB7D',
  },
  platformButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7F8C8D',
  },
  platformButtonTextActive: {
    color: '#FFFFFF',
  },
  quickSearchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
  },
  quickSearchButton: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    alignItems: 'center',
  },
  quickSearchButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#20AB7D',
  },
  productsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginVertical: 15,
  },
  productItem: {
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
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#20AB7D',
    marginBottom: 2,
  },
  productRating: {
    fontSize: 14,
    color: '#F39C12',
    marginBottom: 2,
  },
  productAvailability: {
    fontSize: 12,
    color: '#27AE60',
  },
  productPlatform: {
    alignItems: 'center',
  },
  platformTag: {
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 4,
  },
  amazonTag: {
    backgroundColor: '#FF9900',
    color: '#FFFFFF',
  },
  flipkartTag: {
    backgroundColor: '#2874F6',
    color: '#FFFFFF',
  },
  viewText: {
    fontSize: 12,
    color: '#20AB7D',
    fontWeight: '600',
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