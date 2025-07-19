import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';

import HomeScreen from './components/Home';
import LoginScreen from './components/Login';
import RegisterScreen from './components/Register';

import UserScreen from './components/User';
import NotificationScreen from './components/Notification';
import HistoryScreen from './components/History';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import About from './components/About';
import { CartProvider } from './components/CartContext';

import DesktopScreen from './components/Desktop';
import MobileScreen from './components/SmartPhone';
import TabletScreen from './components/Tablet';
import LaptopScreen from './components/Laptop';
import HeadphoneScreen from './components/Headphone';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="User" component={UserScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="About" component={About} />

            <Stack.Screen name="DesktopScreen" component={DesktopScreen}/>
            <Stack.Screen name="MobileScreen" component={MobileScreen}/>
            <Stack.Screen name="TabletScreen" component={TabletScreen}/>
            <Stack.Screen name="LaptopScreen" component={LaptopScreen}/>
            <Stack.Screen name="HeadphoneScreen" component={HeadphoneScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </GestureHandlerRootView>
  );
}
