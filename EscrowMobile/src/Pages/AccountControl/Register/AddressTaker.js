import React from 'react';
import {AddressTakerInputs, registerPages} from 'core';
import {BaseRegisterComponent} from './BaseRegisterComponent';

class AddressTaker extends BaseRegisterComponent {
    constructor(props) {
        super(props);
        this.title = 'Address';
    }

    onBackPressed() {
        this.props.navigation.goBack();
    }

    performNext() {
        const {navigation} = this.props;
        navigation.navigate(registerPages.PROFILE_IMAGE_TAKER);
    }

    renderInputs() {
        return <AddressTakerInputs ref={ref => (this.inputComponent = ref)} />;
    }
}

export {AddressTaker};
