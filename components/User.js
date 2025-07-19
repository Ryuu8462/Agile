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

const Option = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <Image source={icon} style={styles.optionIcon} />
    <Text style={styles.optionLabel}>{label}</Text>
  </TouchableOpacity>
);

export default function UserScreen({ navigation }) {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.replace('Home')}
              style={styles.backButton}
            >
              <Image source={require('./Icon/arrows.png')} style={styles.backArrow} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>User</Text>
          </View>

          <View style={styles.profileContainer}>
            <Image
              source={require('./Picture/LoginPicture.png')}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.username}>Username</Text>
              <Text style={styles.email}>Email</Text>
            </View>
          </View>

          <View style={styles.optionsContainer}>
            <Text style={styles.sectionTitle}>Account Setting</Text>
            <Option
              icon={require('./Icon/user.png')}
              label="Edit profile"
              onPress={() => navigation.navigate('EditProfile')}
            />
            <Option
              icon={require('./Icon/menu.png')}
              label="Your order"
              onPress={() => navigation.navigate('Order')}
            />
            <Option
              icon={require('./Icon/notification.png')}
              label="Notification"
              onPress={() => navigation.navigate('Notification')}
            />
            <Option
              icon={require('./Icon/history.png')}
              label="History"
              onPress={() => navigation.navigate('History')}
            />
            <Option
              icon={require('./Icon/about.png')}
              label="About"
              onPress={() => navigation.navigate('About')}
            />
          </View>
        </ScrollView>

        {/*Dockbar nằm ngoài ScrollView để không bị cuộn*/}
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
    paddingBottom: 70, // tránh bị che bởi Dockbar
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
  profileContainer: {
    flexDirection: 'row',
    backgroundColor: '#d3d3d3',
    padding: 15,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  email: {
    color: '#555',
  },
  optionsContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    marginVertical: 10,
    fontWeight: 'bold',
    color: '#555',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  optionIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  optionLabel: {
    fontSize: 16,
  },
});
