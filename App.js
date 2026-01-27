import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LibraryBig, User } from 'lucide-react-native';
import Login from './src/Login';
import Regis from './src/Regis';
import Home from './src/Home';
import Profil from './src/Profil';
import MateriDetail from './src/MateriDetail';

const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Home: LibraryBig,
            Profile: User,
          };

          const IconComponent = icons[route.name];

          return (
            <IconComponent size={size} color={focused ? '#4A6CF7' : '#ccc'} />
          );
        },
        tabBarActiveTintColor: '#4A6CF7',
        tabBarInactiveTintColor: '#ccc',
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: '#FFF',
          height: 70,
          paddingBottom: 5,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: 'Materi' }}
      />
      <Tab.Screen
        name="Profile"
        component={Profil}
        options={{ tabBarLabel: 'Profil' }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
function RootStack() {
  return (
    // pindah pindah tab
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Regis" component={Regis} />
      <Stack.Screen name="Home" component={MyTabs} />
      <Stack.Screen name="MateriDetail" component={MateriDetail} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
