import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Dockbar from './Dockbar';
import ScreenWrapper from '../components/ScreenWrapper';

export default function AboutScreen({ navigation }) {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Image source={require('./Icon/arrows.png')} style={styles.backArrow} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>About</Text>
          </View>

          {/* Nội dung */}
          <View style={styles.content}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Producer Name</Text>
              <Text style={styles.infoValue}>Pixel</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Production Time</Text>
              <Text style={styles.infoValue}>04/2025</Text>
            </View>
            <Text style={styles.description}>
              This is an application for selling product like: Phone, Laptop, PC,...
            </Text>
          </View>
        </ScrollView>

        {/* Dockbar */}
        <Dockbar navigation={navigation} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 70, // để tránh bị che bởi Dockbar
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    marginRight: 10,
  },
  backArrow: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  infoRow: {
    backgroundColor: '#d3d3d3',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
  },
});
