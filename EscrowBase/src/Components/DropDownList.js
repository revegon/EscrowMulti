import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {InputBase} from './InputBase';
import ModalDropdown from 'react-native-modal-dropdown';
import PropTypes from 'prop-types';
import {ThemeContext} from '../Contexts/ThemeContext';

const DropDownList = ({
    label,
    value,
    onChange,
    choiceList,
    inputStyle,
    containerStyle,
    errorMessage,
    disabled,
}) => {
    const initSelectIndex = value ? choiceList.findIndex(x => x === value) : -1;
    const {theme} = React.useContext(ThemeContext);
    return (
        <View style={[styles.container, containerStyle]}>
            <ModalDropdown
                disabled={disabled}
                onSelect={(index, selected) => onChange(selected)}
                defaultIndex={initSelectIndex}
                options={choiceList}
                animated={false}
                dropdownTextStyle={styles.rowText(theme, false)}
                dropdownTextHighlightStyle={styles.rowText(theme, true)}
                dropdownStyle={styles.dropdown(
                    (choiceList && choiceList.length) || 1,
                )}
                isFullWidth>
                <InputBase
                    containerStyle={styles.inputContainer}
                    label={label}
                    style={[styles.textInput, inputStyle]}
                    value={value}
                    editable={false}
                    disabled={disabled}
                    showRightIcon
                    rightIcon="chevron-down"
                    error={!!errorMessage}
                    onChangeText={val => {}}
                />
            </ModalDropdown>
            {errorMessage ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText(theme)}>{errorMessage}</Text>
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },
    errorContainer: {
        flex: 1,
        alignSelf: 'flex-start',
    },
    inputContainer: {
        marginVertical: 0,
    },
    errorText: theme => ({
        color: theme.colors.error,
    }),
    dropdown: optionCount => {
        let height = 45;
        const count = optionCount > 6 ? 6 : optionCount;
        height *= count;
        return {
            height,
        };
    },
    rowText: (theme, isSelected) => ({
        fontSize: 16,
        fontWeight: isSelected ? 'bold' : 'normal',
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        padding: 10,
    }),
});

DropDownList.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    choiceList: PropTypes.array.isRequired,
    containerStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    errorMessage: PropTypes.string,
    disabled: PropTypes.bool,
};

export {DropDownList};
