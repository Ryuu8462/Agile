import React, { useState } from 'react';
import {View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions,} from 'react-native';
import Dockbar from './Dockbar';

const screenHeight = Dimensions.get('window').height;

export default function CartScreen({ navigation }) {
  
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Apple iPhone 15 Plus (256 GB) - Pink',
      price: 990,
      quantity: 1,
      image: require('./Picture/iphone15.png'),
    },
  ]);

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total =
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) +
    (cartItems.length ? 2 : 0);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={{ flex: 1 }}>{item.name}</Text>
      <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.trash}>
        <Image source={require('./Icon/trash.png')} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('./Icon/arrows.png')} style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.cartInfo}>
          You have {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} left in your cart
        </Text>
        {cartItems.length > 0 && (
          <>
            <FlatList
              data={cartItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 100 }}
            />
            <Text style={styles.total}>TOTAL: ${total}</Text>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => navigation.navigate('Checkout', { total })}
            >
              <Text style={styles.checkoutText}>CHECKOUT</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Dockbar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    zIndex: 10,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  cartInfo: {
    textAlign: 'center',
    marginBottom: 10,
    color: 'green',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  trash: {
    padding: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'right',
  },
  checkoutBtn: {
    backgroundColor: 'black',
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 8,
  },
  checkoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backButton: {
    marginRight: 10,
  },
  backArrow: {
    width: 20,
    height: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
