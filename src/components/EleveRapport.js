import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {TextButton, RaisedTextButton} from 'react-native-material-buttons';
import {TextField} from 'react-native-material-textfield';

import Style from '../Style';

export default class EleveRapport extends Component {

    constructor(props) {
        super(props);

    }

    _mail = () => {
        console.log("yeee ça mail");
        this
            .props
            .navigation
            .goBack();
    };

    _annuler = () => {
        this
            .props
            .navigation
            .goBack();
    };

    render() {
        var e = this.props.eleve; //amener par navigate
        return (
            <View style={Style.container}>
                <TextField
                    multiline={true}
                    editable
                    label="Rédiger votre rapport"
                    rows="10"
                    title="Une fois votre rapport rédigé, appuyez sur le boutton Mail"/>

                <View style={Style.buttonrow}>

                    <RaisedTextButton style={Style.button} title='Annuler' onPress={this._annuler}/>
                    <RaisedTextButton
                        style={Style.button}
                        title='Mail to boss'
                        onPress={this._mail}/>
                </View>

            </View>
        )
    }
}
