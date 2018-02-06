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
            .goBack(null);
    };

    _ajoutEleve = e => {
        //ajout json eleve dans le fichier
        if ((this.state.nom === "") || (this.state.prenom === "") || (this.state.ddn === "")) {
            this.setState({require: true});
        } else {
            let e = {
                /** id sera rempli par firebase */
                "nom": this.state.nom,
                "prenom": this.state.prenom,
                "ddn": this.state.ddn
            };
            this.props.addeleve(e)
            this
                .props
                .navigation.goBack(null)/** retour vers EleveApp */
        }
    };

    handleNom = text => {
        this.setState({nom: text})
    }
    handlePrenom = text => {
        this.setState({prenom: text})
    }
    handleDDN = text => {
        this.setState({ddn: text})
    }

    render() {
        return (
            <View style={Style.container}>
                {this.state.require && <Text style={Style.errortext}>*Veuillez remplir tous les champs*</Text>}
                <TextField required id="ajoutnom" label="Nom" onChangeText={this.handleNom}/>
                <TextField
                    required
                    id="ajoutprenom"
                    label="Prénom"
                    onChangeText={this.handlePrenom}/>
                <TextField
                    required
                    id="ajoutddn"
                    label="Date de naissance"
                    type="date"
                    defaultValue="2000-01-01"
                    onChangeText={this.handleDDN}/>
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
