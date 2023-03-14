import * as React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';

import { realmContext } from '../realmDB';

import { emojis } from '../emojis';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../colors';

export default function Add({ navigation, navigation: { goBack } }) {
  const realm = React.useContext(realmContext);

  const [selectedEmoji, setSelectedEmoji] = React.useState('');
  const [comment, setComment] = React.useState('');

  const onSubmit = async () => {
    if (comment === '') {
      //alert write comment
      return;
    } else if (selectedEmoji === '') {
      //alert select emoji
      return;
    }
    console.log('realm saved', realm);
    await realm.write(() => {
      realm.create('Journal', {
        _id: Date.now(),
        emotion: selectedEmoji,
        comment,
      });
    });
    goBack();
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      ),
      headerTitleAlign: 'center',
    });
  }, []);

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>How was your feeling?</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {emojis.map((emoji) => (
            <TouchableOpacity
              key={emoji}
              onPress={() => {
                setSelectedEmoji(emoji);
              }}
              style={[
                styles.emoji,
                selectedEmoji === emoji ? styles.selectedEmoji : null,
              ]}
            >
              <Text>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Comment</Text>
        <TextInput
          placeholder="Write comment here."
          style={styles.comment}
          multiline={true}
          value={comment}
          onChangeText={setComment}
        ></TextInput>
        <View style={styles.submit}>
          <Button
            disabled={comment === '' ? true : false}
            color="grey"
            title="Submit"
            onPress={onSubmit}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.addScreen,
    padding: 15,
  },
  container: { marginBottom: 20, alignItems: 'center' },
  title: {
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 10,
  },
  emoji: {
    backgroundColor: '#DBA39A',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    borderRadius: 5,
    width: 40,
    height: 40,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  selectedEmoji: {
    borderWidth: 3,
    borderColor: '#A4907C',
    borderStyle: 'solid',
  },
  comment: {
    width: '100%',
    paddingTop: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: 'black',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  submit: {
    backgroundColor: '#C8B6A6',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
