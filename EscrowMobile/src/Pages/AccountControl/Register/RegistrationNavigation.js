import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';

import {AccountInfo} from './AccountInfo';
import {PersonalInfo} from './PersonalInfo';
import {AddressTaker} from './AddressTaker';
import ProfileImageTaker from './ProfileImageTaker';
import {registerPages} from 'core';

class RegistrationNavigation extends React.Component {
    Stack = createStackNavigator();

    getComponent = (Component, addditionalProps = {}) => {
        return <Component {...this.props} {...addditionalProps} />;
    };

    render() {
        const {Navigator, Screen} = this.Stack;
        return (
            <Navigator
                initialRouteName={registerPages.ACCOUNT_INFO}
                screenOptions={{headerShown: false}}>
                <Screen name={registerPages.ACCOUNT_INFO}>
                    {props => this.getComponent(AccountInfo, props)}
                </Screen>
                <Screen name={registerPages.PERSONAL_INFO}>
                    {props => this.getComponent(PersonalInfo, props)}
                </Screen>
                <Screen name={registerPages.ADDRESS_TAKER}>
                    {props => this.getComponent(AddressTaker, props)}
                </Screen>
                <Screen name={registerPages.PROFILE_IMAGE_TAKER}>
                    {props => this.getComponent(ProfileImageTaker, props)}
                </Screen>
            </Navigator>
        );
    }
}

export {RegistrationNavigation};
