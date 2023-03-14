import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { realmContext } from '../realmDB';

//components
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../colors';
import { useRealmDBContext } from '../realmDB';

export default function Home({ navigation }) {
  const JournalData = React.useContext(realmContext);
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
  addButton: {
    backgroundColor: colors.mainTheme,
    borderRadius: 30,
    position: 'absolute',
    right: 30,
    bottom: 30,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
