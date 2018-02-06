import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {TextButton, RaisedTextButton} from 'react-native-material-buttons';
import {TextField} from 'react-native-material-textfield';
import Style from '../Style';

export default class EleveAdd extends Component { //ajout eleve dasn le fichie

    constructor(props) {
        super(props);

        this.state = {
            nom: "",
            prenom: "",
            ddn: "",
            require: false
        }

    }

    _annuler = () => {
        this
            .props
            .navigation
            .navigate('Liste');
    };

    _ajoutEleve = e => {
        //ajout json eleve dans le fichier
        if ((this.state.nom === "") || (this.state.prenom === "") || (this.state.ddn === "")) {
            this.setState({require: true});
        } else {
            let eleve = {
                /** id sera rempli par firebase */
                "nom": this.state.nom,
                "prenom": this.state.prenom,
                "ddn": this.state.ddn
            };

            this
                .props
                .onClose(eleve)/** retour vers EleveApp */
        }
    };

    handleNom = e => {
        this.setState({nom: e.target.value})
    }
    handlePrenom = e => {
        this.setState({prenom: e.target.value})
    }
    handleDDN = e => {
        this.setState({ddn: e.target.value})
    }

    render() {
        return (
            <View style={Style.container}>
                {this.state.require && <Text style={Style.errortext}>*Veuillez remplir tous les champs*</Text>}
                <TextField required id="ajoutnom" label="Nom" onChange={this.handleNom}/>
                <TextField
                    required
                    id="ajoutprenom"
                    label="Prénom"
                    onChange={this.handlePrenom}/>
                <TextField
                    required
                    id="ajoutddn"
                    label="Date de naissance"
                    type="date"
                    defaultValue="2000-01-01"
                    onChange={this.handleDDN}/>
                <View style={Style.buttonrow}>
                    <RaisedTextButton style={Style.button} title='Annuler' onPress={this._annuler}/>
                    <RaisedTextButton
                        style={Style.button}
                        title="Ajouter l'élève"
                        onPress={this._ajoutEleve}/>
                </View>

            </View>
        )
    }
}
