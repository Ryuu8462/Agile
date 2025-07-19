import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Dockbar from './Dockbar';

export default function CheckoutScreen({ navigation, route }) {
  const { total } = route.params;

  return (
    <View style={styles.container}>
      
      <View style={styles.content}>
        <Text style={styles.title}>Payment Options</Text>
        <Text style={styles.amount}>Total Amount: ${total}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Order')}
        >
          <Text style={styles.buttonText}>Cash On Delivery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('OnlinePayment', { total })}
        >
          <Text style={styles.buttonText}>Online (CREDIT | DEBIT CARD)</Text>
        </TouchableOpacity>
      </View>

      
      <Dockbar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  amount: {
    marginBottom: 20,
    fontSize: 18,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
