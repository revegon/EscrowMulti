import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
    TextInput,
    PasswordInput,
    EmailInput,
} from '../../../Components/Inputs';
import { AccountContext } from '../../../Contexts/AccountContext';
import {validateUsername, validateEmail, validatePassword} from '../../../Utility/Validations';

class AccountInfoInputs extends React.Component {
    constructor(props) {
        super(props);
        this.fields = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
        this.state = {
            userInfo: {
                ...this.fields,
            },
            error: {
                ...this.fields,
            },
        };
    }

    onTextChange(field, value) {
        const {userInfo} = this.state;
        userInfo[field] = value;
        this.setState({userInfo});
    }

    // exposed method
    updateUserInfo() {
        const {userInfo} = this.state;
        const {updateUserInfo} = this.context;
        updateUserInfo(userInfo);
    }

    // exposed method
    verifyInputValues() {
        const {userInfo, error} = this.state;
        const {username, email, password, confirmPassword} = userInfo;
        let isValid = true;
        error.username = '';
        error.email = '';
        error.password = '';
        error.confirmPassword = '';

        if (username) {
            if (!validateUsername(username)) {
                isValid = false;
                error.username =
                    '** Invalid username. A username must be 4 to 20 charecters ' +
                    'long and should contain only charecters, numbers and _(underscore)';
            }
        } else {
            isValid = false;
            error.username = '* Please enter your username';
        }
        if (email) {
            if (!validateEmail(email)) {
                isValid = false;
                error.email = '** Invalid Email Address';
            }
        } else {
            isValid = false;
            error.email = '* Please enter your email address';
        }
        if (password) {
            if (!validatePassword(password)) {
                isValid = false;
                error.password =
                    '** password must contain atleast a number and a charecter and be 8 charecters long';
            }
        } else {
            isValid = false;
            error.password = '* Please enter your password';
        }
        if (confirmPassword) {
            if (password && password !== confirmPassword) {
                isValid = false;
                error.confirmPassword = '** passwords do not match';
            }
        } else {
            isValid = false;
            error.confirmPassword = '* Please confirm your password';
        }

        this.setState({error});
        return isValid;
    }

    render() {
        const {userInfo, error} = this.state;
        const {username, email, password, confirmPassword} = userInfo;
        return (
            <View style={styles.inputSection}>
                <TextInput
                    label="Username"
                    value={username}
                    onChangeText={value => this.onTextChange('username', value)}
                    errorMessage={error.username}
                />
                <EmailInput
                    label="Email Address"
                    value={email}
                    onChangeText={value => this.onTextChange('email', value)}
                    errorMessage={error.email}
                />
                <PasswordInput
                    label="Password"
                    value={password}
                    onChangeText={value => this.onTextChange('password', value)}
                    errorMessage={error.password}
                />
                <PasswordInput
                    label="Confirm Password"
                    value={confirmPassword}
                    onChangeText={value =>
                        this.onTextChange('confirmPassword', value)
                    }
                    errorMessage={error.confirmPassword}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputSection: {
        flex: 2.5,
    },
});

AccountInfoInputs.contextType = AccountContext;

export {AccountInfoInputs};
