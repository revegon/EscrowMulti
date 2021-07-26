import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput as Input} from 'react-native-paper';

import {TextInput, NumberInput} from '../../../Components/Inputs';
import {DropDownList} from '../../../Components/DropDownList';
import {validateNid, validatePhone} from '../../../Utility/Validations';
import {AccountContext} from '../../../Contexts/AccountContext';

class PersonalInfoInputs extends React.Component {
    constructor(props) {
        super(props);
        this.fields = {
            name: '',
            nid: '',
            phone: '',
            dateOfBirth: '',
            gender: '',
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
        const {name, nid, phone, dateOfBirth, gender} = userInfo;
        let isValid = true;
        error.name = '';
        error.nid = '';
        error.phone = '';
        error.dateOfBirth = '';
        error.gender = '';
        if (!name) {
            isValid = false;
            error.name = '* Please enter your full name';
        }
        if (nid) {
            if (!validateNid(nid)) {
                isValid = false;
                error.nid = '** Invalid NID';
            }
        } else {
            isValid = false;
            error.nid = '* Please enter your NID';
        }
        if (phone) {
            if (!validatePhone(phone)) {
                isValid = false;
                error.phone = '** Invalid Mobile Number';
            }
        } else {
            isValid = false;
            error.phone = '* Please enter your phone';
        }
        if (!dateOfBirth) {
            isValid = false;
            error.dateOfBirth = '* Please confirm your dateOfBirth';
        }
        if (!gender) {
            isValid = false;
            error.gender = '* Please select your gender';
        }

        this.setState({error});
        return isValid;
    }

    render() {
        const {DateInputComponent} = this.props;
        const {userInfo, error} = this.state;
        const {name, nid, phone, dateOfBirth, gender} = userInfo;
        return (
            <View style={styles.inputSection}>
                <TextInput
                    label="Full Name"
                    value={name}
                    onChangeText={value => this.onTextChange('name', value)}
                    errorMessage={error.name}
                />
                <NumberInput
                    label="NID (National ID)"
                    value={nid}
                    onChangeText={value => this.onTextChange('nid', value)}
                    errorMessage={error.nid}
                />
                <NumberInput
                    label="Mobile Number"
                    value={phone}
                    onChangeText={value => this.onTextChange('phone', value)}
                    errorMessage={error.phone}
                    left={<Input.Affix text="+88" />}
                />
                <DateInputComponent
                    label="Date of Birth"
                    value={dateOfBirth}
                    onChange={value => this.onTextChange('dateOfBirth', value)}
                    errorMessage={error.dateOfBirth}
                />
                <DropDownList
                    label="Gender"
                    value={gender}
                    onChange={value => this.onTextChange('gender', value)}
                    errorMessage={error.gender}
                    choiceList={['Male', 'Female', 'Other']}
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

PersonalInfoInputs.contextType = AccountContext;

export {PersonalInfoInputs};
