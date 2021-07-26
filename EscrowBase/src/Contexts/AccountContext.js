import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {storageKeys} from '../Utility/enums';

export const AccountContext = React.createContext({
    isSignedIn: false,
    userInfo: {},
    updateUserInfo: userInfo => console.log(userInfo),
    onSignedIn: userCredentials => console.log(userCredentials),
    onSignOut: () => {},
    onRegister: () => {},
});

export class AccountContextProvider extends React.Component {
    state = {
        isSignedIn: false,
        userInfo: {},
    };

    updateUserInfo = info => {
        this.setState(state => {
            const {userInfo} = state;
            return {
                userInfo: {
                    ...userInfo,
                    ...info,
                },
            };
        });
    };

    saveCredentials = userCredentials => {
        const jsonValue = JSON.stringify(userCredentials);
        AsyncStorage.setItem(storageKeys.credentials, jsonValue);
    };

    onSignedIn = userCredentials => {
        // perform signin with userCredentials
        const userInfo = {...userCredentials};
        this.saveCredentials(userCredentials);
        this.setState({userInfo, isSignedIn: true});
    };

    onSignOut = () => {
        // perform signout
        this.setState({userInfo: {}, isSignedIn: false});
    };

    onRegister = () => {
        const {userInfo} = this.state;
        // perform registration and login
        const {email, password} = userInfo;
        this.saveCredentials({email, password});
        this.setState({isSignedIn: true});
    };

    render() {
        const {children} = this.props;
        const {userInfo, isSignedIn} = this.state;
        return (
            <AccountContext.Provider
                value={{
                    userInfo,
                    isSignedIn,
                    updateUserInfo: this.updateUserInfo,
                    onSignedIn: this.onSignedIn,
                    onSignOut: this.onSignOut,
                    onRegister: this.onRegister,
                }}>
                {children}
            </AccountContext.Provider>
        );
    }
}
