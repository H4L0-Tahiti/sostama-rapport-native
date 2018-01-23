import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Style from './Style';


const HomeScreen = ({ navigation }) => (
    <View style={Style.homestyle}>
      <Text>Home Screen</Text>
    </View>
  );
  
  const AddScreen = () => (
    <View style={Style.addstyle}>
      <Text>Details Screen</Text>
    </View>
  );
  
  const RootNavigator = StackNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerTitle: 'SOSTama',
      },
    },
    AddEleve: {
      screen: DetailsScreen,
      navigationOptions: {
        headerTitle: 'Ajouter Eleve',
      },
    },
  });
  
  export default RootNavigator;