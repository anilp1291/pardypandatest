import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import GameList from './src/pages/GameList';
import store from './src/redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>

      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.container}>
          <GameList />
        </View>
      </SafeAreaView>
    </Provider>
  );
};
export default App
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});