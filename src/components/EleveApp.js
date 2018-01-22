import React, {Component} from 'react';
import PropTypes from 'prop-types';
import List, {ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Fuse from 'fuse.js';
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import AppBar from 'material-ui/AppBar/AppBar';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import Typography from 'material-ui/Typography/Typography';
import FormLabel from 'material-ui/Form/FormLabel';
import MenuIcon from 'material-ui-icons/Menu';
import DeleteIcon from 'material-ui-icons/Delete';
import Save from 'material-ui-icons/Save';

import FormGroup from 'material-ui/Form/FormGroup';
import Menu from 'material-ui/Menu/Menu';
import MenuItem from 'material-ui/Menu/MenuItem';

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const l = console.log;

export class EleveAdd extends Component { //ajout eleve dasn le fichie

    constructor(props) {
        super(props);

        this.state = {
            nom: "",
            prenom: "",
            ddn: "",
            require: false
        }

    }

    handleClose = () => {
        this
            .props
            .onClose(null)
    };

    handleAjoutClose = e => {
        //ajout json eleve dans le fichier
        if ((this.state.nom === "") || (this.state.prenom === "") || (this.state.ddn === "")) {
            e.preventdefault();
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
            <div>
                <Dialog open={this.props.open} onClose={this.handleClose} fullScreen={true}>
                    <AppBar>
                        <Toolbar>
                            <IconButton color="contrast" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography type="title" color="inherit">
                                Ajouter un éleve
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogTitle id="alert-dialog-title">{"."}</DialogTitle>
                    <DialogContent>
                        <FormControl>
                            {this.state.require && <FormHelperText error>Veuillez remplir les champs requis.</FormHelperText>}
                            <TextField
                                required
                                id="ajoutnom"
                                label="Nom"
                                placeholder="Nom"
                                margin="normal"
                                onChange={this.handleNom}
                                InputLabelProps={{
                                shrink: true
                            }}/>
                            <TextField
                                required
                                id="ajoutprenom"
                                label="Prénom"
                                placeholder="Prénom"
                                margin="normal"
                                onChange={this.handlePrenom}
                                InputLabelProps={{
                                shrink: true
                            }}/>
                            <TextField
                                required
                                id="ajoutddn"
                                label="Date de naissance"
                                type="date"
                                defaultValue="2000-01-01"
                                margin="normal"
                                onChange={this.handleDDN}
                                InputLabelProps={{
                                shrink: true
                            }}/>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button raised onClick={this.handleAjoutClose} color="primary">
                            <Save/>
                            Ajouter l'élève
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

//marche !
export class EleveRapport extends Component {

    constructor(props) {
        super(props);

        this.state = {
            eleve: props.eleve
        }
    }

    handleClose = () => {
        this
            .props //callbaaaack pour ramener le state au parent
            .onClose()
    };

    handleMail = () => {
        l("yeee ça mail");
        this
            .props
            .onClose()
    };

    render() {
        var e = this.state.eleve;
        return (
            <div>
                <Dialog open={this.props.open} onClose={this.handleClose} fullScreen={true}>
                    <AppBar>
                        <Toolbar>
                            <IconButton color="contrast" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography type="title" color="inherit">
                                {e.nom + " " + e.prenom + " " + e.ddn}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogTitle id="alert-dialog-title">{"."}</DialogTitle>
                    <DialogContent>
                        <TextField
                            multiline
                            fullWidth
                            label="Rédiger votre rapport"
                            rows="10"
                            helperText="Une fois votre rapport rédigé, appuyez sur le boutton Mail"/>
                    </DialogContent>
                    <DialogActions>
                        <Button raised onClick={this.handleMail} color="primary">
                            Mail to boss
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export class EleveItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eleve: props.eleve,
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
            .deleteeleve(this.state.eleve)/** > EleveList */
    };
    /**RENDER */
    render() {

        return (
            <div>
                <ListItem
                    button
                    onClick={this.handleRapportOpen}
                    disabled={this.state.rapportopen}>
                    <ListItemText primary={this.state.eleve.nom + " " + this.state.eleve.prenom}/>
                    <ListItemSecondaryAction>
                        <IconButton onClick={this.handleDeleteOpen}>
                            <DeleteIcon/>
                        </IconButton>
                        {this.state.deleteopen && <Dialog
                            id={"dialog-delete-" + this.state.eleve.id}
                            open={this.state.deleteopen}
                            onClose={this.handleDeleteClose}>
                            <DialogTitle id="alert-dialog-title">{"Supprimer " + this.state.eleve.nom + " " + this.state.eleve.prenom + "?"}</DialogTitle>
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
                    </ListItemSecondaryAction>
                </ListItem>
                {this.state.rapportopen && <EleveRapport
                    eleve={this.state.eleve}
                    open={this.state.rapportopen}
                    onClose={this.handleRapportClose/*callbaaaaaack*/}/>}
            </div>
        )
    }

}

export class EleveList extends Component {

    //fuse
    fuseoptions = {
        keys: [
            'nom', 'prenom'
        ],
        id: 'id',
        shouldSort: true
    };

    constructor(props) {
        super(props);
        var tempset = new Set();
        props
            .liste
            .map((eleve) => {
                tempset.add(eleve.id + "")
            });

        this.state = {
            /* moteur de recherche*/
            fuse: new Fuse(this.props.liste, this.fuseoptions),
            /*les ids visibles? dans le constructeur cela correspond à toutes les ids */
            visibleids: tempset,
            /** toutes les ids */
            allids: tempset
        };
    }

    //HANDLERS
    handleChange = event => {

        //utilisé dans la recherche

        var tempset = new Set();
        this
            .state
            .fuse
            .search(event.target.value)
            .map((id) => (tempset.add(id)));

        if (tempset.size === 0) {
            /** la recherche a ramene null, on affiche tout */
            this.setState({visibleids: this.state.allids});
        } else {
            this.setState({visibleids: tempset});
        }
    };

    handleDeleteEleve = e => {
        this
            .props
            .deleteeleve(e);/** > EleveApp */
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.allids.size !== nextProps.liste.length) {
            /** la liste a changé ! */
            var temp = new Set();
            nextProps
                .liste
                .map((eleve) => {
                    temp.add(eleve.id + "")
                });
            var f = new Fuse(nextProps.liste, this.fuseoptions);
            this.setState({allids: temp, visibleids: temp, fuse: f});
        }
    }

    //RENDER
    render() {
        return (
            <div>
                <FormControl>
                    <TextField
                        id="recherche"
                        type="search"
                        placeholder="Recherche..."
                        onChange={this.handleChange}/>
                </FormControl>
                <List>
                    {this
                        .props
                        .liste
                        .map((eleve) => <div key={"elevedv-" + eleve.id}>{this
                                .state
                                .visibleids
                                .has(eleve.id + "") && (<EleveItem
                                    key={eleve.id}
                                    eleve={eleve}
                                    deleteeleve={this.handleDeleteEleve}/>)}
                        </div>)}
                </List>
            </div>
        );
    }
}

export default class EleveApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            /** la liste des eleves */
            liste: [],
            /* firebase firestore*/
            elevesref: null,
            /** ouverture du menu */
            anchorEl: null,
            /** ouvrir ou pas la page d'ajout d eleve */
            ajoutopen: false
        }

    };

    componentWillMount() {

        var listedb = [];
        var elevesref = this
            .props
            .db
            .collection('eleves');

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
        if (e !== null) {
            this
                .state
                .elevesref
                .doc(e.id)
                .delete() /** delete de eleve de firestore */
                .then(() => {
                    let index = lol.indexOf(e);
                    lol.splice(index, 1); /** delete de la liste locale */
                    this.setState({anchorEl: null, ajoutopen: false, liste: lol});
                });

        };
        l(lol);

    }

    render() {
        return (
            <div>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <IconButton color="contrast" aria-label="Menu" onClick={this.handleMenuOpen}>
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu_app"
                            anchorEl={this.state.anchorEl/*où le menu s'ouvre*/}
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleMenuClose/*permet de femer en cliquant hors du menu*/}>
                            <MenuItem onClick={this.handleAjoutOpen}>Ajout Eleve</MenuItem>
                            {/** on de render même pas un dialog fermer*/}
                            {this.state.ajoutopen && <EleveAdd open={this.state.ajoutopen} onClose={this.handleAjoutClose}/>}
                        </Menu>
                        <Typography type="title" color="inherit">
                            SOSTAMA
                        </Typography>
                        <Button color="contrast">Login</Button>
                    </Toolbar>
                </AppBar><br/>
                <Typography type="title" color="inherit" align="center">
                    Liste des élèves
                </Typography>
                <EleveList liste={this.state.liste} deleteeleve={this.handleDeleteEleve}/>
            </div>
        );
    }

}