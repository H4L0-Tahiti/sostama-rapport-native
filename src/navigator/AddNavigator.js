import React from 'react';
import {View, Text, Button} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements'
import EleveAdd from '../components/EleveAdd'
import Style from '../Style'


class AddEleveScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({headerTitle: 'Ajouter un élève',headerLeft: <Icon
    name='arrow-back'
    onPress={() => (navigation.navigate('Liste'))}
    containerStyle={Style.iconheader}/>,});
    render() {
      const {params} = this.props.navigation.state;
      return (<EleveAdd navigation={this.props.navigation}/>)
    }
  }


const AddNavigator = StackNavigator({
  AddEleve: {
    screen: AddEleveScreen
  }
});

export default AddNavigator;