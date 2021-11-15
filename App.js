// In App.js in a new project
import 'react-native-gesture-handler';
import * as React from 'react';
import { SafeAreaView} from 'react-native';
import Router from './router';
import { DataProvider } from './service/Context';

function App() {
  return (
    <DataProvider>
      <SafeAreaView style={{flex: 1}}>
        <Router/>
      </SafeAreaView>
      </DataProvider>
  );
}

export default App;