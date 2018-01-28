import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackNavigator} from 'react-navigation';
import EleveList from './src/components/EleveList';
import * as firebase from 'firebase';
import 'firebase/firestore'; //pas utilisable sur android à moins de eject de create-react-native & expo
import {Header} from 'react-native-elements';

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDaACU0uVkmHgRYCLwtP8ZuDSqa67RIC_8",
  authDomain: "sostamarapport.firebaseapp.com",
  databaseURL: "https://sostamarapport.firebaseio.com",
  projectId: "sostamarapport",
  storageBucket: "sostamarapport.appspot.com",
  messagingSenderId: "484972558539"
});

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
    super(props);

    this.state = {/** database et non pas firestore tant que pas d'update */
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

    var listedb=this.state.liste;

    var elevesref = this
      .state
      .fire
      .ref('eleves');/** database => ref('/eleves/') , firestore => collection('eleves') */

      console.ignoredYellowBox = [ 'Setting a timer' ] /**temporaire */
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
      
    elevesref
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let e = {
            nom: doc.val().nom,
            prenom: doc.val().prenom,
            ddn: doc.val().ddn,
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

  handleDeleteEleve = e => {
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

};
    console.log(lol);

  }

  render() {
    return (
      <View>
        <Header
          leftComponent={{
          icon: 'menu',
          color: '#fff'
        }}
          centerComponent={{
          text: 'SOSTAMA-Rapport',
          style: {
            color: '#fff'
          }
        }}
          rightComponent={{
          icon: 'home',
          color: '#fff'
        }}/>
        <EleveList liste={this.state.liste} deleteeleve={this.handleDeleteEleve}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  titlestyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
