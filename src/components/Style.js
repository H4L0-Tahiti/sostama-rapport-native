import {StyleSheet} from 'react-native';

const Style = StyleSheet.create({
    homestyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    liststyle: {
        flex: 1,
        alignItems: 'stretch',
        height: 50,
        justifyContent: 'flex-start'
    },
    listitemstyle: {
        alignItems: 'stretch'
    },
    titlestyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        justifyContent: 'space-around'
    },
    addstyle: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Style;