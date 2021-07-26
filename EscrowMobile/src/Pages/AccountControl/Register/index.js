import React from 'react';
import {RegistrationNavigation} from './RegistrationNavigation';

class Register extends React.Component {
    onBackPressed = () => {
        this.props.navigation.goBack();
    };

    render() {
        return <RegistrationNavigation onBackPressed={this.onBackPressed} />;
    }
}

export {Register};
