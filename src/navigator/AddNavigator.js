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
      var sp=this.props.screenProps;
      return (<EleveAdd navigation={this.props.navigation} addeleve={sp.addeleve}/>)
    }
  }


const AddNavigator = StackNavigator({
  AddEleve: {
    screen: AddEleveScreen
  }
},{
  initialRouteName: 'AddEleve',
});

export default AddNavigator;