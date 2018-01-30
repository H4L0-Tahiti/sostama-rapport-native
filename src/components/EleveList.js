import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import {Text, View, TextInput} from 'react-native';
import {List, ListItem, SearchBar, Header, Button} from 'react-native-elements'
import Modal from 'react-native-modal'

import Style from './Style'

import * as firebase from 'firebase';
import 'firebase/firestore'; //pas utilisable sur android à moins de eject de create-react-native & expo

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDaACU0uVkmHgRYCLwtP8ZuDSqa67RIC_8",
    authDomain: "sostamarapport.firebaseapp.com",
    databaseURL: "https://sostamarapport.firebaseio.com",
    projectId: "sostamarapport",
    storageBucket: "sostamarapport.appspot.com",
    messagingSenderId: "484972558539"
});

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

//import EleveRapport from './EleveRapport'

export class EleveItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            deleteopen: false
        }

    };

    /**RAPPORT handlers */
    _rapportOpen = () => { //utilise pou affiche la fiche élève
        console.log("rapport");
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
            .deleteeleve(this.props.eleve)/** > EleveList */
    };

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
                    backdropOpacity={0.5}>
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

    static navigationOptions = ({navigation}) => {
        title : 'SOSTama-Rapport'
    };
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
            fuse: null,
            /*les ids visibles? dans le constructeur cela correspond à toutes les ids */
            visibles: [],

            /** database et non pas firestore tant que pas d'update */
            fire: firebase.database(),
            /** la liste des eleves */
            liste: fakelist,
            /* firebase firestore ref*/
            elevesref: null,
            /** ouverture du menu */
            anchorEl: null,
            /** ouvrir ou pas la page d'ajout d eleve */
            ajoutopen: false
        };
    }

    componentWillMount() {

        var listedb = this.state.liste;
        var fuse = new Fuse(listedb, this.fuseoptions);

        var elevesref = this
            .state
            .fire
            .ref('eleves');/** database => ref('/eleves/') , firestore => collection('eleves') */

        console.ignoredYellowBox = ['Setting a timer']/**temporaire */
        /*
    elevesref
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let d = doc.data();
          let e = {
            id: doc.id,
            nom: d.nom,
            prenom: d.prenom,
            ddn: d.ddn
          }
          listedb.push(e);
        });
        this.setState({liste: listedb, elevesref: elevesref});
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });*/

        if (firedev) {
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
                    this.setState({
                        liste: listedb,
                        fuse: new Fuse(listedb, this.fuseoptions),
                        visibles: listedb,
                        elevesref: elevesref
                    });
                })
                .catch((err) => {
                    console.log('Error getting documents', err);

                });
        } else {
            this.setState({
                liste: listedb,
                fuse: new Fuse(listedb, this.fuseoptions),
                visibles: listedb,
                elevesref: elevesref
            });
        }
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
            this.setState({visibles: this.state.liste});
        } else {
            this.setState({visibles: tempset});
        }

    };

    _deleteEleve = e => {
        /**on retire eleve-id de firebaseref et de la liste */
        var lol = this.state.liste
        /*
        if (e !== null) {
          this
            .state
            .elevesref
            .doc(e.id)
            .delete()
            .then(() => {
              let index = lol.indexOf(e);
              lol.splice(index, 1);
              this.setState({anchorEl: null, ajoutopen: false, liste: lol});
            });

      }; */

        if (e !== null) {
            if (firedev) {
                this
                    .state
                    .elevesref
                    .child(e.id)
                    .remove()
                    .then(() => {
                        let index = lol.indexOf(e);
                        lol.splice(index, 1);
                        this.setState({anchorEl: null, ajoutopen: false, liste: lol});
                    });
            } else {
                let index = lol.indexOf(e);
                lol.splice(index, 1);
                this.setState({anchorEl: null, ajoutopen: false, liste: lol});
            }

        };
        console.log(lol);

    }

    handleMenuOpen = e => {
        //au lieu de gérer true ou false, on gère object ou null via Boolean
        this.setState({anchorEl: e.currentTarget, menuopen: true});

    }

    handleMenuClose = () => {
        /** anchorEl null => Boolean(anchorEl) false */
        this.setState({anchorEl: null})
    }

    handleAjoutOpen = () => {
        /*bug: setstate sur anchorEl : null fait perdre le focus de EleveAdd
        cheat dans handleAjoutClose car EleveAdd est fullscreen, on verra pas la diff xD */
        this.setState({ajoutopen: true});
    }

    handleAjoutClose = e => {
        var lol = this.state.liste
        if (e !== null) {
            /**update sur firebase + recupération de l'id*/
            this
                .state
                .elevesref
                .add(e)
                .then((doc) => {
                    e.id = doc.id;
                    /** push sur liste local plutot que refaire get */
                    lol.push(e);
                    this.setState({anchorEl: null, ajoutopen: false, liste: lol});
                });

        };
        l(lol);
    };

    //RENDER
    render() {
        return (
            <View style={Style.container}>
                <Header
                    leftComponent={{
                    icon: 'menu',
                    color: '#fff'
                }}
                    centerComponent={{
                    text: 'MY TITLE',
                    style: {
                        color: '#fff'
                    }
                }}
                    rightComponent={{
                    icon: 'home',
                    color: '#fff'
                }}/>
                <SearchBar
                    lightTheme
                    round
                    clearIcon
                    id="recherche"
                    placeholder="Recherche..."
                    onChangeText={this._changeText}/>
                <List>
                    {this
                        .state
                        .visibles
                        .map((item, i) => (<EleveItem
                            key={item.id}
                            eleve={item}
                            deleteeleve={this._deleteEleve}
                            navigation={this.props.navigation}/>))
}
                </List>
            </View>
        );
    }
}
