import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Linking,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface HerbalShopPageProps {
  onGoBack?: () => void;
}

interface Product {
  title: string;
  price: string;
  url: string;
  source: string;
}

interface SearchResponse {
  products: Product[];
}

export default function HerbalShopPage({ onGoBack }: HerbalShopPageProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const mockProducts: Product[] = [
    { 
      title: "Organic Turmeric Powder 500g", 
      price: "₹299", 
      url: "https://amazon.in/sample", 
      source: "Amazon" 
    },
    { 
      title: "Natural Ginger Tea Bags 50 Count", 
      price: "₹199", 
      url: "https://flipkart.com/sample", 
      source: "Flipkart" 
    },
    { 
      title: "Pure Honey 1kg Jar", 
      price: "₹499", 
      url: "https://amazon.in/sample2", 
      source: "Amazon" 
    },
    { 
      title: "Ayurvedic Herbal Supplements", 
      price: "₹399", 
      url: "https://flipkart.com/sample2", 
      source: "Flipkart" 
    },
    { 
      title: "Organic Neem Leaves Powder", 
      price: "₹249", 
      url: "https://amazon.in/sample3", 
      source: "Amazon" 
    }
  ];

  const handleBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      router.back();
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter a search term');
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(
        `http://localhost:5000/search?query=${encodeURIComponent(searchQuery)}`
      );
      if (response.ok) {
        const data: SearchResponse = await response.json();
        setProducts(data.products);
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      console.log('API call failed, using mock data:', error);
      // Filter mock products based on search query
      const filteredProducts = mockProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.source.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filteredProducts);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductPress = async (product: Product) => {
    try {
      await Linking.openURL(product.url);
    } catch (error) {
      Alert.alert('Error', 'Could not open the product link');
    }
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.productItem} 
      onPress={() => handleProductPress(item)}
    >
      <View style={styles.productLogo}>
        <Text style={styles.logoText}>
          {item.source === 'Amazon' ? '🛒' : '📦'}
        </Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={styles.productSource}>{item.source}</Text>
      </View>
      <View style={styles.arrowContainer}>
        <Text style={styles.arrowIcon}>→</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>
        {hasSearched 
          ? 'No products found. Try a different search term.' 
          : 'Search for herbal products and natural remedies'
        }
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>HERBAL SHOP</Text>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for herbal products..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity 
            style={styles.searchButton} 
            onPress={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.searchButtonText}>Search</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Results Section */}
      <View style={styles.resultsSection}>
        {hasSearched && (
          <Text style={styles.resultsHeader}>
            {isLoading ? 'Searching...' : `${products.length} products found`}
          </Text>
        )}
        
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.productList}
          ListEmptyComponent={renderEmptyState}
        />
      </View>
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
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
    flex: 1,
    textAlign: 'center',
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#2C3E50',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    marginRight: 12,
  },
  searchButton: {
    backgroundColor: '#20AB7D',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  resultsHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 16,
  },
  productList: {
    paddingBottom: 20,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  productLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  logoText: {
    fontSize: 24,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 4,
    lineHeight: 22,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#20AB7D',
    marginBottom: 4,
  },
  productSource: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '500',
  },
  arrowContainer: {
    marginLeft: 12,
  },
  arrowIcon: {
    fontSize: 20,
    color: '#20AB7D',
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center',
    lineHeight: 24,
  },
});
