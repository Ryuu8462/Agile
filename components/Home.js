import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  TextInput,
  ScrollView,
  Linking,
  BackHandler,
  StatusBar,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import DockBar from './Dockbar';
import Category from './Category';

import { CartContext } from './CartContext';

const API_URL_BANNER = '';
const API_URL_PRODUCT = '';

export default function HomeScreen({ navigation }) {
  const { addToCart } = useContext(CartContext);  

  const onBackPress = () => {
  if (isModalVisible) {
    setModalVisible(false);
    return true; // Ngăn hành động back mặc định
  }

  // Nếu đang ở Home, thoát app:
  BackHandler.exitApp();
  return true;
};


  const [isModalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [banners, setBanners] = useState([]);

  const [allProducts, setAllProducts] = useState({
    phone: [],
    headphone: [],
    laptop: [],
    desktop: [],
    tablet: [],
  });

  const [products, setProducts] = useState({
    phone: [],
    headphone: [],
    laptop: [],
    desktop: [],
    tablet: [],
  });

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => backHandler.remove();
    }, [isModalVisible])
  );


  useEffect(() => {
    if (!API_URL_BANNER) {
      setBanners([
        { image: 'https://via.placeholder.com/320x160?text=Banner+1', link: 'https://example.com/1' },
        { image: 'https://via.placeholder.com/320x160?text=Banner+2', link: 'https://example.com/2' },
      ]);
      return;
    }
    fetch(API_URL_BANNER)
      .then(res => res.json())
      .then(setBanners)
      .catch(err => console.error('Banner fetch error:', err));
  }, []);

  useEffect(() => {
    if (!API_URL_PRODUCT) {
      const sampleProducts = {
        phone: [
          { id: '1', name: 'iPhone 13 Pro Max', price: 30000000, image: 'https://via.placeholder.com/100' },
          { id: '2', name: 'iPhone 12 Mini', price: 20000000, image: 'https://via.placeholder.com/100' },
          { id: '3', name: 'iPhone 11', price: 15000000, image: 'https://via.placeholder.com/100' },
        ],
        headphone: [
          { id: '4', name: 'Tai nghe AirPods Pro', price: 6000000, image: 'https://via.placeholder.com/100' },
          { id: '5', name: 'Tai nghe Bose QC35', price: 8000000, image: 'https://via.placeholder.com/100' },
        ],
        laptop: [
          { id: '6', name: 'MacBook Pro 16"', price: 50000000, image: 'https://via.placeholder.com/100' },
          { id: '7', name: 'Dell XPS 13', price: 25000000, image: 'https://via.placeholder.com/100' },
        ],
        desktop: [
          { id: '8', name: 'iMac 24"', price: 45000000, image: 'https://via.placeholder.com/100' },
          { id: '9', name: 'PC Gaming Ryzen', price: 20000000, image: 'https://via.placeholder.com/100' },
        ],
        tablet: [
          { id: '10', name: 'iPad Pro 12.9"', price: 35000000, image: 'https://via.placeholder.com/100' },
          { id: '11', name: 'Samsung Galaxy Tab', price: 15000000, image: 'https://via.placeholder.com/100' },
        ],
      };
      setAllProducts(sampleProducts);
      setProducts(sampleProducts);
      return;
    }
    fetch(API_URL_PRODUCT)
      .then(res => res.json())
      .then(data => {
        setAllProducts(data);
        setProducts(data);
      })
      .catch(err => console.error('Product fetch error:', err));
  }, []);

  useEffect(() => {
    if (searchText.trim() === '') {
      setProducts(allProducts);
    } else {
      const filtered = {};
      Object.keys(allProducts).forEach(category => {
        filtered[category] = allProducts[category].filter(p =>
          p.name.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setProducts(filtered);
    }
  }, [searchText, allProducts]);

  const goToProductDetail = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const handleLogout = () => {
    setModalVisible(false);
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#dcdcdc" barStyle="dark-content" />

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
            placeholderTextColor="#888"
          />
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Category */}
        <Category />

        {/* Banner */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerSlider}>
          {banners.map((banner, index) => (
            <TouchableOpacity key={index} onPress={() => Linking.openURL(banner.link)}>
              <Image source={{ uri: banner.image }} style={styles.bannerImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Products theo từng category */}
        {Object.keys(products).map(category => (
          products[category].length > 0 && (
            <View key={category} style={styles.productList}>
              <Text style={styles.productTitle}>
                {category === 'phone' ? 'Điện thoại' :
                 category === 'headphone' ? 'Tai nghe' :
                 category === 'laptop' ? 'Laptop' :
                 category === 'desktop' ? 'Desktop' :
                 category === 'tablet' ? 'Máy tính bảng' : category}
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {products[category].map(product => (
                  <View key={product.id} style={styles.productCard}>
                    <TouchableOpacity onPress={() => goToProductDetail(product)}>
                      <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="contain" />
                      <Text numberOfLines={1} style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productPrice}>{product.price.toLocaleString()}₫</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.addToCartButton}
                      onPress={() => addToCart(product)}
                    >
                      <Text style={styles.addToCartText}>Add to Cart</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          )
        ))}
      </ScrollView>

      <DockBar navigation={navigation} onLogoutPress={() => setModalVisible(true)} />

      <Modal transparent visible={isModalVisible} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.popupBox}>
            <Text style={styles.popupText}>Are you sure you want to{'\n'}LOG OUT?</Text>
            <Image source={require('./Icon/logout.png')} style={styles.popupIcon} />
            <View style={styles.popupButtons}>
              <TouchableOpacity style={styles.backButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleLogout}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContainer: { flex: 1 },

  searchContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#dcdcdc' },
  menuButton: { padding: 8, marginRight: 8 },
  menuIcon: { fontSize: 22, fontWeight: 'bold' },
  searchBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 12,
    height: 40,
    justifyContent: 'center',
  },
  searchInput: { fontSize: 16, color: '#000' },

  bannerSlider: { paddingHorizontal: 10, marginBottom: 15 },
  bannerImage: { width: 320, height: 160, borderRadius: 10, marginRight: 10 },

  productList: { paddingLeft: 10, marginBottom: 80 },
  productTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  productCard: {
    width: 180,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  productImage: { width: '100%', height: 100, borderRadius: 8 },
  productName: { fontWeight: 'bold', fontSize: 14, marginTop: 5 },
  productPrice: { color: 'green', fontWeight: 'bold', marginTop: 2 },

  addToCartButton: {
    marginTop: 8,
    backgroundColor: '#007bff',
    paddingVertical: 6,
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontWeight: 'bold',
  },

  modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  popupBox: { backgroundColor: 'white', borderRadius: 10, padding: 20, width: 250, alignItems: 'center' },
  popupText: { fontSize: 16, textAlign: 'center', fontWeight: 'bold', marginBottom: 10 },
  popupIcon: { width: 30, height: 30, marginVertical: 10 },
  popupButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, width: '100%' },
  backButton: {
    backgroundColor: '#d3d3d3',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#d3d3d3',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: { fontWeight: 'bold' },
});
