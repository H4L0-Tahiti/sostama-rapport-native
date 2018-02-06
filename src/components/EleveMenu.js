import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {List, ListItem, Icon} from 'react-native-elements'
import {StyleSheet, Text, View} from 'react-native';
import Style from '../Style'

const menu = [
    {
        title: 'Ajouter Elève',
        icon: {name:'account-box'},
        go:'AddEleve', // où on va navigate
    }, {
        title: 'A propos',
        icon: {name:'description'},
        go:'About',
    }
];

class MenuItem extends Component{
    
    constructor(props) {
        super(props);
        this.state={
            title:props.item.title,
            leftIcon:props.item.icon,
            go:props.item.go,
        }
    }
    
    _go = () => {
        this.props.navigation.navigate('DrawerClose'); //ferme le menu
        this.props.navigation.navigate(this.state.go);
    }
    render() {
        var e=this.state;
        return (
            <ListItem title={e.title} leftIcon={e.leftIcon} hideChevron onPress={this._go}/>
        )
    }
}

export default class EleveMenu extends Component {
    constructor(props) {
        super(props);

    }
    _go = e => {
        this.props.navigation.navigate(e);
    }

    render() {
        return (
            <List>{menu.map((e, i) => (<MenuItem key={'menu-' + i} item={e} navigation={this.props.navigation}/>))}</List>
        )
    }
}

export class EleveMenuButton extends Component {
    constructor(props) {
        super(props);

    }
    _menu = e => {
        this
            .props
            .navigation
            .navigate('DrawerOpen')
    }

    render() {
        return (<Icon name='menu' onPress={this._menu} containerStyle={Style.buttonmenu} />)
    }

}