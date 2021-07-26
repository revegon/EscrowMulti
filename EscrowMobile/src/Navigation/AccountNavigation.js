import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';

import {AccountControl, Login, Register} from '../Pages/AccountControl';
import {accountPages} from '../Utility/enums';

class AccountNavigation extends React.Component {
    constructor(props) {
        super(props);
    }

    Stack = createStackNavigator();

    getComponent = (Component, addditionalProps = {}) => {
        return <Component {...this.props} {...addditionalProps} />;
    };

    render() {
        const Screen = this.Stack.Screen;
        const Navigator = this.Stack.Navigator;
        return (
            <Navigator
                initialRouteName={accountPages.BASE}
                screenOptions={{headerShown: false}}>
                <Screen name={accountPages.BASE}>
                    {props => this.getComponent(AccountControl, props)}
                </Screen>
                <Screen name={accountPages.LOGIN}>
                    {props => this.getComponent(Login, props)}
                </Screen>
                <Screen name={accountPages.REGISTER}>
                    {props => this.getComponent(Register, props)}
                </Screen>
            </Navigator>
        );
    }
}

export {AccountNavigation};
