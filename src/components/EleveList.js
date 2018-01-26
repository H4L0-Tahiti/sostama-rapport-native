import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import {Text, View, TextInput} from 'react-native';
import {FormLabel, FormInput} from 'react-native-elements'
import {List, ListItem, SearchBar} from 'react-native-elements'
import {Button} from 'react-native-elements'
import Modal from 'react-native-modal'

import Style from './Style';

//import EleveRapport from './EleveRapport'

export class EleveItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rapportopen: false,
            deleteopen: false
        }

    };

    /**RAPPORT handlers */
    _rapportOpen = () => { //utilise pou affiche la fiche élève
        this.setState({rapportopen: true});
        console.log("rapport")
    };

    _rapportClose = () => {
        this.setState({rapportopen: false});
    };

    /** DELETE handlers */
    _deleteOpen = () => {
        this.setState({deleteopen: true});
        console.log(this.state.deleteopen)

    };
    _deleteClose = () => {
        this.setState({deleteopen: false});
    }

    _deleteEleve = e => {
        this.setState({deleteopen: false});
        this
            .props
            .deleteeleve(this.props.eleve)/** > EleveList */
    };
    /*this.state.rapportopen && <EleveRapport
                    eleve={this.props.eleve}
                    open={this.state.rapportopen}
                onClose={this._rapportClose}/>*/
    /**RENDER */
    render() {

        return (
            <View>
                <ListItem
                    title={this.props.eleve.nom + " " + this.props.eleve.prenom}
                    hideChevron
                    onPress={this._rapportOpen}
                    onLongPress={this._rapportOpen/*normalement _deleteOpen mais changer pour dev*/}
                    titleNumberOfLines={1}/>
                <Modal
                    id={"dialog-delete-" + this.props.eleve.id}
                    visible={this.state.deleteopen}
                    onBackdropPress={this._deleteClose}
                    onBackButtonPress={this._deleteClose}
                    backdropColor="black"
                    backdropOpacity={0.5}
                    >
                    <View>
                        <Text>{"Supprimer " + this.props.eleve.nom + " " + this.props.eleve.prenom + "?"}
                        </Text>
                        <Text>
                            Etes vous sûr de vouloir supprimer cette élève de la base de données ?
                        </Text>
                        <Button title="Annuler " onPress={this._deleteClose} autoFocus/>
                        <Button title="Supprimer" onPress={this._deleteEleve}/>
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
            fuse: new Fuse(this.props.liste, this.fuseoptions),
            /*les ids visibles? dans le constructeur cela correspond à toutes les ids */
            visibles: this.props.liste
        };
    }

    //HANDLERS
    handleChangeText = text => {

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

    _deleteEleve = e => {
        this
            .props
            .deleteeleve(e);/** > EleveApp */
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.liste.lenght !== nextProps.liste.length) {
            /** la liste a changé ! */
            var temp = [];
            nextProps
                .liste
                .map((eleve) => {
                    temp.push(eleve)
                });
            var f = new Fuse(nextProps.liste, this.fuseoptions);
            this.setState({visibles: temp, fuse: f});
        }
    }

    //RENDER
    render() {
        return (
            <View>
                <SearchBar
                    lightTheme
                    round
                    clearIcon
                    id="recherche"
                    placeholder="Recherche..."
                    onChangeText={this.handleChangeText}/>
                <List>
                    {this
                        .state
                        .visibles
                        .map((item, i) => (<EleveItem key={item.id} eleve={item} deleteeleve={this._deleteEleve}/>))
}
                </List>
            </View>
        );
    }
}
