import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextArea, NumberInput} from '../../../Components/Inputs';
import {DropDownList} from '../../../Components/DropDownList';
import {areaList} from '../../../../assets';
import { AccountContext } from '../../../Contexts/AccountContext';

class AddressTakerInputs extends React.Component {
    constructor(props) {
        super(props);
        this.fields = {
            division: '',
            district: '',
            upazilla: '',
            address: '',
            zipCode: '',
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
        const {division, district, upazilla, address, zipCode, error} =
            this.state;
        let isValid = true;
        error.division = '';
        error.district = '';
        error.upazilla = '';
        error.address = '';
        error.zipCode = '';
        if (!division) {
            isValid = false;
            error.division = '* Please select your division';
        }
        if (!district) {
            isValid = false;
            error.district = '* Please enter your district';
        }
        if (!upazilla) {
            isValid = false;
            error.upazilla = '* Please enter your upazilla';
        }
        if (zipCode) {
            if (zipCode.length !== 4) {
                isValid = false;
                error.zipCode = '** Invalid zip code';
            }
        } else {
            isValid = false;
            error.zipCode = '* Please enter your address zip code';
        }
        if (!address) {
            isValid = false;
            error.address = '* Please enter your detailed address';
        }

        this.setState({error});
        return isValid;
    }

    getChoices(field) {
        if (field === 'division') {
            return Object.keys(areaList);
        } else {
            const {division, district} = this.state;
            if (field === 'district') {
                if (division) {
                    return Object.keys(areaList[division]);
                } else {
                    return [];
                }
            } else if (field === 'upazilla') {
                if (division && district) {
                    return Object.keys(areaList[division][district]).map(
                        item => item.upazilla,
                    );
                } else {
                    return [];
                }
            }
        }
    }

    render() {
        const {division, district, upazilla, address, zipCode, error} =
            this.state;
        return (
            <View style={styles.inputSection}>
                <DropDownList
                    label="Division"
                    value={division}
                    onChange={value => this.onTextChange('division', value)}
                    errorMessage={error.division}
                    choiceList={this.getChoices('division')}
                />
                <DropDownList
                    label="District"
                    value={district}
                    onChange={value => this.onTextChange('district', value)}
                    errorMessage={error.district}
                    choiceList={this.getChoices('district')}
                    disabled={!division}
                />
                <DropDownList
                    label="Upazilla"
                    value={upazilla}
                    onChange={value => this.onTextChange('upazilla', value)}
                    errorMessage={error.upazilla}
                    choiceList={this.getChoices('upazilla')}
                    disabled={!district}
                />
                <NumberInput
                    label="Zip Code/Post Code"
                    value={zipCode}
                    onChangeText={value => this.onTextChange('zipCode', value)}
                    errorMessage={error.zipCode}
                    disabled={!upazilla}
                />
                <TextArea
                    label="Present Address"
                    value={address}
                    onChangeText={value => this.onTextChange('address', value)}
                    errorMessage={error.address}
                    disabled={!upazilla}
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

AddressTakerInputs.contextType = AccountContext;

export {AddressTakerInputs};
