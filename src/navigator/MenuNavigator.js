import React from 'react';
import {Icon} from 'react-native-elements'
import {DrawerNavigator} from 'react-navigation';
import ListNavigator from './ListNavigator'
import AddNavigator from './AddNavigator'
import AboutNavigator from './AboutNavigator'
import Style from '../Style'

const options = {
}

const MenuNavigator = DrawerNavigator({
  Menu1: {
    screen: ListNavigator,
    navigationOptions: {
      title: 'Liste',
      drawerLabel: 'Liste',
      drawerIcon: <Icon name='home'/>,
    }
  },
  Menu2: {
    screen: AddNavigator,
    navigationOptions: {
      title: 'Ajouter',
      drawerLabel: 'Ajouter un élève',
      drawerIcon: <Icon name='account-box'/>
    },
  },
  Menu3: {
    screen: AboutNavigator,
    navigationOptions: {
      title: 'A Propos',
      drawerLabel: 'A Propos',
      drawerIcon: <Icon name='description'/>
    },  
  },
},options);

export default MenuNavigator;