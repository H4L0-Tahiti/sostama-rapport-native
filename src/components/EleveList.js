import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import {Text, View, TextInput} from 'react-native';
import {List, ListItem, SearchBar, Header} from 'react-native-elements'
import {TextButton, RaisedTextButton} from 'react-native-material-buttons';
import Modal from 'react-native-modal'

import Style from '../Style'

export class EleveItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            deleteopen: false
        }

    };

    /**RAPPORT handlers */
    _rapportOpen = () => { //utilise pou affiche la fiche élève
        this
            .props
            .navigation
            .navigate('Rapport', this.props.eleve);
    };

    /** DELETE handlers */
    _deleteOpen = () => {
        this.setState({deleteopen: true});

    };
    _deleteClose = () => {
        this.setState({deleteopen: false});
    }

    _deleteEleve = e => {
        this.setState({deleteopen: false});
        this
            .props
            .removeeleve(this.props.eleve)/** > EleveList */
    };

    /**RENDER */
    render() {

        return (
            <View>
                <ListItem
                    title={this.props.eleve.nom + " " + this.props.eleve.prenom}
                    hideChevron
                    onPress={this._rapportOpen}
                    onLongPress={this._deleteOpen/*normalement _deleteOpen mais changer pour dev*/}
                    titleNumberOfLines={1}/>
                <Modal
                    id={"dialog-delete-" + this.props.eleve.id}
                    visible={this.state.deleteopen}
                    onBackdropPress={this._deleteClose}
                    onBackButtonPress={this._deleteClose}
                    backdropColor="#555"
                    backdropOpacity={0.5}>
                    <View>
                        <Text>{"Supprimer " + this.props.eleve.nom + " " + this.props.eleve.prenom + "?"}
                        </Text>
                        <Text>
                            Etes vous sûr de vouloir supprimer cette élève de la base de données ?
                        </Text>
                        <View style={Style.buttonrow}>
                        <TextButton title="Annuler " style={Style.button} onPress={this._deleteClose} autoFocus/>
                        <TextButton title="Supprimer" onPress={this._deleteEleve}/></View>
                    </View>
                </Modal>
            </View>
        )
    }

}

export default class EleveList extends Component {

    //fuse
    fuseoptions = {
        keys: [
            'nom', 'prenom'
        ],
        shouldSort: true
    };

    constructor(props) {
        super(props);

        this.state = {
            /* moteur de recherche*/
            fuse: new Fuse(props.liste, this.fuseoptions),
            /*les ids visibles? dans le constructeur cela correspond à toutes les ids */
            visibles: this.props.liste,
        };
    }

    //HANDLERS
    _changeText = text => {

        //utilisé dans la recherche

        var tempset = this
            .state
            .fuse
            .search(text);

        if (tempset.length == 0) {
            /** la recherche a ramene null, on affiche tout */
            this.setState({visibles: this.props.liste});
        } else {
            this.setState({visibles: tempset});
        }

    };

    //RENDER
    render() {
        return (
            <View style={Style.container}>
                <SearchBar
                    lightTheme
                    round
                    clearIcon
                    id="recherche"
                    placeholder="Rechercher un élève"
                    containerStyle={Style.searchbar}
                    onChangeText={this._changeText}/>
                <List>
                    {this
                        .state
                        .visibles
                        .map((item, i) => (<EleveItem
                            key={item.id}
                            eleve={item}
                            removeeleve={this.props.removeeleve}
                            navigation={this.props.navigation}/>))
}
                </List>
            </View>
        );
    }
}
