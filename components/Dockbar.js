import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 🔥 Quan trọng!

const Dockbar = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation(); // 🔥 Dùng hook để lấy navigation

  const handleLogout = () => {
    setModalVisible(false);
    navigation.navigate('Login');
  };

  return (
    <>
      <View style={styles.dockBar}>
        <DockItem
          icon={require('./Icon/home-agreement.png')}
          label="Home"
          onPress={() => navigation.replace('Home')}
        />
        <DockItem
          icon={require('./Icon/notification.png')}
          label="Notify"
          onPress={() => navigation.replace('Notification')}
        />
        <DockItem
          icon={require('./Icon/user.png')}
          label="User"
          onPress={() => navigation.replace('User')}
        />
        <DockItem
          icon={require('./Icon/shopping-cart.png')}
          label="Cart"
          onPress={() => navigation.replace('Cart')}
        />
        <DockItem
          icon={require('./Icon/logout.png')}
          label="Logout"
          onPress={() => setModalVisible(true)}
        />
      </View>

      <Modal transparent visible={isModalVisible} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.popupBox}>
            <Text style={styles.popupText}>
              Are you sure you want to{'\n'}LOG OUT?
            </Text>
            <Image
              source={require('./Icon/logout.png')}
              style={styles.popupIcon}
            />

            <View style={styles.popupButtons}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleLogout}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const DockItem = ({ icon, label, onPress }) => (
  <View style={styles.dockItem}>
    <TouchableOpacity onPress={onPress} style={styles.touchableArea}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  dockBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 20 : 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgb(216, 129, 41)',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    // Shadow iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,

    // Elevation Android
    elevation: 10,
  },
  dockItem: {
    flex: 1,
    alignItems: 'center',
  },
  touchableArea: {
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 250,
    alignItems: 'center',
  },
  popupText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  popupIcon: {
    width: 30,
    height: 30,
    marginVertical: 10,
  },
  popupButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    width: '100%',
  },
  backButton: {
    backgroundColor: 'rgb(239, 209, 14)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: 'rgb(11, 184, 252)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default Dockbar;
