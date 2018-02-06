import React from 'react'
import {View, Text, Button} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements'
import Style from '../Style'

class AboutScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({headerTitle: 'A Propos', headerLeft: <Icon
        name='arrow-back'
        onPress={() => (navigation.navigate('Liste'))}
        containerStyle={Style.iconheader}/>,});

    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={Style.container}>
                <Text>About l'app lol</Text>
            </View>
        )
    }
}

const AboutNavigator = StackNavigator({
    About: {
        screen: AboutScreen
    }
},{
    initialRouteName: 'About',
  })

export default AboutNavigator