import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Dockbar from './Dockbar';

export default function OrderScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      <View style={styles.content}>
        <Text style={styles.title}>Your Order</Text>
        <View style={styles.item}>
          <Image source={require('./Picture/iphone15.png')} style={styles.image} />
          <View>
            <Text>Apple iPhone 15 Plus (256 GB) - Pink</Text>
            <Text>Total: $992</Text>
            <Text>Quantity: 1</Text>
          </View>
        </View>
      </View>

      
      <Dockbar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 30, 
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  item: { flexDirection: 'row', alignItems: 'center' },
  image: { width: 60, height: 60, marginRight: 10 },
});
