import React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

const CustomStatusBar = ({backgroundColor, barStyle}) => {
  const insets = useSafeArea();
  const isAndroid = Platform.OS === 'android';
  const height = isAndroid ? 0 : insets.top;
  return (
    <View
      style={[
        styles.statusBar,
        {height: height, backgroundColor: backgroundColor},
      ]}>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={barStyle}
        animated={true}
        showHideTransition={'slide'}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  statusBar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 2,
  },
});
export default CustomStatusBar;
