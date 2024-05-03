import * as Appcues from '@appcues/react-native';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [userID, setUserID] = useState('');

  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
      <Button
        title="Initialize Appcues SDK"
        onPress={async () => {
          await Appcues.setup('APPCUES_ACCOUNT_ID', 'APPCUES_APPLICATION_ID');
          Appcues.debug();
        }}
      />
      <TextInput
        onChangeText={setUserID}
        placeholder="Enter user ID"
        value={userID}
      />
      <Button
        title="Identify User"
        onPress={() => {
          Appcues.identify(userID);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
