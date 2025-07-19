import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Dockbar from './Dockbar'; // Đảm bảo đường dẫn đúng

const tabletProducts = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    price: 1199,
    image: require('./Picture/iphone15.png'),
  },
  {
    id: '2',
    name: 'Samsung Galaxy S23',
    price: 999,
    image: require('./Picture/iphone16.png'),
  },
  {
    id: '3',
    name: 'Xiaomi 13 Pro',
    price: 799,
    image: require('./Picture/iphone16.png'),
  },
  {
    id: '4',
    name: 'Google Pixel 8',
    price: 899,
    image: require('./Picture/iphone16.png'),
  },
];

export default function TabletScreen({ navigation }) {
  const [cart, setCart] = useState([]);
  const [searchText, setSearchText] = useState('');

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} đã được thêm vào giỏ hàng`);
  };

  const filteredProducts = tabletProducts.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./Icon/arrows.png')} style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tablet</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
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

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Dockbar */}
      <Dockbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backArrow: {
    width: 20,
    height: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  searchBox: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  searchInput: {
    fontSize: 16,
    color: '#000',
  },
  item: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    width: '48%',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  price: {
    fontSize: 13,
    color: 'green',
    marginVertical: 4,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
  },
});