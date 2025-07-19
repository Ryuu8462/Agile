import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Dockbar from './Dockbar';

export default function HistoryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('./Icon/arrows.png')} style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>History</Text>
      </View>

      {/* Nội dung chính */}
      <View style={styles.content}>
        
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
  content: {
    flex: 1,
    paddingTop: 70, 
    paddingHorizontal: 20,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  item: { flexDirection: 'row', alignItems: 'center' },
  image: { width: 60, height: 60, marginRight: 10 },
});
