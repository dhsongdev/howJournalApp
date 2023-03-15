import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import mobileAds, {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
import RNFS from 'react-native-fs';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import Realm from 'realm';
import Navigator from './navigator';

import { realmContext } from './realmDB';

const JournalSchema = {
  name: 'Journal',
  properties: {
    _id: 'int',
    emotion: 'string',
    comment: 'string',
  },
  primaryKey: '_id',
};

console.log(RNFS.DocumentDirectoryPath);
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [realm, setRealm] = React.useState(null);
  const [appReady, setAppReady] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        if (Platform.OS === 'ios') {
          const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
          if (result === RESULTS.DENIED) {
            await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
          }
        } else {
          mobileAds()
            .initialize()
            .then((adapterStatuses) => {
              // Initialization complete!
            });
        }

        const adapterStatuses = await mobileAds().initialize();

        const initRealm = await Realm.open({
          path: `JournalDB.realm`,
          schema: [JournalSchema],
        });
        setRealm(initRealm);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
      }
    }
    prepare();
  }, []);

  if (appReady) {
    SplashScreen.hideAsync();
  }

  return (
    <realmContext.Provider value={realm}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </realmContext.Provider>
  );
}
