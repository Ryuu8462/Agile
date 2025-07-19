import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Dockbar from './Dockbar';

export default function OnlinePaymentScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('./Icon/arrows.png')} style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Online Payment</Text>
      </View>
      <View style={styles.content}>
        <Image source={require('./Picture/momo.png')} style={styles.qr} />
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => navigation.navigate('Order')}
        >
          <Text style={styles.checkoutText}>CHECKOUT</Text>
        </TouchableOpacity>
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
  container: { flex: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30, 
  },
  qr: { width: 260, height: 300, marginBottom: 20 },
  checkoutBtn: {
    backgroundColor: 'black',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  checkoutText: { color: 'white', fontWeight: 'bold' },
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
