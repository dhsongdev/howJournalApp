import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors } from '../colors';

export default function Add() {
  return (
    <View style={styles.mainContainer}>
      <Text>add screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.addScreen,
  },
});
