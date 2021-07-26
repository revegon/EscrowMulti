import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TextInput, Text} from 'react-native-paper';
import {ThemeContext, InputBase} from 'core';
import PropTypes from 'prop-types';

class DateInput extends React.Component {
    constructor(props) {
        super(props);
        this.defaultDate = new Date();
        const {date, strValue} = this.getDateFromProp(props.value);
        this.state = {
            date,
            strValue,
            showPicker: false,
        };
    }

    getDateFromProp(value) {
        let date = null,
            strValue = '';
        if (value) {
            if (typeof value === 'string') {
                date = new Date(value);
                strValue = value;
            } else {
                date = value;
                strValue = this.getStringValue(value);
            }
        }

        return {date, strValue};
    }

    onDateChange(value) {
        if (value) {
            const strValue = this.getStringValue(value);
            this.setState({
                date: value,
                showPicker: false,
                strValue,
            });
            this.props.onChange(strValue);
        }
    }

    getStringValue(date) {
        const dateSeperator = '-';
        if (date) {
            return (
                date.getDate() +
                dateSeperator +
                (date.getMonth() + 1) +
                dateSeperator +
                date.getFullYear()
            );
        } else {
            return '';
        }
    }

    showPicker() {
        this.setState({showPicker: true});
    }

    renderDatePicker() {
        const {date} = this.state;
        return (
            <DateTimePicker
                value={date || this.defaultDate}
                onChange={(e, d) => this.onDateChange(d)}
                minimumDate={new Date('1900-01-01')}
                maximumDate={new Date()}
                mode="date"
                display="spinner"
            />
        );
    }

    render() {
        const {containerStyle, label, inputStyle, errorMessage} = this.props;
        const {strValue, showPicker} = this.state;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.setState({showPicker: true})}>
                    <InputBase
                        containerStyle={containerStyle}
                        label={label}
                        inputStyle={inputStyle}
                        value={strValue}
                        editable={false}
                        onChangeText={value => {}}
                        right={
                            <TextInput.Icon
                                name="eye"
                                onPress={() =>
                                    this.setState({showPicker: true})
                                }
                            />
                        }
                        error={!!errorMessage}
                    />
                </TouchableOpacity>
                {showPicker && this.renderDatePicker()}
                {errorMessage ? (
                    <ThemeContext.Consumer>
                        {({theme}) => (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText(theme)}>
                                    {errorMessage}
                                </Text>
                            </View>
                        )}
                    </ThemeContext.Consumer>
                ) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },
    errorContainer: {
        flex: 1,
        alignSelf: 'flex-start',
    },
    errorText: theme => ({
        color: theme.colors.error,
    }),
});

DateInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    containerStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    errorMessage: PropTypes.string,
};

export {DateInput};
