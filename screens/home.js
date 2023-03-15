import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { realmContext } from '../realmDB';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

//components
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { colors } from '../colors';

export default function Home({ navigation }) {
  const realm = React.useContext(realmContext);
  const [journalData, setJournalData] = React.useState([]);

  React.useEffect(() => {
    if (realm) {
      const object = realm.objects('Journal');
      object.addListener((obj, changes) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setJournalData(obj.sorted('_id', true));
      });
      return () => {
        object.removeAllListeners();
      };
    }
  }, [realm]);

  const onPressDelete = (id) => {
    realm.write(() => {
      const target = realm.objectForPrimaryKey('Journal', id);
      realm.delete(target);
    });
  };

  const JournalBox = ({ item }) => {
    return (
      <View style={styles.journalBox}>
        <Text style={styles.emotion}>{item.emotion}</Text>
        <Text style={styles.comment}>{item.comment}</Text>
        <TouchableOpacity
          onPress={() => onPressDelete(item._id)}
          style={styles.removeButton}
        >
          <FontAwesome name="remove" size={15} color="grey" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <BannerAd
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          unitId={TestIds.BANNER}
        />
        {journalData === [] ? null : (
          <FlatList
            data={journalData.slice()}
            renderItem={({ item }) => <JournalBox item={item} />}
            keyExtractor={(item) => item._id}
          />
        )}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Add');
          }}
          style={styles.addButton}
        >
          <AntDesign name="pluscircle" size={60} color={colors.button} />
        </TouchableOpacity>
      </View>
      <BannerAd
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        unitId={TestIds.BANNER}
      />
    </View>
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
  journalBox: {
    backgroundColor: '#F1DEC9',
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
  },
  emotion: {
    marginRight: 5,
  },
  comment: {
    flexShrink: 1,
    marginRight: 10,
  },
  removeButton: {
    position: 'absolute',
    right: 5,
    top: 2,
  },
});
