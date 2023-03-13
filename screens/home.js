import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Add');
        }}
      >
        <Text>Im add button</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
