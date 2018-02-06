import React from 'react';
import {View, Text, Button} from 'react-native';
import {StackNavigator} from 'react-navigation';
import EleveList from '../components/EleveList';
import EleveRapport from '../components/EleveRapport';
import {Icon} from 'react-native-elements'
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
    var {params} = this.props.navigation.state;
    var sp = this.props.screenProps;
    
    return <EleveList navigation={this.props.navigation} liste={sp.liste} eleveref={sp.eleveref} removeeleve={sp.removeeleve}/>
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
}, {initialRouteName: 'Liste'});

export default ListNavigator;