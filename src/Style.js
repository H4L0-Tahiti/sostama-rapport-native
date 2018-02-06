import {StyleSheet} from 'react-native';

const Style = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        padding: 10
    },
    buttonrow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'flex-end',
        padding: 10
    },
    button: {
        margin: 4
    },
    iconheader: {
        margin: 10
    },
    searchbar: {
        backgroundColor: '#fff',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        marginBottom: -21,
        marginTop:-10,
    },
    errortext:{
        color:"red",
    }
});

export default Style;