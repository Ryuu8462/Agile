import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import DockBar from './Dockbar';
import { useNavigation } from '@react-navigation/native';

export default function ProductDetail({ route, navigation }) {
  const { product } = route.params;

  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    const index = cart.findIndex(item => item.id === product.id);
    let newCart = [...cart];

    if (index >= 0) {
      newCart[index].quantity += quantity;
    } else {
      newCart.push({ ...product, quantity });
    }
    setCart(newCart);
    Alert.alert('Thông báo', `Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />

      {/* Header */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Product Detail</Text>
      </TouchableOpacity>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Product Image */}
        <View style={styles.imageWrapper}>
          {product.image ? (
            <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="contain" />
          ) : (
            <View style={styles.placeholderImage} />
          )}
        </View>

        {/* Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>Price: {product.price.toLocaleString()}₫</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
        </View>
      </ScrollView>

      {/* Fixed Add-to-cart + Quantity */}
      <View style={styles.fixedCartSection}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>ADD TO CART</Text>
        </TouchableOpacity>

        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.qtyButton} onPress={decrement}>
            <Text style={styles.qtyButtonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity style={styles.qtyButton} onPress={increment}>
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* DockBar luôn ở dưới cùng */}
      <DockBar navigation={navigation} onLogoutPress={() => alert('Logout pressed')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backButton: {
    padding: 10,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
  scrollContent: {
    paddingBottom: 140, // Chừa chỗ cho Add to Cart + Dockbar
  },
  imageWrapper: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#eee',
  },
  infoContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  productName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  productPrice: {
    color: '#fff',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  productDescription: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  fixedCartSection: {
    position: 'absolute',
    bottom: 70, // nằm trên DockBar
    left: 20,
    right: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000',
  },
  addToCartButton: {
    backgroundColor: '#b8a84b',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  qtyButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityText: {
    color: '#fff',
    fontSize: 18,
    marginHorizontal: 10,
  },
});