import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import MenuNavigator from './src/navigator/MenuNavigator' //rootnavigator

export default class App extends React.Component {

  render() {
    return (
     <MenuNavigator/>
    );
  }
}
