import React from 'react';

import {BaseRegisterComponent} from './BaseRegisterComponent';
import {DateInput} from '../../../Components/DateInput';
import {registerPages, PersonalInfoInputs} from 'core';

class PersonalInfo extends BaseRegisterComponent {
    constructor(props) {
        super(props);
        this.title = 'Personal Information';
    }

    onBackPressed() {
        this.props.navigation.goBack();
    }

    performNext() {
        const {navigation} = this.props;
        navigation.navigate(registerPages.ADDRESS_TAKER);
    }

    renderInputs() {
        return (
            <PersonalInfoInputs
                DateInputComponent={DateInput}
                ref={ref => (this.inputComponent = ref)}
            />
        );
    }
}

export {PersonalInfo};
