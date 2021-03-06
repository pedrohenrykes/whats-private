import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './src/pages/Main';
import RecentNumbers from './src/pages/RecentNumbers';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7"/>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Main" 
            component={Main}
            options={{ 
              title: 'WhatsPrivate',
              headerStyle: {
                backgroundColor: 'green',
              },
              headerBackTitle: false,
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              }
            }} 
          />
          <Stack.Screen 
            name="RecentNumbers" 
            component={RecentNumbers} 
            options={{ 
              title: 'Números recentes',
              headerStyle: {
                backgroundColor: 'green',
              },
              headerBackTitle: false,
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
