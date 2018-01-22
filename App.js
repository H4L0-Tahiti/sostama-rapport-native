import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDaACU0uVkmHgRYCLwtP8ZuDSqa67RIC_8",
  authDomain: "sostamarapport.firebaseapp.com",
  databaseURL: "https://sostamarapport.firebaseio.com",
  projectId: "sostamarapport",
  storageBucket: "sostamarapport.appspot.com",
  messagingSenderId: "484972558539"
});

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      fire: firebase.firestore()
    };

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>TEST Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
