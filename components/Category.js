// CategoryBar.js
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // ✅ Thêm dòng này

const categories = [
  { name: 'Desktop', icon: require('./Icon/computer.png'), screen: 'DesktopScreen' },
  { name: 'Mobile', icon: require('./Icon/smartphone.png'), screen: 'MobileScreen' },
  { name: 'Laptop', icon: require('./Icon/laptop.png'), screen: 'LaptopScreen' },
  { name: 'Tablet', icon: require('./Icon/tablet.png'), screen: 'TabletScreen' },
  { name: 'Headphone', icon: require('./Icon/headphones.png'), screen: 'HeadphoneScreen' },
];

export default function CategoryBar() {
  const navigation = useNavigation(); // ✅ Sử dụng đúng hook

  const handlePress = (screen) => {
    navigation.navigate(screen); // ✅ Sử dụng .navigate đúng cách
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryBar}
      contentContainerStyle={styles.categoryContainer}
    >
      {categories.map((cat, index) => (
        <TouchableOpacity
          key={index}
          style={styles.categoryItem}
          onPress={() => handlePress(cat.screen)} // ✅ Dùng đúng screen thay vì name
        >
          <Image source={cat.icon} style={styles.categoryIcon} />
          <Text style={styles.categoryText}>{cat.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categoryBar: {
    paddingVertical: 10,
    backgroundColor:'rgb(166, 201, 14)'
  },
  categoryContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  categoryItem: {
    alignItems: 'center',
    width: 70,
    marginHorizontal: 2,
  },
  categoryIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    textAlign: 'center',
  },
});
