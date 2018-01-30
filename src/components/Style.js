import {StyleSheet} from 'react-native';

const Style = StyleSheet.create({
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'

    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'flex-start'
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
    }
});

export default Style;