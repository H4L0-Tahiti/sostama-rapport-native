import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

export default class EleveRapport extends Component {

    constructor(props) {
        super(props);

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
        var e = this.props.eleve;
        return (
            <View>
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
            </View>
        )
    }
}
