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

import { emojis } from '../emojis';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../colors';

export default function Add({ navigation, navigation: { goBack } }) {
  const [selectedEmoji, setSelectedEmoji] = React.useState(0);
  const [comment, setComment] = React.useState('');

  const onSubmit = () => {
    if (comment === '') {
      console.log('no');
      return;
    }
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
          {emojis.map((emoji, index) => (
            <TouchableOpacity
              key={emoji}
              onPress={() => {
                setSelectedEmoji(index);
              }}
              style={[
                styles.emoji,
                selectedEmoji === index ? styles.selectedEmoji : null,
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
  container: { marginBottom: 20 },
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
  },
  selectedEmoji: {
    borderWidth: 3,
    borderColor: '#A4907C',
    borderStyle: 'solid',
  },
  comment: {
    paddingTop: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
  },
  submit: {
    backgroundColor: '#C8B6A6',
    borderRadius: 5,
  },
});
