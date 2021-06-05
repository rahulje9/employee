/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Router from './src/navigation/Router';
import {persistor, store} from './src/store/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import CustomStatusBar from './src/components/customStatusBar/customStatusBar';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <SafeAreaProvider>
            <CustomStatusBar
              backgroundColor={'transparent'}
              barStyle={'dark-content'}
            />

            <Router />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
