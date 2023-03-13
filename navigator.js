import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

//screens
import Add from './screens/add';
import Home from './screens/home';

//components
import { colors } from './colors';

const Stack = createNativeStackNavigator();

const HomeHeader = () => (
  <SafeAreaView style={{ backgroundColor: colors.mainTheme }}>
    <View style={styles.homeHeaderContainer}>
      <Text style={styles.homeHeaderTitle}>My Journal</Text>
    </View>
  </SafeAreaView>
);

const BackButton = () => <Text>back</Text>;

export default function Navigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={() => ({
          header: () => <HomeHeader />,
        })}
      />
      <Stack.Screen
        name="Add"
        component={Add}
        options={() => ({
          headerLeft: () => <BackButton />,
          headerTransparent: 'true',
          headerTitle: 'Add new journal',
          presentation: 'modal',
          headerStyle: { backgroundColor: colors.button },
          headerTitleStyle: { color: '#2E3840', fontSize: 15 },
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  homeHeaderContainer: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  homeHeaderTitle: {
    fontSize: 30,
    fontWeight: '600',
  },
});
