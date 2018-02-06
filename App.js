import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import MenuNavigator from './src/navigator/MenuNavigator' //rootnavigator

import * as firebase from 'firebase';
import 'firebase/firestore'; //pas utilisable sur android à moins de eject de create-react-native & expo

// Initialize Firebase
const fire = firebase
  .initializeApp({
  apiKey: "AIzaSyDaACU0uVkmHgRYCLwtP8ZuDSqa67RIC_8",
  authDomain: "sostamarapport.firebaseapp.com",
  databaseURL: "https://sostamarapport.firebaseio.com",
  projectId: "sostamarapport",
  storageBucket: "sostamarapport.appspot.com",
  messagingSenderId: "484972558539"
})
  .database();

console.ignoredYellowBox = ['Setting a timer'] /** fuck les warning jaune dû à firebase  */

firedev = false;

const fakelist = [
  {
    id: "azdazdàakz$da484864",
    nom: "ORTAS",
    prenom: "lol",
    ddn: "ilestpasné"
  }, {
    id: "5zda54z5da4",
    nom: "gruk",
    prenom: "alan",
    ddn: "25-65-1965"
  }
]

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      liste: fakelist,
      elevesref: null
    }
  }

  componentWillMount() {
    /** on veut juste accèder à la database */
    var listedb = this.state.liste;
    if (firedev) {
      var elevesref = this
        .state
        .fire
        .ref('eleves');/** database => ref('/eleves/') , firestore => collection('eleves') */

      //pour éviter d'accéder pendant dev
      elevesref
        .once('value')
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let e = {
              nom: doc
                .val()
                .nom,
              prenom: doc
                .val()
                .prenom,
              ddn: doc
                .val()
                .ddn,
              id: doc.key
            }
            listedb.push(e);
          });
          this.setState({liste: listedb, elevesref: elevesref});
        })
        .catch((err) => {
          console.log('Error getting documents', err);
        });
    }
  }

  _removeEleve = e => {
    var lol = this.state.liste
    if (e !== null) {
      if (this.state.elevesref !== null) {
        this
          .state
          .elevesref
          .child(e.id)
          .remove()
          .then(() => {
            let index = lol.indexOf(e);
            lol.splice(index, 1);
            this.setState({liste: lol});
          });
      } else {
        let index = lol.indexOf(e);
        lol.splice(index, 1);
        this.setState({liste: lol});
      }
    };
  }

  _addEleve = e => {
    var lol = this.state.liste
    if (e !== null) {
      /**update sur firebase + recupération de l'id*/
      if (this.state.elevesref !== null) {
        this
          .state
          .elevesref
          .add(e)
          .then((doc) => {
            e.id = doc.id;
            /** push sur liste local plutot que refaire get */
            lol.push(e);
            this.setState({liste: lol});
          });
      } else {
        e.id = e.nom + 'id';
        /** push sur liste local plutot que refaire get */
        lol.push(e);
        this.setState({liste: lol});

      }

    };
  };

  render() {
    var screenProps = {
      liste: this.state.liste,
      elevesref: this.stateelevesref,
      removeeleve: this._removeEleve,
      addeleve: this._addEleve
    }
    return (<MenuNavigator screenProps={screenProps}/>);
  }
}