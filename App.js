import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

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

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [realm, setRealm] = React.useState(null);
  const [appReady, setAppReady] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        const initRealm = await Realm.open({
          path: `${FileSystem.documentDirectory}/JournalDB.realm`,
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

  console.log(realm);

  return (
    <realmContext.Provider value={realm}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </realmContext.Provider>
  );
}
