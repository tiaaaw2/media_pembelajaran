import * as React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LibraryBig, User, Activity } from 'lucide-react-native'; // icon
import { createTables } from './database';

// Screens
import Login from './src/Login';
import Regis from './src/Regis';
import Home from './src/Home';
import HomeAdmin from './src/HomeAdmin';
import Profil from './src/Profil';
import MateriDetail from './src/MateriDetail';
import OHIS from './src/ohis';

// Database
import { createTables } from './database';
import TambahMateri from './src/TambahMateri';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ====================== USER TABS ======================
function UserTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Home: LibraryBig,
            Profil: User,
          };
          const IconComponent = icons[route.name];
          return (
            <IconComponent size={size} color={focused ? '#4A6CF7' : '#ccc'} />
          );
        },
        tabBarActiveTintColor: '#4A6CF7',
        tabBarInactiveTintColor: '#ccc',
        tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
        tabBarStyle: { backgroundColor: '#FFF', height: 70, paddingBottom: 5 },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: 'Materi' }}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{ tabBarLabel: 'Profil' }}
      />
    </Tab.Navigator>
  );
}

// ====================== ADMIN TABS ======================
function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Home: LibraryBig,
            OHIS: Activity,
            Profil: User,
          };
          const IconComponent = icons[route.name];
          return (
            <IconComponent size={size} color={focused ? '#4A6CF7' : '#ccc'} />
          );
        },
        tabBarActiveTintColor: '#4A6CF7',
        tabBarInactiveTintColor: '#ccc',
        tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
        tabBarStyle: { backgroundColor: '#FFF', height: 70, paddingBottom: 5 },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeAdmin}
        options={{ tabBarLabel: 'Materi' }}
      />
      <Tab.Screen
        name="OHIS"
        component={OHIS}
        options={{ tabBarLabel: 'OHIS' }}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{ tabBarLabel: 'Profil' }}
      />
    </Tab.Navigator>
  );
}

// ====================== ROOT STACK ======================
function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Regis" component={Regis} />
      <Stack.Screen name="UserTabs" component={UserTabs} />
      <Stack.Screen name="AdminTabs" component={AdminTabs} />
      <Stack.Screen name="MateriDetail" component={MateriDetail} />
      <Stack.Screen name="TambahMateri" component={TambahMateri} />
    </Stack.Navigator>
  );
}

// ====================== APP ======================
export default function App() {
  useEffect(() => {
    const initDB = async () => {
      try {
        await createTables();
        console.log('✅ Database berhasil diinisialisasi');
      } catch (error) {
        console.log('❌ Gagal inisialisasi database', error);
      }
    };
    initDB();
  }, []);

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
