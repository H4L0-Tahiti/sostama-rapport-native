import React from 'react';
import {View, Text, Button} from 'react-native';
import {StackNavigator} from 'react-navigation';
import EleveList from '../components/EleveList';
import EleveRapport from '../components/EleveRapport';
import {Icon} from 'react-native-elements'
import {EleveMenuButton} from '../components/EleveMenu';
import Style from '../Style'

class ListeScreen extends React.Component {

  static navigationOptions = ({navigation}) => ({
    headerTitle: 'SOSTama-Rapport', headerLeft: <Icon
      name='menu'
      onPress={() => (navigation.navigate('DrawerOpen'))}
      containerStyle={Style.iconheader}/>,
    headerRight: <Icon name='account-circle' containerStyle={Style.iconheader}/>
  });

  render() {
    const {params} = this.props.navigation.state;
    return <EleveList navigation={this.props.navigation}/>
  }
}

class RapportScreen extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Rapport pour ' + navigation.state.params.nom + ' ' + navigation.state.params.prenom
  });

  render() {
    const {params} = this.props.navigation.state;
    return (<EleveRapport eleve={params} navigation={this.props.navigation}/>)
  }
}

const ListNavigator = StackNavigator({
  Liste: {
    screen: ListeScreen
  },
  Rapport: {
    screen: RapportScreen
  }
});

export default ListNavigator;