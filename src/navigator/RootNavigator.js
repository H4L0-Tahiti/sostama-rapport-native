import React from 'react';
import {View, Text, Button} from 'react-native';
import {StackNavigator} from 'react-navigation';
import EleveList from '../components/EleveList';
import EleveRapport from '../components/EleveRapport';
import Style from './Style'

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title : 'SOSTama-Rapport'
  });/**useless on a noheader en static */

  render() {
    const {params} = this.props.navigation.state;
    return <EleveList navigation={this.props.navigation}/>
  }
}

class AddScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title : 'Ajouter'
  });
  render() {
    const {params} = this.props.navigation.state;
    return (
      <View style={Style.container}>
        <Text>Add Screen</Text>
      </View>
    )
  }
}

class RapportScreen extends React.Component {
  
  static navigationOptions = ({navigation}) => (
    {
    title : 'Rapport pour '+navigation.state.params.nom + ' '+ navigation.state.params.prenom,
  });
  
  render() {
    const {params} = this.props.navigation.state;
    return (
      <EleveRapport eleve={params} navigation={this.props.navigation} />
    )
  }
}

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  AddEleve: {
    screen: AddScreen
  },
  Rapport: {
    screen: RapportScreen
  }
});

export default RootNavigator;