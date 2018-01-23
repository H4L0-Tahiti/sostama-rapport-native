import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

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
            <View>
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
            </View>
        )
    }
}
