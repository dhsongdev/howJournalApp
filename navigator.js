import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Add from './screens/add';
import Home from './screens/home';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator screenOptions={() => ({ headerShown: false })}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Add"
        component={Add}
        options={() => ({ presentation: 'modal' })}
      />
    </Stack.Navigator>
  );
}
