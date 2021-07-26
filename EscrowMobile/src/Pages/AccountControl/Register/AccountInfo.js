import React from 'react';
import {registerPages, AccountInfoInputs} from 'core';
import {BaseRegisterComponent} from './BaseRegisterComponent';

class AccountInfo extends BaseRegisterComponent {
    constructor(props) {
        super(props);
        this.title = 'Account Information';
    }

    onBackPressed() {
        if (this.props.onBackPressed) {
            this.props.onBackPressed();
        }
    }

    performNext() {
        const {navigation} = this.props;
        navigation.navigate(registerPages.PERSONAL_INFO);
    }

    renderInputs() {
        return <AccountInfoInputs ref={ref => (this.inputComponent = ref)} />;
    }
}

export {AccountInfo};
