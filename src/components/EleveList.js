import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import {Text, View, TextInput, FlatList} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'
import { List, ListItem, SearchBar} from 'react-native-elements'

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
    handleRapportOpen = () => { //utilise pou affiche la fiche élève
        this.setState({rapportopen: true});
    };

    handleRapportClose = () => {
        this.setState({rapportopen: false});
    };

    /** DELETE handlers */
    handleDeleteOpen = () => {
        this.setState({deleteopen: true});

    };
    handleDeleteClose = () => {
        this.setState({deleteopen: false});
    }

    handleDeleteEleve = e => {
        this.setState({deleteopen: false});
        this
            .props
            .deleteeleve(this.props.eleve)/** > EleveList */
    };
    /**RENDER */
    render() {

        return (
            <ListItem>
                <Text id={this.props.eleve.id}>{this.props.eleve.nom + " " + this.props.eleve.prenom}</Text>
                {/*<ListItemSecondaryAction>
                        <IconButton onClick={this.handleDeleteOpen}>
                            <DeleteIcon/>
                        </IconButton>
                        {this.state.deleteopen && <Dialog
                            id={"dialog-delete-" + this.props.eleve.id}
                            open={this.state.deleteopen}
                            onClose={this.handleDeleteClose}>
                            <DialogTitle id="alert-dialog-title">{"Supprimer " + this.props.eleve.nom + " " + this.props.eleve.prenom + "?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Etes vous sûr de vouloir supprimer cette élève de la base de données ?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleDeleteClose} color="primary" autoFocus>
                                    Annuler
                                </Button>
                                <Button onClick={this.handleDeleteEleve} color="primary">
                                    Supprimer
                                </Button>
                            </DialogActions>
                        </Dialog>}
                        </ListItemSecondaryAction>*/}

                {/*this.state.rapportopen && <EleveRapport
                    eleve={this.props.eleve}
                    open={this.state.rapportopen}
                onClose={this.handleRapportClose}/>*/}
            </ListItem>
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

    handleDeleteEleve = e => {
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

    //FLATLIST options
    _keyExtractor = (item, index) => item.id;
    _renderItem = ({item}) => (<EleveItem eleve={item} deleteeleve={this.handleDeleteEleve}/>);

    //RENDER
    render() {
        return (
            <View style={{flex:1}}>
                <SearchBar   style={{flex:1}} lightTheme round
                    id="recherch"
                    type="search"
                    placeholder="Recherche..."
                    onChangeText={this.handleChangeText}/>
                <FlatList 
                    data={this.state.visibles}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}/>
            </View>
        );
    }
}
