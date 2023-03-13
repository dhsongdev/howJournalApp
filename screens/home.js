import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

//components
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../colors';

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Add');
        }}
        style={styles.addButton}
      >
        <AntDesign name="pluscircle" size={60} color={colors.button} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.mainTheme,
  },
  addButton: { position: 'absolute', right: 30, bottom: 30 },
});
