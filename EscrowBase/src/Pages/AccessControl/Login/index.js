import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {AccountContext} from '../../../Contexts/AccountContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    EmailInput,
    PasswordInput,
} from '../../../Components/Inputs';
import {validateEmail} from '../../../Utility/Validations';
import {storageKeys} from '../../../Utility/enums';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            email: '',
            errorEmail: '',
            errorPassword: '',
        };
    }

    componentDidMount() {
        AsyncStorage.getItem(storageKeys.credentials, (e, cred) => {
            if (e) {
                console.log(e);
            } else {
                this.setState({email: cred && cred.email});
            }
        });
    }

    onTextChange(field, value) {
        const state = {};
        state[field] = value;
        this.setState(state);
    }

    verifyInputs() {
        const {email, password} = this.state;
        let isValid = true;
        const state = {
            errorEmail: '',
            errorPassword: '',
        };
        if (!validateEmail(email)) {
            state.errorEmail = 'Invalid email';
            isValid = false;
        }
        if (!password) {
            state.errorPassword = 'Invalid password';
            isValid = false;
        }
        if (isValid) {
            this.performSignIn();
        } else {
            this.setState(state);
        }
    }

    performSignIn() {
        const {email, password} = this.state;
        const credentials = {email, password};
        const {accountContext} = this.context;
        const {showLoading, showError, hideLoading} = this.props;
        showLoading();
        accountContext.onSignedIn(credentials).then(
            () => {
                hideLoading();
            },
            error => showError(error),
        );
    }

    render() {
        const {email, password, errorEmail, errorPassword} = this.state;
        return (
            <View style={styles.inputSection}>
                <EmailInput
                    label="Email Address"
                    value={email}
                    onChangeText={value => this.onTextChange('email', value)}
                    errorMessage={errorEmail}
                />
                <PasswordInput
                    label="Password"
                    value={password}
                    onChangeText={value => this.onTextChange('password', value)}
                    errorMessage={errorPassword}
                />
                <Button
                    mode="contained"
                    style={styles.okBtn}
                    onPress={() => this.verifyInputs()}>
                    Submit
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    okBtn: {
        marginTop: 20,
        alignSelf: 'center',
    },
    inputSection: {
        flex: 2.5,
    },
});

Login.contextType = AccountContext;

export {Login};
